# -*- coding: utf-8 -*-
"""
Created on Mon Feb 27 14:05:00 2023

OCR api for extracting invoice data

@author: jorda
"""

import json
import requests


url = "https://ocr.asprise.com/api/v1/receipt"

image = "subjects/test-pic.png"

# res = requests.post(url,
#                     data = {
#                         'api-key':'TEST',
#                         'recognizer':'auto',
#                         'ref_no':'oct_python_123'},
#                     files = {
#                         'file': open(image,'rb')
#                         })

#with open('invoice.json','w') as f:
#    json.dump(json.loads(res.text), f)

with open('invoice.json', 'r') as nfile:
    data = json.load(nfile)
    
    
attrs = data['receipts'][0].keys()

