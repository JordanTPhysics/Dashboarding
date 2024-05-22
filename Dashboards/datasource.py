import json
import pandas as pd
import geopandas as gpd
import matplotlib.pyplot as plt

def generate_data():
    df = pd.read_csv("datasets/elec-cons-regions.csv", encoding='latin1')

    with open("datasets/lad.json") as f:
        data = json.load(f)

    gdf = gpd.GeoDataFrame.from_features(data['features'])

    gdf.set_index('LAD13NM', inplace=True)
    df.set_index('LAD13NM', inplace=True)

    merge =  gdf.join(df, how='left', lsuffix='_gdf', rsuffix='_df')
    merge['domestic_mean_kwh'] = merge['domestic_mean_kwh'].fillna(0)
    return merge

