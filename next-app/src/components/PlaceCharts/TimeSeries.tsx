"use client";

import React, { useEffect, useState } from 'react';
import Chart, { TimeScale } from 'chart.js/auto';
import { Scatter } from 'react-chartjs-2';
import 'chartjs-adapter-moment';
import { ChartOptions } from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { linearGradient, getChartColors, ChartColors, exponentialGradient } from '../../lib/themeColours';

import { Place } from "../places/places";
import { MovingAverageRating } from "../places/reviews";
import { reviewRating } from '@/src/lib/DataProvider';


Chart.register(TimeScale, ChartDataLabels);

type TimeSeriesChartProps = {
    data: reviewRating[];
};

const CreateDataSet = (data: reviewRating[], title: string, chartColours: ChartColors) => {
    const reviews = MovingAverageRating(data, 150);
    const dataPoints = Object.keys(reviews).map((key) => {
        return { x: new Date(key), y: reviews[key] };
    });
    return {
        labels: Object.keys(reviews),
        data: dataPoints,
        title: title,
        label: title,
        backgroundColor: linearGradient(chartColours.danger, chartColours.success, dataPoints.length),
    };
}


const TimeSeriesChart = ({ data }: TimeSeriesChartProps) => {
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

    const options: ChartOptions<'scatter'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: 'Moving Average Rating',
                font: {
                    size: 24,
                    family: 'Arial',
                },
                color: chartColours.text,
            },
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
                        return `${label} ${context.parsed.y.toFixed(2)}`;
                    },
                    title: (context) => {
                        return `${new Date(context[0].parsed.x).toDateString()}`;
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



    const chartData = {
        datasets: [
            CreateDataSet(data, "Rating", chartColours),
        ],
    };

    return data ? <div className="bg-foreground h-[50vh] lg:w-[50vw] md:w-[50vw] sm:w-screen rounded-lg border-4 border-border m-1 p-1">  <Scatter data={chartData} options={options} /> </div> : "Loading...";
};

export default TimeSeriesChart;
