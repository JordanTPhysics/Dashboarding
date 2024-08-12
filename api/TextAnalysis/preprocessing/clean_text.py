import pandas as pd
import re
import os

import nltk, string
from nltk.corpus import stopwords

stopwords = set(stopwords.words('english'))
punct = string.punctuation + "``“”£"

def remove_stopwords(text):
    tokens = text.lower().split()
    filtered_tokens = [token for token in tokens if token.isalpha() and token not in stopwords]
    return ' '.join(filtered_tokens)

def clean_text(text):
    #remove special characters
    text = re.sub(r'[^A-Za-z\s]', '', text)
    #replace square brackets and content inside with ''
    text = re.sub('\[.*?\]', '', text)
    #remove instances of punctuation
    text = re.sub('[%s]' % re.escape(punct), '', text)
    #remove numbers and words attached to numbers
    text = re.sub('\w*\d\w*', '', text)
    #remove /r and /n
    text = re.sub('\w*/\D*\w*', '', text)
    
    return text

def preprocess(text):
    return remove_stopwords(clean_text(text))

if __name__ == '__main__':
    script_dir = os.path.dirname(__file__)
    file_path = os.path.join(script_dir, '../Data/datasets/places/reviews_joined20240526.csv')
    file_name = os.path.basename(file_path).split('.')[0]

    df = pd.read_csv(file_path, encoding='utf-8')
    df['Cleaned Text'] = df['Text'].apply(clean_text)
    df['Preprocessed Text'] = df['Cleaned Text'].apply(remove_stopwords)
    print(df.head())

    df.to_csv(os.path.join(script_dir, f'results/{file_name}_cleaned.csv'), index=False)