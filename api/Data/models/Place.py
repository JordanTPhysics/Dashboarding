from pydantic import BaseModel, Field
from typing import Optional
from decimal import Decimal, ROUND_DOWN

class Place(BaseModel):

    PlaceID: str = Field(..., max_length=40, index=True, primary_key=True)
    PlaceName: str = Field(..., max_length=255)
    Address: Optional[str] = Field(None, max_length=255)
    Latitude: Optional[Decimal] = Field(1)
    Longitude: Optional[Decimal] = Field(1)
    Rating: Decimal = Field(None, ge=1, le=5)
    Url: Optional[str] = Field(None, max_length=255)
    Type: Optional[str] = Field(None, max_length=255)
    Prompt: str = Field(..., max_length=255)

    def __str__(self):
        return f"PlaceID: {self.PlaceID}, PlaceName: {self.PlaceName}, Address: {self.Address}, Latitude: {self.Latitude}, Longitude: {self.Longitude}, Rating: {self.Rating}, Url: {self.Url}"
    
    def __repr__(self):
        return f"PlaceID: {self.PlaceID}, PlaceName: {self.PlaceName}, Address: {self.Address}, Latitude: {self.Latitude}, Longitude: {self.Longitude}, Rating: {self.Rating}, Url: {self.Url}"
    
    def __eq__(self, other):
        return self.PlaceID == other.PlaceID
    
    def trim_decimals(self):
        # Quantize to 10 total digits
        self.Latitude = self.Latitude.quantize(Decimal('0.000000'), rounding=ROUND_DOWN)
        self.Longitude = self.Longitude.quantize(Decimal('0.000000'), rounding=ROUND_DOWN)

def process_place(place, prompt):
    place_id = place.get('name').split('/')[1]
    formatted_address = place.get('formattedAddress')
    location = place.get('location', {})
    latitude = location.get('latitude')
    longitude = location.get('longitude')
    display_name_text = place.get('displayName', {}).get('text')
    rating = place.get('rating')
    website_uri = place.get('websiteUri')
    types = ", ".join(place.get('types'))

    return Place(PlaceID=place_id,
                Address=formatted_address,
                Latitude=latitude,
                Longitude=longitude,
                PlaceName=display_name_text,
                Rating=rating,
                Url=website_uri,
                Type=types,
                Prompt=prompt)
    
