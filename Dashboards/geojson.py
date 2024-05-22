# -*- coding: utf-8 -*-
"""
Created on Sat Nov 11 11:32:21 2023

Read geojson files


@author: jorda
"""

import json
import pandas as pd
import geopandas as gpd
import matplotlib.pyplot as plt

df = pd.read_csv("datasets/elec-cons-regions.csv", encoding='latin1')

with open("datasets/lad.json") as f:
    data = json.load(f)

gdf = gpd.GeoDataFrame.from_features(data['features'])

gdf.set_index('LAD13NM', inplace=True)
df.set_index('LAD13NM', inplace=True)


merge =  gdf.join(df, how='left', lsuffix='_gdf', rsuffix='_df')
merge['domestic_mean_kwh'] = merge['domestic_mean_kwh'].fillna(0)

years = df['year'].unique()

for year in years:
    fig, ax = plt.subplots(1, 1)
    merge.plot(column='domestic_mean_kwh', ax=ax, legend=True)
    fig.suptitle('UK Domestic Electricity Consumption ' + str(year))
    fig.savefig('figures/uk_domestic_cons' + str(year) + '.png')
    fig.clf()



