"use client";

import React, { useEffect, useRef } from 'react';
import Chart, { TimeScale } from 'chart.js/auto';
import { Scatter } from 'react-chartjs-2';
import 'chartjs-adapter-moment';
import { ChartOptions } from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';

import { Place } from "../places/places";
import { GetDataFromCSV, Weather } from "../weather/Weather";


Chart.register(TimeScale, ChartDataLabels);

type TimeSeriesChartProps = {
    data: Weather[];
};

const options: ChartOptions<'scatter'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: true,
            position: 'top',
        },
        datalabels: {
            display: false,
        },
        tooltip: {
            enabled: true,
            callbacks: {
                label: (context) => {
                    const label = context.dataset.label || '';
                    return `${label} ${context.parsed.y}mm`;
                },
                title: (context) => {
                    return `${new Date(context[0].parsed.y).toDateString()}`;
                },
            },
        },
    },
    scales: {
        x: {
            type: 'time',
            time: {
                unit: 'day',
                parser: 'DD/MM/YYYY',
                tooltipFormat: 'DD/MM/YYYY',
                displayFormats: {
                    day: 'YYYY-MM-DD'
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
                display: false,
                text: 'Precipitation (mm)',
                color: 'white',
            },

        },
    },

};

const TimeSeriesChart = ({ data }: TimeSeriesChartProps) => {

    const chartData = {
        datasets: [
            {
                label: 'Precipitation',
                data: data.map(d => d.precipitation) || [],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
            {
                label: 'Temperature',
                data: data.map(d => d.temp) || [],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
            {
                label: 'Humidity',
                data: data.map(d => d.humidity) || [],
                backgroundColor: 'rgba(255, 206, 86, 0.2)',
                borderColor: 'rgba(255, 206, 86, 1)',
                borderWidth: 1,
            },
            {
                label: 'Wind Speed',
                data: data.map(d => d.windspeed) || [],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
            {
                label: 'Solar Radiation',
                data: data.map(d => d.solarradiation) || [],
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
            },
        ],
    };

    return data ? <Scatter data={chartData} options={options} /> : "Loading...";
};

export default TimeSeriesChart;
