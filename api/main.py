#start with uvicorn main:app --reload

import os
import logging
from dotenv import load_dotenv
import datetime

from fastapi import FastAPI, Response, status, HTTPException, Depends
from fastapi.responses import JSONResponse, RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from Data.database.AsyncSqlAdapter import AsyncSqlAdapter, connect
from TextAnalysis.preprocessing.clean_text import preprocess
from Data.models.Place import Place
from Data.models.Review import Review
from typing import List

logging.basicConfig(level=logging.DEBUG)
load_dotenv()

app = FastAPI()

origins = ['http://localhost:3000', 'http://localhost:8000', 'http://localhost:5000']
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup code
    print("Startup: Perform startup actions here")
    yield
    # Shutdown code
    print("Shutdown: Perform shutdown actions here")

@app.get("/")
def read_root():
    return RedirectResponse("/docs")


@app.get("/reviews", response_model=List[Review])
async def get_reviews(db: AsyncSqlAdapter = Depends(connect)):
    reviews = await db.get_reviews()
    return reviews

@app.get("/places", response_model=List[Place])
def get_places(db: AsyncSqlAdapter = Depends(connect)):
    places = db.get_place()
    return places

@app.get("/reviews/filter", response_model=List[dict])
async def filter_reviews(rating: float = None,
                    contains: str = None,
                    place_name: str = None,
                    start_date: datetime.datetime = None,
                    end_date: datetime.datetime = None,
                    type: str = None,
                    prompt: str = None,
                    db: AsyncSqlAdapter = Depends(connect)
                    ):
    reviews: List[dict] = await db.get_filtered_reviews(rating,
                                            contains,
                                            place_name,
                                            start_date,
                                            end_date,
                                            type,
                                            prompt)
    
    if not reviews:
        raise HTTPException(status_code=404, detail="No reviews found")
    return reviews

@app.get('/places/filter', response_model=List[dict])
async def filter_places(rating: float = None,
                        contains: str = None,
                        name: str = None,
                        type: str = None,
                        prompt: str = None,
                        radius: float = None,
                        latitude: float = None,
                        longitude: float = None,
                        db: AsyncSqlAdapter = Depends(connect)):
    places: List[dict] = await db.get_filtered_places(rating, contains, name, type, prompt, radius, latitude, longitude)
    if not places:
        raise HTTPException(status_code=404, detail="No places found")
    return places

@app.get('/review:{review_id}', response_model=Review)
async def get_review(review_id: int, db: AsyncSqlAdapter = Depends(connect)):
    return await db.get_review(review_id)
    
if __name__ == "__main__":
    import uvicorn

    with lifespan(app):
        uvicorn.run(app, host="0.0.0.0", port=8000)

    
    