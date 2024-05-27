from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
from nltk.tokenizer import word_tokenize as wt

analyzer = SentimentIntensityAnalyzer()
sentiment_score = analyzer.polarity_scores("This is a great product!")

def determine_sentiment(review)