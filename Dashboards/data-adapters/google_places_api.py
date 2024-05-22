import requests
import time
import ijson
import os, io
import google_json_adapter as gja
import datetime
import logging
from dotenv import load_dotenv

load_dotenv()
logging.basicConfig(level=logging.DEBUG)

API_KEY = os.getenv('GOOGLE_PLACES_API')
BASE_URL = 'https://places.googleapis.com/v1/places:searchText'

def add_places(places):
    result = []
    for place in places:
        result.append(gja.process_place(place))
    return result

def add_reviews(reviews):
    result = []
    for review in reviews:
        result.append(gja.process_review(review))
    return result

def begin_crawler(query):
    headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Goog-Api-Key': API_KEY,
        'X-Goog-FieldMask': '''
        places.displayName,
        places.formattedAddress,
        places.location,
        places.rating,
        places.websiteUri,
        places.name,

        contextualContents.reviews.rating,
        contextualContents.reviews.originalText.text,
        contextualContents.reviews.publishTime,
        contextualContents.reviews.name,

        nextPageToken'''
    }

    payload = {
        'textQuery': query,
    }

    places = []
    reviews = []
    page = 0

    response = requests.post(BASE_URL, headers=headers, params=payload)
    
    if response.status_code != 200:
        logging.error(f'Error: {response.json()}')
        return
    
    logging.debug(f'Page {page}')
    logging.debug(f'Next Page Token: {response.json().get('nextPageToken')}')

    with io.StringIO(response.text) as data:
        place_list = ijson.items(data, 'places.item')
        logging.debug(f'Places: {place_list}')
        places.extend(add_places(place_list))

        data.seek(0)
        review_list = ijson.items(data, 'contextualContents.item')
        logging.debug(f'Reviews: {review_list}')
        reviews.extend(add_reviews(review_list))

    next_page_token = response.json().get('nextPageToken')
    while next_page_token:
        logging.debug(f'Page {page}')
        time.sleep(2)
        payload['pageToken'] = next_page_token
        response = requests.get(BASE_URL, params=payload)
        with io.StringIO(response.text) as data:
            place_list = ijson.items(data, 'places.item')
            places.extend(add_places(place_list))

            data.seek(0)
            review_list = ijson.items(data, 'contextualContents.item')
            reviews.extend(add_reviews(review_list))

        next_page_token = response.json().get('nextPageToken')
        page += 1

    current = datetime.datetime.now().strftime('%Y-%m-%d')
    query = query.replace(' ', '_')

    gja.save_to_csv(places, f'../datasets/places/{query}_{current}.csv', gja.place_model)
    gja.save_to_csv(reviews, f'../datasets/places/{query}_reviews_{current}.csv', gja.review_model)

if __name__ == '__main__':
    prompt = input('Enter a query: ')
    places = begin_crawler(prompt)

