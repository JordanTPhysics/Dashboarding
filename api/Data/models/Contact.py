from pydantic import BaseModel, Field, HttpUrl, ValidationError, field_validator
from typing import Optional

class Contact(BaseModel):
    PlaceId: str = Field(..., max_length=40)
    PhoneNumber: Optional[str] = Field("", max_length=40)
    Email: Optional[str] = Field("", max_length=255)
    Url: Optional[str] = Field("", max_length=255)

    @field_validator('Email')
    def validate_email(cls, v):
        if v == '':
            return v
        # Use Pydantic's internal email validation
        if '@' not in v or v.count('@') != 1:
            raise ValueError('The email address is not valid. It must have exactly one @-sign.')
        return v
    
    @field_validator('PhoneNumber')
    def validate_phone_number(cls, v):
        if v == '':
            return v
        # Use Pydantic's internal phone number validation
        if not v.startswith('0') and not v.startswith('+44'):
            raise ValueError('The phone number is not valid. It must start with 0 or +44.')
        return v
    
    @field_validator('Url')
    def validate_url(cls, v):
        if v == '':
            return v
        # Use Pydantic's internal URL validation
        if not str(v).startswith('http://') and not str(v).startswith('https://'):
            raise ValueError('The URL is not valid. It must start with http:// or https://.')
        return v
    
    def to_dict(self):
        return {
            "PlaceId": self.PlaceId,
            "PhoneNumber": self.PhoneNumber,
            "Email": self.Email,
            "Url": self.Url
        }

# Example of using the Contact model
# try:
#     contact = Contact(
#         ID="12345",
#         PlaceId="54321",
#         PhoneNumber="123-456-7890",
#         Email="example@example.com",
#         Url="https://www.example.com"
#     )
#     print(contact)
# except ValidationError as e:
#     print(e)