# -*- coding: utf-8 -*-
"""
Created on Mon May 20 18:02:45 2024

@author: Thijssenj
"""

from typing import Tuple, List
from bs4 import BeautifulSoup
import re
import pandas as pd
import requests
import logging
import datetime
import os
import sys

from models.Place import Place
from models.Contact import Contact


def scrape_page(place: Place) -> List[Contact]:
    logging.info(f'scraping {place.Url} for {place.PlaceName}...')
    page = requests.get(place.Url)
    doc = BeautifulSoup(page.text, "html.parser")

    a_tags = list(doc.find_all("a"))
    links = list(map(lambda x: x.attrs['href'], a_tags))
    links = list(filter(lambda x: re.match(r'^https?://', x), links))

    phone_numbers = list(filter(lambda x: re.match(r'^\+?[0-9]+$', x), links))
    emails = list(filter(lambda x: re.match(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$', x), links))

    logging.info('page scraped')
    logging.info(f'found {len(emails)} emails')
    logging.info(f'found {len(phone_numbers)} phone numbers')
    logging.info(f'found {len(links)} links')

    max_contacts = max(len(phone_numbers), len(emails), len(links))
    contacts = []
    for i in range(max_contacts):
        phone_number = phone_numbers[i] if i < len(phone_numbers) else None
        email = emails[i] if i < len(emails) else None
        link = links[i] if i < len(links) else None

        contact = Contact(
            PlaceId=place.PlaceID,
            PhoneNumber=phone_number,
            Email=email,
            Url=link
        )

        contacts.append(contact)

    return contacts

def main():
    places = pd.read_csv('../datasets/places/langTutors.csv')
    logging.info(f'loaded {len(places)} places')

    places_with_urls = places[places['Url'].notnull()]
    logging.info(f'loaded {len(places_with_urls)} places with urls')

    contacts = []
    for place in places_with_urls.to_dict('records'):
        contacts += scrape_page(Place(**place))

    contacts_df = pd.DataFrame(contacts)
    logging.info(f'found {len(contacts_df)} contacts')

    contacts_df.to_csv(f'../datasets/places/langTutors_{datetime.datetime.now().strftime("%Y%m%d%H%M%S")}.csv', index=False)

if __name__ == '__main__':
    main()

