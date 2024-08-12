from transformers import pipeline
import pandas as pd
import os

sentiment_analysis = pipeline("sentiment-analysis")

def sentiment(review):
    return sentiment_analysis(review)[0]['score']

if __name__ == '__main__':

    script_dir = os.path.dirname(__file__)
    file_path = os.path.join(script_dir, '../Data/datasets/places/reviews_joined20240526.csv')
    file_name = os.path.basename(file_path).split('.')[0]

    df = pd.read_csv(file_path, encoding='utf-8')
    df['Total Sentiment'] = df['Text'].apply(sentiment)
    print(df.head())

    df.to_csv(os.path.join(script_dir, f'results/{file_name}_transformer.csv'), index=False)
