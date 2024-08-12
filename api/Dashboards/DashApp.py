import dash
from dash import dcc, html, Input, Output
import plotly.express as px
from datasource import generate_data

app = dash.Dash(__name__)

merged_df = generate_data()

years = merged_df['Year'].unique().tolist()

app.layout = html.Div([
    dcc.Graph(id='map-graph'),
    dcc.Slider(
        id='year-slider',
        min=years[0],
        max=years[-1],
        value=years[0],
        marks={str(year): str(year) for year in years},
        step=None
    )
])

# Define the callback to update the map based on the selected year
@app.callback(
    Output('map-graph', 'figure'),
    [Input('year-slider', 'value')]
)
def update_map(selected_year):
    # Filter the merged DataFrame for the selected year
    year_data = merged_df[merged_df['Year'] == selected_year]
    
    # Create the Plotly map
    fig = px.choropleth(year_data,
                        geojson=year_data.geometry,
                        locations=year_data.index,
                        color='domestic_mean_kwh',  # Replace with the column to visualize
                        hover_name='LAD13NMW',  # Region name
                        hover_data={'LAD13CD': False, 'domestic_mean_kwh': True},  # Customize the tooltip
                        title=f"Map for Year {selected_year}")
    
    # Update the layout for better visualization
    fig.update_geos(fitbounds="locations", visible=False)
    fig.update_layout(margin={"r":0,"t":30,"l":0,"b":0})
    
    return fig

# Run the app
if __name__ == '__main__':
    app.run_server(debug=True)
