# -*- coding: utf-8 -*-
"""
Created on Fri Nov 17 21:53:54 2023

CONFIG AND CONSTANTS

@author: jorda
"""
import math



#Jan to Dec Average Daily usage (,) Of total Consumption
DAILY_PERCENT_OF_EAC = list(map(lambda x: round(x/100, 5),
                      [0.321,
                       0.325,
                       0.302,
                       0.265,
                       0.245,
                       0.243,
                       0.228,
                       0.238,
                       0.259,
                       0.279,
                       0.304,
                       0.325]))

MONTHLY_PROFILE = list(map(lambda x: round(x/100, 5),
                                                   [10,
                                                      9,
                                                      9,
                                                      8,
                                                      8,
                                                      7,
                                                      7,
                                                      7,
                                                      8,
                                                      9,
                                                      9,
                                                      10]))

months = ["Jan", "Feb", "Mar", "Apr",
                  "May", "Jun", "Jul", "Aug",
                  "Sep", "Oct", "Nov", "Dec"]
mapped = {x:y for x, y in zip(months, DAILY_PERCENT_OF_EAC)}
