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

#elec cons per month of yearly total (%)
elec_profile = [11.5, 8.5, 10.5, 8, 7.5, 6, 6, 7.5, 8.5, 9.5, 11, 12]
#gas cons per month of yearly total (%)
gas_profile = [12, 10.5, 11, 7.5, 6.5, 5.5, 5, 5.5, 7.5, 7.5, 11, 12]


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
    
    
    ## sums eacs for sitelist to predict overall contract cons
    # period param is contract length standard unit 1 year
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
                #"Available Capacity": 30,
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
    returns["TST"] = [total_st_old, total_unit_old]
    returns["TUR"] = [total_standing, total_unit]   
    
            
    return returns


creep = []
tur = []
tst = []
# start evaluating pricelists against the previous, starts from 2nd element
for year, pricelist in enumerate(pricelists[1:]):
    diff = compare(pricelists[year], pricelist)
    creep.append(diff)
    tur.append(diff["TUR"])
    tst.append(diff["TST"])
    


def reformat(metric):
    
    
    #regroup values by class
    #so each successive list element is the next year/contract
    
    old = [olr[0] for olr in tur]
    new = [newr[1] for newr in tur]
    pct_change = [p[2] for p in tur]  
    alls = new.insert(0, old[0])
    pcts = pct_change.insert(0, 0)
    
    return (alls, pcts)
    
#plot yearly changes

def plot_change(metric, pct, start, name):
    x = np.arange(len(metric))
    width = 0.35
    
    
    fig, ax = plt.subplots()
    rects1 = ax.bar(x - width/2, metric, width, label=name)
    rects2 = ax.bar(x + width/2, pct, width, label='%')
    ax.set_ylabel('Change')
    ax.set_title(f'change in {name} costs')
    ax.set_xticks(x, [str(start + yr) for yr in x])
    ax.legend()

    ax.bar_label(rects1, padding=3)
    ax.bar_label(rects2, padding=3)

    fig.tight_layout()
    
    plt.savefig(F"images/{name}.png")
    plt.show()
    plt.clf()
    
    return

plot_change(new, pct_change, 2017, "total UR")






    
    
    

