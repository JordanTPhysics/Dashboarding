

def topic_in_review_presence(reviews, topic):
    tally = 0
    for review in reviews:
        if topic in review.text:
            tally += 1
    return tally / len(reviews)

def rate_topic(reviews, topic):
    rating = 0
    tally = 0
    for review in reviews:
        if topic in review.text:
            rating += review.rating
            tally += 1
                
    return rating / tally

def label_reviews(reviews, topics):
    for review in reviews:
        for topic in topics:
            if topic in review.text:
                review.types += f', {topic}'

def get_average_rating(reviews):
    return sum([r.rating for r in reviews])/len(reviews)

def get_worst_review(reviews):
    return sorted(reviews, lambda r: r.sentiment)[0]
    
def get_best_review(reviews):
    return sorted(reviews, lambda r: r.sentiment, reverse=True)[0]

