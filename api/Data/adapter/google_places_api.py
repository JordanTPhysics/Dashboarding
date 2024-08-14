import requests
import time
import ijson
import os, io
import datetime
import logging
from dotenv import load_dotenv

from database.mySqlAdapter import DataAdapter
from models.Place import Place, process_place
from models.Review import Review, process_review
from decimal import Decimal, ROUND_DOWN

load_dotenv()
logging.basicConfig(level=logging.DEBUG)
output_files = False

API_KEY = os.getenv('GOOGLE_PLACES_API')
BASE_URL = 'https://places.googleapis.com/v1/places:searchText'


def process_review(review):
    place_id = review.get('name').split('/')[1]
    rating = review.get('rating')
    text = review.get('originalText',{})
    text_content = text.get('text')
    timestamp = review.get('publishTime')

    return {
        'PlaceID': place_id,
        'Rating': rating,
        'Text': text_content,
        'Timestamp': timestamp
    }

def process_place(place, prompt):
    place_id = place.get('name').split('/')[1]
    formatted_address = place.get('formattedAddress')
    location = place.get('location', {})
    latitude = location.get('latitude')
    longitude = location.get('longitude')
    display_name_text = place.get('displayName', {}).get('text')
    rating = place.get('rating')
    website_uri = place.get('websiteUri')
    types = ", ".join(place.get('types'))
    phone_number = place.get('nationalPhoneNumber')

    ret = {
        'PlaceID': place_id,
        'Address': formatted_address,
        'Latitude': latitude,
        'Longitude': longitude,
        'DisplayName': display_name_text,
        'Rating': rating,
        'Url': website_uri,
        'Types': types,
        'Prompt': prompt,
        'PhoneNumber': phone_number
    }
    return ret


def add_places(places, prompt):
    result = []
    for place in places:
        result.append(process_place(place, prompt))
    return result

def add_reviews(reviews):
    result = []
    for review in reviews:
        result.append(process_review(review))
    return result

def begin_crawler(query, db):
    headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Goog-Api-Key': API_KEY,
        'X-Goog-FieldMask': 'places.displayName,places.types,places.formattedAddress,places.location,places.rating,places.websiteUri,places.name,places.nationalPhoneNumber,contextualContents.reviews.rating,contextualContents.reviews.originalText.text,contextualContents.reviews.publishTime,contextualContents.reviews.name,nextPageToken'
    }

    payload = {
        'textQuery': query,
    }

    places = []
    reviews = []
    page = 0
    next_page_token = None

    response = requests.post(BASE_URL, headers=headers, params=payload)
    
    if response.status_code != 200:
        logging.error(f'Error: {response.json()}')
        return
    
    logging.debug(f'Page {page}')

    with io.StringIO(response.text) as data:
        place_list = ijson.items(data, 'places.item')
        places.extend(add_places(place_list, query))

        data.seek(0)
        contextual_content = ijson.items(data, 'contextualContents.item')
        for content in contextual_content:
            review_list = content.get('reviews', [])
            reviews.extend(add_reviews(review_list))

    #next_page_token = response.json().get('nextPageToken')
    while next_page_token:
        time.sleep(2)
        payload['pageToken'] = next_page_token
        response = requests.get(BASE_URL, headers=headers, params=payload)
        with io.StringIO(response.text) as data:
            place_list = ijson.items(data, 'places.item')
            places.extend(add_places(place_list, query))

            data.seek(0)
            contextual_content = ijson.items(data, 'contextualContents.item')
            for content in contextual_content:
                review_list = content.get('reviews', [])
                reviews.extend(add_reviews(review_list))

        next_page_token = response.json().get('nextPageToken')
        page += 1

    logging.debug('Saving to MySQL')
    
    db.bulk_insert_places(places)
    db.bulk_insert_reviews(reviews)

if __name__ == '__main__':
    db_config = {
        'host': os.getenv('MYSQL_HOST'),
        'user': os.getenv('MYSQL_USER'),
        'password': os.getenv('MYSQL_PASSWORD'),
        'database': os.getenv('MYSQL_DATABASE')
    }
    db = DataAdapter(db_config)

    prompt = input('Enter a query: ')
    places = begin_crawler(prompt, db)

