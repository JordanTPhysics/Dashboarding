from pydantic import BaseModel, Field

class Contact(BaseModel):

    ID: str = Field(..., max_length=40, index=True, primary_key=True)
    PlaceId: str = Field(..., max_length=40)
    PhoneNumber: str = Field(..., max_length=40)
    Email: str = Field(..., max_length=255)
    Url: str = Field(..., max_length=255)

    