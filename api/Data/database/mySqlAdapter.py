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
        logging.debug(f'Inserting {len(places)} places')
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
                                place["Prompt"],
                                place["PhoneNumber"]))

    @db_transaction
    def bulk_insert_reviews(self, reviews):
        logging.debug(f'Inserting {len(reviews)} reviews')
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
    def filtered_reviews_dataframe(self, rating=None, contains=None, place_name=None, review_date=None, type=None, prompt=None) -> DataFrame:
        self.cursor.callproc('GetFilteredReviews', (rating, contains, place_name, review_date, type, prompt))
        result = next(self.cursor.stored_results())
        return pd.DataFrame(result.fetchall(), columns=['ReviewID', 'PlaceName', 'ReviewText', 'Rating', 'PlaceTypes', 'QueryPrompt', 'PlaceRating', 'ReviewDate'])
    
    @db_transaction
    def filtered_places_dataframe(self, rating=None, contains=None, place_name=None, type=None, prompt=None, radius=None, latitude=None, longitude=None) -> DataFrame:
        self.cursor.callproc('GetFilteredPlaces', (rating, contains, place_name, type, prompt, radius, latitude, longitude))
        result = next(self.cursor.stored_results())
        return pd.DataFrame(result.fetchall(), columns=['PlaceID', 'PlaceName', 'Address', 'Rating', 'Website', 'Types', 'Prompt', 'Latitude', 'Longitude'])
    
    @db_transaction
    def get_place(self, place_id: str) -> Place:
        self.cursor.callproc('GetPlace', (place_id,))
        result = next(self.cursor.stored_results())
        place = result.fetchone()
        return Place(place[0], place[1], place[2], place[3], place[4], place[5], place[6], place[7], place[8])
    
    @db_transaction
    def get_review(self, review_id: int) -> Review:
        self.cursor.callproc('GetFilteredReviews', (review_id,))
        result = next(self.cursor.stored_results())
        review = result.fetchone()
        return Review(review[0], review[1], review[2], review[3])
    
    @db_transaction
    async def get_reviews(self) -> List[Review]:
        self.cursor.callproc('GetAllReviews')
        result = await next(self.cursor.stored_results())
        reviews = await result.fetchall()
        return [Review(review[0], review[1], review[2], review[3]) for review in reviews]
    
    @db_transaction
    async def get_filtered_reviews(self, rating=None, contains=None, place_name=None, review_date=None, type=None, prompt=None) -> List[Review]:
        self.cursor.callproc('GetFilteredReviews', (rating, contains, place_name, review_date, type, prompt))
        result = await next(self.cursor.stored_results())
        reviews = await result.fetchall()
        return [Review(review[0], review[1], review[2], review[3]) for review in reviews]

    def close(self):
        self.connection.close()

    def open(self):
        self.connection = msql.connect(**self.db_config)
        self.cursor = self.connection.cursor()

