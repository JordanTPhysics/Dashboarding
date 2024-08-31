import aiomysql
import os
import logging
from functools import wraps

from dotenv import load_dotenv

from typing import List, Callable, Coroutine, TypeVar, Any
from Data.models.Review import Review
from Data.models.Place import Place

logging.basicConfig(level=logging.DEBUG)
load_dotenv()
db_config = {
    'host': os.getenv('MYSQL_HOST'),
    'user': os.getenv('MYSQL_USER'),
    'password': os.getenv('MYSQL_PASSWORD'),
    'database': os.getenv('MYSQL_DATABASE')
}

def async_db_transaction(func):
    async def wrapper(self, *args, **kwargs):
        logging.debug('acquiring db connection from pool')
        async with self.pool.acquire() as conn:
            async with conn.cursor() as cursor:
                self.connection = conn
                self.cursor = cursor
                try:
                    result = await func(self, *args, **kwargs)
                    await self.connection.commit()
                    return result
                except aiomysql.Error as e:
                    logging.error(f'Error: {e}')
                    await self.connection.rollback()
                finally:
                    logging.debug('releasing db connection back to pool')
    return wrapper

class AsyncSqlAdapter:
    def __init__(self, pool):
        self.pool = pool

    async def execute(self, query, args=None):
        async with self.pool.acquire() as conn:
            async with conn.cursor() as cur:
                await cur.execute(query, args)
                return await cur.fetchall()

    async def close(self):
        self.pool.close()
        await self.pool.wait_closed()

    async def callProcedure(self, procedure, **kwargs):
        async with self.pool.acquire() as conn:
            async with conn.cursor() as cur:
                await cur.callproc(procedure, kwargs)

                if cur.description is not None:
                    return await cur.fetchall()
                

    @async_db_transaction
    async def get_filtered_reviews(self, rating=None, contains=None, place_name=None, start_date=None, end_date=None, type=None, prompt=None) -> List[dict]:
        await self.cursor.callproc('GetFilteredReviews', (rating, contains, place_name, start_date, end_date, type, prompt))
        reviews = []
        rows = await self.cursor.fetchall()
        for row in rows:
            reviews.append({
                'ReviewID': row[0],
                'PlaceName': row[1],
                'ReviewText': row[2],
                'Rating': row[3],
                'Types': row[4],
                'Prompt': row[5],
                'PlaceRating': row[6],
                'ReviewDate': row[7]
            })
        return reviews
    
    @async_db_transaction
    async def get_filtered_places(self, rating=None, contains=None, name=None, type=None, prompt=None, radius=None, latitude=None, longitude=None) -> List[dict]:
        await self.cursor.callproc('GetFilteredPlaces', (rating, contains, name, type, prompt, radius, latitude, longitude))
        places = []
        rows = await self.cursor.fetchall()
        for row in rows:
            places.append({
                'PlaceID': row[0],
                'PlaceName': row[1],
                'Address': row[2],
                'Rating': row[3],
                'Url': row[4],
                'Types': row[5],
                'Prompt': row[6],
                'Latitude': row[7],
                'Longitude': row[8],
                'Phone': row[9]
            })
        return places
    
    @async_db_transaction
    def get_place(self, place_id: str) -> Place:
        self.cursor.callproc('GetPlace', (place_id,))
        result = next(self.cursor.stored_results())
        place = result.fetchone()
        return Place(place[0], place[1], place[2], place[3], place[4], place[5], place[6], place[7], place[8], place[9])
    
    @async_db_transaction
    async def get_places(self) -> List[Place]:
        await self.cursor.callproc('GetAllPlaces')
        places = []
        async for row in self.cursor:
            place = Place(
                       PlaceID = row[0],
                       PlaceName = row[1],
                       Address = row[2],
                       Rating = row[3],
                       Url = row[4],
                       Type = row[5],
                       Prompt = row[6],
                       Latitude = row[7],
                       Longitude = row[8],
                       Phone = row[9])
            places.append(place)
        logging.debug(f'Loading {len(places)} places')
        return places
    
    @async_db_transaction
    async def get_review(self, review_id: int) -> Review:
        self.cursor.callproc('GetFilteredReviews', review_id)
        return Review(self.cursor.fetchone())
    
    @async_db_transaction
    async def get_reviews(self) -> List[Review]:
                await self.cursor.callproc('GetAllReviews')
                reviews = []
                async for row in self.cursor:
                    review = {
                        'ReviewID': row[0],
                        'PlaceID': row[1],
                        'ReviewText': row[2],
                        'TimeStamp': row[3],
                        'Rating': row[4],
                        'DateEntered': row[5],
                        'ReviewHash': row[6]
                    }
                    reviews.append(Review(**review))
                return reviews
    
async def connect():
    logging.debug(f"Connecting to database, host: {db_config['host']}, user: {db_config['user']}, db: {db_config['database']}")
    pool = await aiomysql.create_pool(
        host=db_config['host'],
        user=db_config['user'],
        password=db_config['password'],
        db=db_config['database'],
        autocommit=True
    )
    return AsyncSqlAdapter(pool)
    