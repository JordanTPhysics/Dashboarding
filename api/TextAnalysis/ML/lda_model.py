from gensim import corpora
from gensim.models import CoherenceModel
from gensim.models.ldamodel import LdaModel
from collections import defaultdict
import pandas as pd
import matplotlib.pyplot as plt
import os
import logging
import time

from TextAnalysis.preprocessing.clean_text import preprocess
logging.basicConfig(level=logging.DEBUG)


class LdaModelBuilder(LdaModel):
    def __init__(self, texts, num_topics=2):
        super().__init__(corpus=corpora.Dictionary(texts), num_topics=num_topics, dictionary=corpora.Dictionary(texts), passes=3)
        self.texts = texts
        self.corpora = self.create_corpus(texts)
        self.id2word = corpora.Dictionary(texts)
        self.model = self.build_model(texts, num_topics=num_topics)

    @staticmethod
    def build_model(corpus, id2word, num_topics) -> LdaModel:
        return LdaModel(corpus, num_topics=num_topics, id2word=id2word, passes=3, chunksize=10000)
    
    def create_corpus(self, texts):
        texts = [text.split() for text in texts]
        return [self.id2word.doc2bow(text) for text in texts]

    def save(self, file_path):
        self.save(file_path)

    def coherence(self, texts):
        coherencemodel = CoherenceModel(model=self, texts=texts, dictionary=self.id2word, coherence='c_v')
        return coherencemodel.get_coherence()
    
    def perplexity(self, texts):
        return self.log_perplexity(texts)

    def get_topic_distribution(self, text):
        dictionary = self.id2word
        bow = dictionary.doc2bow(text)
        return self[bow]

    def get_topic(self, text):
        topic_distribution = self.get_topic_distribution(text)
        return max(topic_distribution, key=lambda x: x[1])

    @staticmethod
    def get_topic_text(model, text):
        topic = model.get_topic(text)
        return model.print_topics(num_words=5)[topic[0]]

    def get_document_topics(self, text):
        dictionary = self.id2word
        bow = dictionary.doc2bow(text)
        return self.get_document_topics(bow)

    def get_unique_words_per_topic(self, dictionary, num_words=10):

        topic_word_dist = self.get_topics()

        unique_words_per_topic = defaultdict(list)

        for topic_id, word_dist in enumerate(topic_word_dist):
            top_word_ids = word_dist.argsort()[-num_words:][::-1]

            for word_id in top_word_ids:
                word = dictionary[word_id]
                uniqueness_score = word_dist[word_id] / sum(word_dist)

                unique_words_per_topic[topic_id].append((word, uniqueness_score))

            unique_words_per_topic[topic_id] = sorted(unique_words_per_topic[topic_id], key=lambda x: x[1], reverse=True)

            unique_words_per_topic[topic_id] = [word for word, score in unique_words_per_topic[topic_id][:num_words]]

        return unique_words_per_topic
    
    @staticmethod
    def find_optimal_topics(corpus, id2word, texts, start, finish):
        topic_count = []
        coherences = []
        perplexities = []
        topics = []
        times = []

        for t in range(start, finish):
            logging.debug(f'Running LDA with {t} topics')
            start_time = time.time()
            lda_model = LdaModelBuilder.build_model(corpus, id2word, t)

            coherence_model = CoherenceModel(model=lda_model, texts=texts, dictionary=id2word, coherence='c_v')
            coherence = coherence_model.get_coherence()
            perplexity = lda_model.log_perplexity(corpus, total_docs=len(corpus))
            topic = lda_model.print_topics(num_words=5)

            lda_model.save(f'LDA_{t}_topics.model')

            topic_count.append(t)
            coherences.append(coherence)
            perplexities.append(perplexity)
            topics.append(topic)
            times.append(time.time() - start_time)
            logging.debug(f'Finished LDA with {t} topics in {time.time() - start_time} seconds')
            logging.debug(f'Coherence: {coherence}, Perplexity: {perplexity}')
    
        results = pd.DataFrame({'Topic Number': topic_count, 'Coherence': coherences, 'Perplexity': perplexities, 'Time Taken': times, 'Topics': topics})
        results.to_csv('LDA_Optimization.csv', index=False)

        fig, ax1 = plt.subplots(figsize=(10, 5))

        ax1.plot(topic_count, coherences, label='Coherence', color='purple')
        ax1.set_xlabel('Number of Topics')
        ax1.set_ylabel('Coherence')
        ax1.tick_params(axis='y', labelcolor='purple')

        ax2 = ax1.twinx()
        ax2.plot(topic_count, perplexities, label='Perplexity', color='green')
        ax2.set_ylabel('Perplexity')
        ax2.tick_params(axis='y', labelcolor='green')

        fig.legend()
        fig.suptitle('LDA Optimization')
        plt.savefig('lda_optimization.png')


if __name__ == '__main__':
    script_dir = os.path.dirname(__file__)
    file_path = os.path.join(script_dir, '../Data/datasets/places/reviews_joined20240526.csv')
    file_name = os.path.basename(file_path).split('.')[0]

    
        
