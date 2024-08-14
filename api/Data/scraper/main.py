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
import pprint

from models.Place import Place
from models.Contact import Contact

EMAIL_REGEX = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b'
UK_PHONE_REGEX = r'(?:(?:\+44\s?|0)[728]\d{3}[\s\.\-]?\d{3}[\s.-]?\d{3})'

def remove_duplicates(lst: List[str]) -> List[str]:
    return list(set(lst))

def scrape_contact(link: str):
    try:
        page = requests.get(link)
    except Exception as e:
        logging.error(f'failed to scrape {link} Reason: {e}')
        return None
    
    d = BeautifulSoup(page.text, "html.parser")

    emails = re.findall(EMAIL_REGEX, d.text)
    phone_numbers = re.findall(UK_PHONE_REGEX, d.text)

    return remove_duplicates(emails), remove_duplicates(phone_numbers)


def scrape_page(place: Place) -> List[Contact]:
    logging.info(f'scraping {place.Url} for {place.PlaceName}...')
    contacts = []
    emails = []
    phone_numbers = []
    try:
        page = requests.get(place.Url)
    except Exception as e:
        logging.error(f'failed to scrape {place.Url} Reason: {e}')
        return contacts

    doc = BeautifulSoup(page.text, "html.parser")


    a_tags = list(doc.find_all("a"))
    links = list(map(lambda x: x.attrs.get('href', None), a_tags))
    links = list(filter(lambda x: x is not None, links))
    links = list(filter(lambda x: re.match(r'^https?://', x), links))
    links = list(filter(lambda x: len(x) < 50 , links))
    links = remove_duplicates(links)

    for l in links:
        if l.__contains__('contact'):
            logging.info(f'found contact page {l}')
            em, pn = scrape_contact(place.Url)
            if em is None and pn is None:
                break
            logging.info(f'found {len(em)} emails and {len(pn)} phone numbers on contact page')
            emails.extend(em)
            phone_numbers.extend(pn)
            break

    emails.extend(re.findall(EMAIL_REGEX, doc.text))
    phone_numbers.extend(re.findall(UK_PHONE_REGEX, doc.text))

    emails = remove_duplicates(emails)
    phone_numbers = remove_duplicates(phone_numbers)

    logging.info('page scraped')
    logging.info(f'found {len(emails)} emails: {emails}')
    logging.info(f'found {len(phone_numbers)} phone numbers {phone_numbers}')
    logging.info(f'found {len(links)} links {links}')

    max_contacts = max(len(phone_numbers), len(emails), len(links))
    if max_contacts == 0:
        return contacts
    for i in range(max_contacts):
        phone_number = phone_numbers[i] if i < len(phone_numbers) else ""
        email = emails[i] if i < len(emails) else ""
        link = links[i] if i < len(links) else ""
        placeId = place.PlaceID
        contact = Contact(
            PlaceId=placeId,
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

