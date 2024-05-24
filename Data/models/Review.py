from pydantic import BaseModel, Field
from datetime import datetime

class Review(BaseModel):
    PlaceID: str = Field(..., max_length=40)
    Rating: int
    Text: str
    TimeStamp: datetime

    def __str__(self):
        return f"ReviewID: {self.ReviewID}, PlaceID: {self.PlaceID}, UserID: {self.UserID}, Rating: {self.Rating}, Comment: {self.Comment}, Date: {self.TimeStamp}"
    def __repr__(self):
        return f"ReviewID: {self.ReviewID}, PlaceID: {self.PlaceID}, UserID: {self.UserID}, Rating: {self.Rating}, Comment: {self.Comment}, Date: {self.TimeStamp}"
    
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