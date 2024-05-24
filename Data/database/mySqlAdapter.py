import mysql.connector as msql
import logging
from models.Place import Place
from models.Review import Review
from typing import List

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

    def bulk_insert_places(self, places):
        logging.debug('opening db connection')
        self.connection = msql.connect(**self.db_config)
        self.cursor = self.connection.cursor()
        try:
            for place in places:
                logging.debug(place)
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
            self.connection.commit()
        except msql.Error as e:
            logging.error(f'Error: {e}')
        finally:
            self.close()

    def bulk_insert_reviews(self, reviews):
        self.connection = msql.connect(**self.db_config)
        self.cursor = self.connection.cursor()
        try:
            for review in reviews:
                self.cursor.callproc('InsertReview', (review["PlaceID"],
                                                      review["Text"],
                                                      review["Rating"],
                                                      review["Timestamp"]))
            self.connection.commit()
        except msql.Error as e:
            print(f'Error: {e}')
        finally:
            self.close()

    def retrieve_all_places(self) -> List[Place]:
        self.cursor.callproc('GetAllPlaces')
        result = next(self.cursor.stored_results())

        return result.fetchall()

    def retrieve_all_reviews(self) -> List[Review]:
        self.cursor.callproc('GetAllReviews')
        result = next(self.cursor.stored_results())

        return result.fetchall()

    def close(self):
        self.connection.close()

    def open(self):
        self.connection = msql.connect(**self.db_config)
        self.cursor = self.connection.cursor()

