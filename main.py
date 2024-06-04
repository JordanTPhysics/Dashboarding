import pandas as pd
import os
import logging
import mysql.connector as msql
from dotenv import load_dotenv
import datetime
from gensim import corpora

from Data.database.mySqlAdapter import DataAdapter
from TextAnalysis.ML.word2vec import Word2VecModel
from TextAnalysis.ML.lda_model import LdaModelBuilder
from TextAnalysis.preprocessing.clean_text import preprocess

from fastapi import FastAPI, Response, status, HTTPException
from fastapi.responses import JSONResponse, RedirectResponse
load_dotenv()
logging.basicConfig(level=logging.DEBUG)

app = FastAPI()

@app.get("/")
def read_root():
    return RedirectResponse("/docs")

@app.get("/reviews")
def get_reviews():
    reviews = db.all_reviews_dataframe()
    return reviews

@app.get("/places")
def get_places():
    places = db.all_places_dataframe()
    return places

@app.post("/places/filter")
def filter_places():
    places = db.filtered_places()


if __name__ == '__main__':
    db_config = {
        'host': os.getenv('MYSQL_HOST'),
        'user': os.getenv('MYSQL_USER'),
        'password': os.getenv('MYSQL_PASSWORD'),
        'database': os.getenv('MYSQL_DATABASE')
        
    }
    db = DataAdapter(db_config)
    
    app.run()


