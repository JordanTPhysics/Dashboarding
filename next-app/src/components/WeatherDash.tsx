import React, { useEffect } from 'react';

import dynamic from 'next/dynamic';
import BarChart from '@/WeatherCharts/BarChart';
import PieChart from '@/WeatherCharts/PieChart';
import Sidebar from '@/WeatherCharts/SideBar';
import TimeSeriesChart from '@/WeatherCharts/TimeSeries';

import * as Weather from '@/weather/Weather';

export default function Dash({ data }: { data: Weather.Weather[]}) {

  const [chartData, setChartData] = React.useState(Array<Weather.Weather>);

  useEffect(() => {
      const fetchData = async () => {
          try {
              const data = await Weather.GetDataFromCSV("resources/weather_sample.csv");
              setChartData(data)
          }
          catch (e) {
              console.error(e);
          }
      }
      fetchData();
  }, []);

  return (
    <main className='grid grid-cols-12 gap-1 bg-background'>
      <div className='col-span-12 row-span-2'>
        <h1 className='text-3xl font-bold'>Places Dashboard</h1>
      </div>
      <div className='col-span-5'>
        <PieChart />
      </div>

      <div className='col-span-4'>
        <h2 className='text-xl font-bold'>Place Types</h2>
        <p className='text-sm text-gray-500'>A breakdown of the types of places you have visited</p>
        
      </div>

      <div className='col-span-3'>
        <Sidebar />
      </div>
      <div className='col-span-12 h-[50vh]'>
        <BarChart data={chartData}  />
      </div>

    </main>
  );
}