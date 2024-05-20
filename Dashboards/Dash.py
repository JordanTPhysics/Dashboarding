# -*- coding: utf-8 -*-
"""
Created on Sat Nov 11 00:29:01 2023

@author: jorda
"""

import dash
from dash import dcc, html
import pandas as pd
import plotly.express as px
import requests
import json

# Load the dataset

df = pd.read_csv("ons2data.csv", encoding='latin1')

# Download the GeoJSON file for UK boundaries
with open("lad.json", 'r') as file:
    geojson_data = json.load(file)

# Create a Dash app
app = dash.Dash(__name__)

# Define the layout of the app
app.layout = html.Div([
    html.H1("UK Electricity Consumption by Region"),
    html.Label("Select Data Type:"),
    dcc.RadioItems(
    id='sector',
    options=[
        {'label': 'Domestic', 'value': 'Domestic Mean kWh'},
        {'label': 'Non-Domestic', 'value': 'Non Domestic Mean kWh'},
        {'label': 'Combined', 'value': 'Mean kWh'}
    ],
    value='Combined',
    labelStyle={'display': 'block',
	'padding': '2px 6px',
	'background': '#1d1d42',
	'border': '1px solid rgba(255, 255, 255, 0.1)',
	'border-radius': '2px'}
),
    dcc.Graph(id='heatmap')
])

# Define callback to update the heatmap based on data type selection
@app.callback(
    dash.dependencies.Output('heatmap', 'figure'),
    [dash.dependencies.Input('sector', 'value')]
)
def update_heatmap(relayout_data):
    # You can customize the figure based on the relayout_data if needed
    fig = px.choropleth(
        df,
        geojson=geojson_data,
        locations="name",
        featureidkey="properties.LAD13NM",
        color="Mean kWh",
        color_continuous_scale='Viridis',
        labels={'Consumption': 'Electricity Consumption (GWh)'},
        title='UK Electricity Consumption by Region',
        center = {"lat": 55, "lon": 0},
        height=800,  # Set the height of the map
        width=1200
    )
    
    return fig

# Run the app
if __name__ == '__main__':
    app.run_server(debug=True)
