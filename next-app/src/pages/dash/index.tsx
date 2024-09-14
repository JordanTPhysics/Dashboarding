"use client";

import React from 'react';

import BarChart from '../../components/PlaceCharts/BarChart';
import PieChart from '../../components/PlaceCharts/PieChart';
import TimeSeriesChart from '@/src/components/PlaceCharts/TimeSeries';
import { useData } from '../../lib/DataProvider';

const parseJson = (json: string) => {
  try {
    const obj = JSON.parse(json);
    let filter = '';
    for (const key in obj) {
      if (obj[key] !== '' && obj[key] !== null && obj[key] !== 0) {
        filter += `${key}: ${obj[key]}\n`;
      }
    }
    return filter;

  } catch (e) {
    return json;
  }
}

export default function Dash() {

  const { places, reviews } = useData();

  const filterText = parseJson(sessionStorage.getItem('filter') || '') || 'All Places';
 
  return (

    <div className='grid grid-cols-12 bg-background h-screen lg:h-full text-text text-xl text-center'>
      <div className='col-span-12 row-span-2'>
        <h1 className='lg:text-3xl sm:text-lg font-bold'>Places Dashboard</h1>
        <h2 className='lg:text-xl sm:text-lg'>{filterText}</h2>
      </div>
      <div className='lg:col-span-4 col-span-12'>
      { places ? <PieChart places={places}/> : <p>Loading...</p> }
      </div>
      <div className='lg:col-span-5 col-span-12'>
        {reviews ? <TimeSeriesChart data={reviews} /> : <p>Loading...</p>}
      </div>
      <div className='lg:col-span-3'>

      </div>
      <div className='col-span-12 '>
        {places ? <BarChart places={places} /> : <p>Loading...</p>}
      </div>
    </div>

  );
}