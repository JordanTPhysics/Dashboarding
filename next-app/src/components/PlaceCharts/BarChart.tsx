// page.js this is the entry point of application

"use client";
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import 'chart.js/auto';
import { ChartOptions } from 'chart.js';

import { Place, CountPlaceType } from '../places/places';
import { getChartColors, ChartColors, linearGradient, exponentialGradient } from '../../lib/themeColours';

const Bar = dynamic(() => import('react-chartjs-2').then((mod) => mod.Bar), {
  ssr: false,
});

type BarChartProps = {
  places: Place[];

};

const BarChart = ({ places }: BarChartProps) => {
  const [chartColours, setChartColours] = useState<ChartColors>(getChartColors());

  useEffect(() => {
    const updateChartColours = () => {
      setChartColours(getChartColors());
    };
    // Update colors initially
    updateChartColours();
    // Observe changes to the 'dark' class on the <html> element
    const observer = new MutationObserver(() => updateChartColours());
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();
  }, []);

  const placeTypes = CountPlaceType(places);
  const typeCounts = Object.entries(placeTypes);
  typeCounts.sort(([, a], [, b]) => b - a);

  const CreateDataSet = (data: [string, Number][], title: string) => {
    return {
      labels: data.map(([type]) => type),
      data: data.map(([, count]) => count),
      title: title,
      label: title,
      backgroundColor: linearGradient(chartColours.success, chartColours.danger, data.length),
      borderColor: linearGradient(chartColours.success, chartColours.danger, data.length),
      borderWidth: 1,
      
    };
  }

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    backgroundColor: chartColours.foreground,
    color: chartColours.text,
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            return context.parsed.y.toString() || '';
          },
        },
      },
      legend: {
        display: false,

    },
        datalabels: {
            display: false,
        },
    },
    scales: {
        x: {
          labels: typeCounts.map(([type]) => type),
            title: {
                display: true,
                text: 'Place Types',
                color: chartColours.text,
                font: {
                    size: 18,
                    family: 'Arial',
                },
            },
            ticks: {
                color: chartColours.text,
                font: {
                    size: 14,
                    family: 'Arial',
                },
            },
        },
        y: {
            title: {
                display: true,
                text: 'Count',
                color: chartColours.text,
                font: {
                    size: 18,
                    family: 'Arial',
                },
            },
        },
    },
  };

  const chartData = {
    labels: typeCounts.map(([type]) => type),
    title: 'Places distribution by type',
    datasets: [
      CreateDataSet(typeCounts , "Places distribution by type"),
    ],
  };

  return <div className='h-[50vh] lg:w-[95vw] md:w-[95vw] sm:w-screen bg-foreground border-4 border-border rounded-lg p-2 m-1 ' > <Bar data={chartData} options={options} /></div>;

   
};
export default BarChart;
