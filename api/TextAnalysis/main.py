
import pandas as pd
import os
import logging

from Data.database.mySqlAdapter import DataAdapter
from ML.word2vec import Word2VecModel
from ML.lda_model import build_model, compute_coherence_values
from preprocessing.clean_text import preprocess

logging.basicConfig(level=logging.DEBUG)

if __name__ == '__main__':
    db_config = {
        'host': os.getenv('MYSQL_HOST'),
        'user': os.getenv('MYSQL_USER'),
        'password': os.getenv('MYSQL_PASSWORD'),
        'database': os.getenv('MYSQL_DATABASE')
    }
    db = DataAdapter(db_config)

    reviews = db.filtered_reviews_dataframe()

    reviews['Preprocessed'] = reviews['ReviewText'].apply(preprocess).tolist()
    print(reviews.head())
    print(len(reviews))

    
