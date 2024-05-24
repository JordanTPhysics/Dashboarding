import ijson
import csv

from models.Place import Place
from models.Review import Review

place_model = ["PlaceID",
        "Address",
        "Latitude",
        "Longitude",
        "DisplayName",
        "Rating",
        "Url",
        "Types",
        "Prompt"]

review_model = ["PlaceID",
        "Rating",
        "Text",
        "Timestamp"]

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

    return  {
        'PlaceID': place_id,
        'Address': formatted_address,
        'Latitude': latitude,
        'Longitude': longitude,
        'DisplayName': display_name_text,
        'Rating': rating,
        'Url': website_uri,
        'Types': types,
        'Prompt': prompt
    }

def parse_large_json(file_path):
    place_array = []
    review_array = []

    with open(file_path, 'r', encoding='utf-8') as f:
        places = ijson.items(f, 'places.item')
        for place in places:
            metadata = process_place(place)
            place_array.append(metadata)
        save_to_csv(place_array, file_path.replace('.json', '.csv'), place_model)

        f.seek(0)

        contextual_content = ijson.items(f, 'contextualContents.item')
        for content in contextual_content:
            reviews = content.get('reviews', [])
            for review in reviews:
                review_metadata = process_review(review)
                review_array.append(review_metadata)
        save_to_csv(review_array, file_path.replace('.json', '_reviews.csv'), review_model)


def save_to_csv(data, file_name, headers):

    with open(file_name, 'w', newline='', encoding='utf-8') as output_file:
        dict_writer = csv.DictWriter(output_file, fieldnames=headers)
        dict_writer.writeheader()
        dict_writer.writerows(data)

if __name__ == '__main__':
    parse_large_json('../datasets/places/river_tour_uk.json')
