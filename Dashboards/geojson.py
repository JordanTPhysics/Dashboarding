# -*- coding: utf-8 -*-
"""
Created on Sat Nov 11 11:32:21 2023

Read geojson files


@author: jorda
"""

import json
import pandas as pd

df = pd.read_csv("elec-cons-regions.csv", encoding='latin1')

with open("lad.json") as f:
   data = json.load(f)
   
   
features = data['features']
   


def create_geo_df(regions, features):
    
    geodata = []
    
    for feature in features:
        properties = feature['properties']
        name = properties['LAD13NM']

        code = properties['LAD13CD']
        geometry = feature['geometry']
        coordinates = geometry['coordinates']
        shape = geometry['type']
        print((code, name, shape, coordinates))
        geodata.append((code, name, shape, coordinates))
        
        return pd.DataFrame(geodata, columns=["Code", "Name", "Shape", "Coords"])

geodata = create_geo_df(df['la_name'].tolist(), features)