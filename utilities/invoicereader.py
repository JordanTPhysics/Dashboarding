# -*- coding: utf-8 -*-
"""
Created on Sat Feb  4 00:09:59 2023

create an invoice reader class that can classify invoices by supplier
and extract the relevant information therefrom

@author: jorda
"""

class InvoiceReader():
    
    
import re

def classify_invoice(invoice):
    invoice_data = {}
    supplier_names = ['Supplier A', 'Supplier B']
    for supplier in supplier_names:
        if supplier in invoice:
            # Extract consumption using regular expression
            match = re.search(r'Consumption: (\d+)', invoice)
            consumption = int(match.group(1)) if match else None
            # Extract net cost using regular expression
            match = re.search(r'Net cost: ([\d.]+)', invoice)
            net_cost = float(match.group(1)) if match else None
            # Store data in dictionary
            invoice_data['Supplier'] = supplier
            invoice_data['Consumption'] = consumption
            invoice_data['Net cost'] = net_cost
            break
    return invoice_data

# Example invoices
invoices = [
    'Supplier A: Consumption: 100 units, Net cost: 50.0',
    'Supplier B: Consumption: 200 units, Net cost: 100.0'
]

# Classify and store data for each invoice
data = {}
for i, invoice in enumerate(invoices):
    data[i] = classify_invoice(invoice)

print(data)
