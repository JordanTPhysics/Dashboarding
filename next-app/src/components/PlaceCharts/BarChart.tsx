// page.js this is the entry point of application

"use client";
import dynamic from 'next/dynamic';
import 'chart.js/auto';
import { ChartOptions } from 'chart.js';

import { Place } from '../places/places';

const Bar = dynamic(() => import('react-chartjs-2').then((mod) => mod.Bar), {
  ssr: false,
});

type BarChartProps = {
  data: Place[];

};

const BarChart = ({ data }: BarChartProps) => {

  const colours = ["#FF6633", "#FFB399", "#FF33FF", "#FFFF99", "#00B3E6",]
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const CreateDataSet = (data: Place[], title: string) => {
    const labels = data.keys();

    const values = Array.from(data.values());
   
    return {
      labels: labels,
      data: values,
      title: title,
      label: title,

      backgroundColor: [
        colours[Math.floor(Math.random() * colours.length)],

      ],
      borderColor: [
        colours[Math.floor(Math.random() * colours.length)],

      ],
      borderWidth: 1,
    };
  }

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || '';
            if (label) {
              const numbers = context.dataset.data as number[];
              return `${label}: ${context.parsed.y * Math.max(...numbers)}`;
            }
            return [];
          },
        },
      },
      legend: {
        display: true,
        position: 'right',
        labels: {
            font: {
                size: 18,
                family: 'Arial',
            },
            color: 'white',
            boxWidth: 20,
            padding: 0,
        },
    },
        datalabels: {
            display: false,
        },
    },
    scales: {
        x: {
          labels: months,
            title: {
                display: true,
                text: 'Months',
                color: 'white',
                font: {
                    size: 18,
                    family: 'Arial',
                },
            },
        },
        y: {
            title: {
                display: true,
                text: 'Proportion Of Max Value',
                color: 'white',
                font: {
                    size: 18,
                    family: 'Arial',
                },
            },
        },
    },
  };

  const chartData = {
    labels: months,
    datasets: [
      CreateDataSet(data, "Max"),
    ],
  };

  return <Bar data={chartData} options={options} />;
};
export default BarChart;
