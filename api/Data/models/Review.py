from pydantic import BaseModel, Field
from datetime import datetime

class Review(BaseModel):

    ReviewID: int
    PlaceID: str = Field(..., max_length=40)
    ReviewText: str
    TimeStamp: datetime
    Rating: float
    DateEntered: datetime
    ReviewHash: str

def process_review(self, review) -> Review:
    place_id = review.get('name').split('/')[1]
    rating = review.get('rating')
    text = review.get('originalText',{})
    text_content = text.get('text')
    timestamp = review.get('publishTime')

    return Review(PlaceID=place_id,
                    Rating=rating,
                    Text=text_content,
                    TimeStamp=timestamp)