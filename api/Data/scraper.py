from typing import List
import logging
import sys
import os
import pandas as pd

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import datetime
from dotenv import load_dotenv
from database.mySqlAdapter import DataAdapter
from models.Place import Place
from models.Contact import Contact
from scraper.main import scrape_page

load_dotenv()
logging.basicConfig(level=logging.DEBUG)

def main():
    # db_config = {
    #     'host': os.getenv('MYSQL_HOST'),
    #     'user': os.getenv('MYSQL_USER'),
    #     'password': os.getenv('MYSQL_PASSWORD'),
    #     'database': os.getenv('MYSQL_DATABASE')
    # }
    # db = DataAdapter(db_config)

    # logging.info('loading places...')
    # places = db.all_places_dataframe()

    places = pd.read_csv('datasets/langTutors.csv')

    logging.info(f'loaded {len(places)} places')

    places_with_urls = places[places['Url'].notnull()]

    logging.info(f'loaded {len(places_with_urls)} places with urls')

    contacts = []
    for place in places_with_urls.to_dict('records'):
        contacts += scrape_page(Place(**place))


    contacts_df = pd.DataFrame(contacts)
    logging.info(f'found {len(contacts_df)} contacts')

    contacts_df.to_csv(f'datasets/langTutors_{datetime.datetime.now().strftime("%Y%m%d%H%M%S")}.csv', index=False)

if __name__ == '__main__':
    main()