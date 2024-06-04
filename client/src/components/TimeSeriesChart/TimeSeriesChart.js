import React, { useEffect, useRef } from 'react';
import Chart, { TimeScale } from 'chart.js/auto';
import { format, parse, parseISO } from 'date-fns';
import 'chartjs-adapter-moment';

Chart.register(TimeScale);

const TimeSeriesChart = ({ data, yAxisLabel }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    const chart = new Chart(ctx, {
      type: 'scatter',
      labels: data.map(entry => entry.Timestamp),
      data: {
        datasets: [
          {
            label: 'Ratings Over Time',
            data: data.map(entry => {
              return {
                x: Date.parse(entry['Timestamp']),
                y: Number.parseFloat(entry['Total Sentiment']),
              };
            
            }),
            fill: false,
            borderColor: 'rgba(220,19,19,1)',
            tension: 1,
          },
        ],
      },
      options: {
        scales: {
          x: {
            type: 'time', 
            time: {
              unit: 'day', // Display data on a daily basis
              parser: 'DD/MM/YYYY', // Use 'DD/MM/YYYY' for UK format
              tooltipFormat: 'DD/MM/YYYY', // Use 'DD/MM/YYYY' for UK format in tooltips
              displayFormats: {
                  day: 'YYYY-MM-DD' // Format of the displayed date
              },
            },
            title: {
              display: true,
              text: 'Date',
              color: 'white',
            },
          },
          y: {
            title: {
              display: true,
              text: yAxisLabel,
              color: 'white',
              
            },
            ticks: {
              // Use callback to format Y-axis labels
              callback: (value) => value.toFixed(2),
            },
          },
        },
        plugins: {
          tooltip: {
            enabled: true,
            callbacks: {
              label: (context) => {
                const label = context.dataset.label || '';
                return `${label} ${context.parsed.y}`;
              },
            },
          },
          legend: {
            display: true,
            position: 'top',
          },
        },
        responsive: true,
      },
    });

    return () => {
      chart.destroy(); // Cleanup on component unmount
    };
  }, [data, yAxisLabel]);


  return (
    <div style={{ width: '100%', height: '100%' }}>
      <canvas ref={chartRef} ></canvas>
    </div>
  );
};

export default TimeSeriesChart;
