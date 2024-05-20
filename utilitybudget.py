# -*- coding: utf-8 -*-
"""
Created on Sun Nov  5 19:57:19 2023

a class for creating utilities budgets

@author: jorda
"""
import datetime as dt
from Utils import *

class MeterSite():
    
    def __init__(self, mpxn, address, postcode, annualusage, sitetype):
        self.mpxn = mpxn
        self.product = self.getProductType(mpxn)
        self.pricelist = self.loadPricelist()
        self.address = address
        self.postcode = postcode
        self.flowdirection = 0 #1 is for export meter
        self.annualusage = annualusage
        self.sitetype = sitetype
        
        
    def getProductType(mpxn):
        
        if mpxn[:2] == "S00":
           return "HH"
        elif mpxn[:1] == "S0":
           return "NHH"
        else:
           return "Gas"
     
    def monthlyCons(self, profile):
        if self.sitetype == "other":
            return list(map(lambda x: x * self.annualusage, profile))
        
    #returns a list of the average daily consumption for each day of the year
    def dailyCons(self, profile, leapyear=False):

        date = dt.date(2023, 1, 1)
        
        ret = []
        
        if leapyear: days = 366
        else: days = 365
        
        for d in range(days):
            day = date + dt.timedelta(days=d)
            ret.append(profile[day.month-1] * self.annualusage)
            
        return ret
        
        
    def getDuosTariff(self):
        if len(self.mpxn != 22):
            return "This is a gas meter or not the full MPAN, please provide a full MPAN."
        #ToDo: consolidate all duos tariffs this and next year into a file
     
    def calculateCosts(self, pricelist, budget):
        
        
        
        
class PriceList():
    def __init__(self, meter, supplier, start, end):
        self.supplier = supplier
        self.meter = meter
        self.unit_rates = []
        self.fixed_rates = []
        self.misc = []
        self.start = start
        self.end = end

class UtilityBudget():
    def __init__(self, sites, start, end):
        self.sites = sites
        self.start = start #datetime
        self.end = end #datetime
        





        