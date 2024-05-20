import json
import pandas as pd
import plotly.express as px

from urllib.request import urlopen
import json
with open("lad.json") as f:
   data = json.load(f)
    
pop_data=pd.read_csv("ons2data.csv")

#Have a look at the data and the GeoJSON file to find a mapping identifier you can use

pop_data.head()
data['features'][0]['properties']

#Here we can use the column "name" in the population data and 
#"LAD20NM" in the feature properties

fig = px.choropleth_mapbox(pop_data,
                           locations="name",
                           featureidkey="properties.LAD20NM",
                           geojson=data,
                           color="Median Age",
                           hover_name="name",
                           mapbox_style="carto-positron",
                           zoom=4,
                           center = {"lat": 55, "lon": 0})
fig.show()
fig.write_html()