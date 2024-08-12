// page.js this is the entry point of application

"use client";
import dynamic from 'next/dynamic';
import 'chart.js/auto';
import { ChartOptions } from 'chart.js';

import * as W from '@/weather/Weather';

const Bar = dynamic(() => import('react-chartjs-2').then((mod) => mod.Bar), {
  ssr: false,
});

type BarChartProps = {
  data: W.Weather[];

};

const BarChart = ({ data }: BarChartProps) => {

  const CreateDataSet = (data: Map<string, number>, title: string) => {
    const labels = data.keys();

    const values = Array.from(data.values());
    const colour = W.weatherColors[title as keyof typeof W.weatherColors]
    return {
      labels: labels,
      data: values,
      title: title,
      label: title,

      backgroundColor: [
        colour,

      ],
      borderColor: [
        colour,

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
          labels: W.SEASON,
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
    labels: W.SEASON,
    datasets: [
      CreateDataSet(W.MonthAverageNormalized(data, "tempmax"), "Max Temp"),
      CreateDataSet(W.MonthAverageNormalized(data, "tempmin"), "Min Temp"),
      CreateDataSet(W.MonthAverageNormalized(data, "temp"), "Avg Temp"),
      CreateDataSet(W.MonthAverageNormalized(data, "feelslike"), "Feels Like"),
      CreateDataSet(W.MonthAverageNormalized(data, "humidity"), "Humidity"),
      CreateDataSet(W.MonthAverageNormalized(data, "precipitation"), "Precipitation"),
      CreateDataSet(W.MonthAverageNormalized(data, "windspeed"), "Wind Speed"),
      CreateDataSet(W.MonthAverageNormalized(data, "cloudcover"), "Cloud Cover"),
      CreateDataSet(W.MonthAverageNormalized(data, "solarradiation"), "Solar Radiation")
    ],
  };

  return <Bar data={chartData} options={options} />;
};
export default BarChart;
