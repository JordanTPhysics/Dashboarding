
from typing import List
import logging
import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import datetime
from dotenv import load_dotenv

from database.mySqlAdapter import DataAdapter
from adapter.google_places_api import begin_crawler

load_dotenv()
logging.basicConfig(level=logging.DEBUG)

def main():
    db_config = {
        'host': os.getenv('MYSQL_HOST'),
        'user': os.getenv('MYSQL_USER'),
        'password': os.getenv('MYSQL_PASSWORD'),
        'database': os.getenv('MYSQL_DATABASE')
    }
    db = DataAdapter(db_config)

    prompt = input('Enter a query: ')
    begin_crawler(prompt, db)

if __name__ == '__main__':
    main()