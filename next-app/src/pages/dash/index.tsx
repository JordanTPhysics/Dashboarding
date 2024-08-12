import React from 'react';
import { GetServerSideProps } from 'next';
import axios from 'axios';

import { Place } from '../../components/places/places';
import BarChart from '../../components/PlaceCharts/BarChart';
import PieChart from '../../components/PlaceCharts/PieChart';
import Sidebar from '../../components/PlaceCharts/SideBar';

export async function getServerSideProps() {

  const { data } = await axios.get('http://localhost:8000/places');
  if (data === null) {
    return {
      props: {
        data: []
      }
    }
  }

  return {
    props: {
      data,
    },
  };
}

export default async function Dash({ data }: { data: Place[] }) {
  return (
    
      <div className='grid grid-cols-12 gap-1 bg-background h-[80vh]'>
        <div className='col-span-12 row-span-2'>
          <h1 className='text-3xl font-bold'>Places Dashboard</h1>
        </div>
        <div className='col-span-5'>
          <PieChart />
        </div>
        <div className='col-span-4'>
          <h2 className='text-xl font-bold'>Place Types</h2>
          <p className='text-sm '>A breakdown of the types of places you have visited</p>
        </div>
        <div className='col-span-3'>
          <Sidebar />
        </div>
        <div className='col-span-12 h-[50vh]'>
          <BarChart data={data} />
        </div>
      </div>
    
  );
}