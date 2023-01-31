# -*- coding: utf-8 -*-
"""
Created on Tue Jan 24 18:33:17 2023


Calculate increase in total product cost with breakdowns of the charges

it needs to show the percentage change of each individual charge

@author: jordan
"""

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import logging


class MeterSite():
    
    def __init__(self, mpn, address, eac, costs, product):
        self.mpn = mpn # core, unique identifier
        self.address = address # site address
        self.eac = eac # estimated annual consumption
        self.costs = costs # dict of per unit and standing charges
        self.product = product # product type
        
    def to_dict(self):
        return {"mpn": self.mpn,
                "address": self.address,
                "eac": self.eac,
                "costs": self.costs,
                "product": self.product}
    

class PriceList():
    
    ## Standard units p/kWh 
    def __init__(self, units, standing):
        self.units = units
        self.standing = standing
        
        
    def priceperkWh(self):
        return sum(self.units)
    
    ## period measured in years
    def total_cost(self, consumption, period):
        
        sums = 0
        ## convert cost per day/month here
        for charge, rate in self.standing:
            sums += charge * rate * period
        
        return sum(self.units) * consumption + sums
    
    
    ## a function that takes in sitelist and uses eac of each to calculate total
    def total_cons(sitelist, period):
        
        cons = 0
        for site in sitelist:
            cons += site.eac 
            
        return cons * period
    

  ## initialize mock prices      

year1 = {"Unit Rate": 9.34,
                "RO": 0.543,
                "FiT": 0.784,
                "Standing Chg": 4.65}

year2 = {"Unit Rate": 10.354,
                "RO": 0.593,
                "FiT": 1.024,
                "Standing Chg": 7.65}

year3 = {"Unit Rate": 34.34,
                "RO": 0.683,
                "FiT": 0.799,
                "Standing Chg": 10.65}

year4 = {"Unit Rate": 44.34,
                "RO": 2.683,
                "FiT": 1.343,
                "Standing Chg": 15.65}

pricelists = [year1, year2, year3, year4]

## calculate the total cost
# shows the total £/kWh percentage increase/decrease


## define a function that compares 2 pricelists
# flags charge bands not present in either list
# returns dict showing old, new and pct rise
def compare(prev, next):
    
    returns = {}
    total_unit = 0
    total_standing = 0
    total_unit_old = 0
    total_st_old = 0
    
    for chg, val in prev.items():
        
        #code that sums the unit rates and standing charges of old pricelist
        if "standing" in chg.lower():
            total_st_old += val
        else:
            total_unit_old += val
        try:
            new = next[chg]
        except: #check for expired charges
            logging.warning(f'the charge band {chg} was not found on the new pricelist')
            continue
        
    for chg, val in next.items():
        #code that sums the unit rates and standing charges of new pricelist 
        if "standing" in chg.lower():
            total_standing += val
        else:
            total_unit += val
        try:
            old = prev[chg]
        except: 
            logging.warning(f'New charge band {chg} detected on pricelist')
            continue
        pct = 100 * (val - old) / old
        #useful debugging
        #print(f"{pct} = rise of {val} from {old}")
        returns[chg] = [old, val, pct]
        
    unit_pct = 100 *  (total_unit - total_unit_old) / total_unit_old
    standing_pct = 100 * (total_standing - total_st_old) / total_st_old
        
        # totals and percent increase in costs shown
    returns["TST"] = [total_st_old, total_standing, standing_pct]
    returns["TUR"] = [total_unit_old, total_unit, unit_pct]   
    
            
    return returns


creep = []
# start evaluating pricelists against the previous, starts from 2nd element
for year, pricelist in enumerate(pricelists[1:]):
    diff = compare(pricelists[year], pricelist)
    creep.append(diff)
    
    







    
    
    

