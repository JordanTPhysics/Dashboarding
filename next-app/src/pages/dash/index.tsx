import React from 'react';

import { Place } from '../../components/places/places';
import BarChart from '../../components/PlaceCharts/BarChart';
import PieChart from '../../components/PlaceCharts/PieChart';
import Sidebar from '../../components/PlaceCharts/SideBar';


export async function getServerSideProps() {
  try {
    const res = await fetch('http://127.0.0.1:8000/places');
    const data = await res.json();

    return {
      props: {
        places: data, // Ensure `data` is resolved before passing to the component
      },
    };
  } catch (error) {
    console.error("Error fetching places:", error);
    return {
      props: {
        places: [],
      },
    };
  }
}

type Props = {
  places: Place[];
};

export default function Dash({ places }: Props) {
  return (

    <div className='grid grid-cols-12 gap-1 bg-background '>
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
        <BarChart data={places} />
      </div>
    </div>

  );
}