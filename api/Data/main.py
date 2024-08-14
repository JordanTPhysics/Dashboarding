
from typing import List
import logging
import sys
import os
import pandas as pd

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import datetime
from dotenv import load_dotenv

from database.mySqlAdapter import DataAdapter
from adapter.google_places_api import begin_crawler

load_dotenv()
logging.basicConfig(level=logging.DEBUG)

def main(use_preset=False):
    db_config = {
        'host': os.getenv('MYSQL_HOST'),
        'user': os.getenv('MYSQL_USER'),
        'password': os.getenv('MYSQL_PASSWORD'),
        'database': os.getenv('MYSQL_DATABASE')
    }
    db = DataAdapter(db_config)

    if use_preset:
        places = pd.read_csv('datasets/environment_prospects.csv', encoding='utf-8')['Places']
        regions = pd.read_csv('datasets/locations_uk.csv', encoding='utf-8')['City']
        for place in places:
            for region in regions:
                begin_crawler(f'{place} {region}', db)
    else:
        prompt = input('Enter a query: ')
        begin_crawler(prompt, db)

if __name__ == '__main__':
    prompt = input('Use preset data? (y/n): ')
    if prompt.lower().__contains__('y'):
        main(True)
    else:
        main()