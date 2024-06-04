import mysql.connector as msql
import logging
from Data.models.Place import Place
from Data.models.Review import Review

from typing import List

import pandas as pd
from pandas import DataFrame

logging.basicConfig(level=logging.DEBUG)

class DataAdapter:
    def __init__(self, db_config):
        self.db_config = db_config

    def db_transaction(func):
        def wrapper(self, *args, **kwargs):
            logging.debug('opening db connection')
            self.connection = msql.connect(**self.db_config)
            self.cursor = self.connection.cursor()
            try:
                result = func(self, *args, **kwargs)
                self.connection.commit()
                return result
            except msql.Error as e:
                logging.error(f'Error: {e}')
                self.connection.rollback()
            finally:
                self.cursor.close()
                logging.debug('closing db connection')
                self.close()
        return wrapper

    @db_transaction
    def bulk_insert_places(self, places):
        for place in places:
            self.cursor.callproc('InsertPlace',
                                (place["PlaceID"],
                                place["DisplayName"],
                                place["Address"],
                                place["Latitude"],
                                place["Longitude"],
                                place["Rating"] if place["Rating"] is not None else -1.0,
                                place["Url"],
                                place["Types"],
                                place["Prompt"]))

    @db_transaction
    def bulk_insert_reviews(self, reviews):
        for review in reviews:
            self.cursor.callproc('InsertReview',
                                (review["PlaceID"],
                                review["Text"],
                                review["Rating"],
                                review["Timestamp"]))


    @db_transaction
    def all_places_dataframe(self) -> DataFrame:
        self.cursor.callproc('GetAllPlaces')
        result = next(self.cursor.stored_results())

        return pd.DataFrame(result.fetchall())

    @db_transaction
    def all_reviews_dataframe(self) -> DataFrame:
        self.cursor.callproc('GetAllReviews')
        result = next(self.cursor.stored_results())

        return pd.DataFrame(result.fetchall(), columns=['PlaceID', 'Text', 'Rating', 'Timestamp'])
    
    @db_transaction
    def filtered_reviews(self, rating=None, contains=None, place_name=None, review_date=None, type=None, prompt=None) -> DataFrame:
        self.cursor.callproc('GetFilteredReviews', (rating, contains, place_name, review_date, type, prompt))
        result = next(self.cursor.stored_results())
        return pd.DataFrame(result.fetchall(), columns=['ReviewID', 'PlaceName', 'ReviewText', 'Rating', 'PlaceTypes', 'QueryPrompt', 'PlaceRating', 'ReviewDate'])
    
    @db_transaction
    def filtered_places(self, rating=None, contains=None, place_name=None, type=None, prompt=None, radius=None, latitude=None, longitude=None) -> DataFrame:
        self.cursor.callproc('GetFilteredPlaces', (rating, contains, place_name, type, prompt, radius, latitude, longitude))
        result = next(self.cursor.stored_results())
        return pd.DataFrame(result.fetchall(), columns=['PlaceID', 'PlaceName', 'Address', 'Rating', 'Website', 'Types', 'Prompt', 'Latitude', 'Longitude'])

    def close(self):
        self.connection.close()

    def open(self):
        self.connection = msql.connect(**self.db_config)
        self.cursor = self.connection.cursor()

