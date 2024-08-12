import pandas as pd
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn.svm import SVC

# Step 1: Load and preprocess the data
data = pd.read_csv('../../../Data/.csv')
reviews = data['review_text']
labels = data['category']

# Step 2: Tokenize and remove stopwords
nltk.download('stopwords')
stop_words = set(stopwords.words('english'))

def preprocess_text(text):
    tokens = word_tokenize(text.lower())
    filtered_tokens = [token for token in tokens if token.isalpha() and token not in stop_words]
    return ' '.join(filtered_tokens)

preprocessed_reviews = reviews.apply(preprocess_text)

# Step 3: Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(preprocessed_reviews, labels, test_size=0.2, random_state=42)

# Step 4: Vectorize the text data
vectorizer = TfidfVectorizer()
X_train_vectorized = vectorizer.fit_transform(X_train)
X_test_vectorized = vectorizer.transform(X_test)

# Step 5: Train a classifier
classifier = SVC()
classifier.fit(X_train_vectorized, y_train)

# Step 6: Evaluate the classifier
accuracy = classifier.score(X_test_vectorized, y_test)
print(f"Accuracy: {accuracy}")