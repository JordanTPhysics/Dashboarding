import os, sys
import gensim
import logging
import pandas as pd
import numpy as np
from gensim import corpora
from gensim.models import Word2Vec

from TextAnalysis.preprocessing.clean_text import preprocess

logging.basicConfig(level=logging.DEBUG)

class Word2VecModel(Word2Vec):

    def __init__(self, texts):
        self.texts = texts
        self.model = self.build_model(texts)

    def build_model(self, texts):
        model = Word2Vec(texts, vector_size=100, window=5, min_count=1, workers=4)
        return model

    def get_most_similar(self, model, word):
        return model.wv.most_similar(word)

    def get_similarity(model, word1, word2):
        return model.wv.similarity(word1, word2)

    def get_doesnt_match(model, words):
        return model.wv.doesnt_match(words)

    def get_vector(model, word):
        return model.wv[word]

    def get_vectors(model, words):
        return [model.wv[word] for word in words]

    def save_model(model, path):
        model.save(path)

if __name__ == '__main__':
    pass

