
"use client"
import React from "react";
import { Pie, ChartProps } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import { ChartOptions } from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';

import { Place } from "../places/places";

Chart.register(ChartDataLabels);

const placeholderData = {
    'Restaurant': 5,
    'Coffee Shop': 3,
    'Bar': 2,
    'Park': 1,
    'Museum': 1,
    'Zoo': 1,
    'Gym': 1,
    'Library': 1,
    'Movie Theater': 1,

}

export const CountPlaceTypes = (data: Place[]) => {
    const placeTypes: { [key: string]: number } = {};
    data.forEach((place) => {
        const types: string[] = place.Types;
        types.forEach((type) => {
            if (placeTypes[type]) {
                placeTypes[type] += 1;
            } else {
                placeTypes[type] = 1;
            }
        });
    }
    );
    return placeTypes;
}

type Props = {
    data: Place[];
}

const PieChart = () => {

    const options: ChartOptions<'pie'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
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
                formatter: (value, ctx) => {
                    let sum = 0;
                    let dataArr = ctx.chart.data.datasets[0]?.data;
                    dataArr?.map(data => {
                        if (typeof data === 'number') {
                            sum += data;
                        }
                    });
                    let percentage = (value*100 / sum).toFixed(2)+"%";
                    return percentage;
                },
                display: true,
                anchor: 'end',
                align: 'start',
                offset: 10,
                font: {
                    size: 14,
                    weight: 'bold',
                    family: 'Arial',
                },
                color: 'white'
            }
        },
    }

    //const placeTypes = CountPlaceTypes(data);
    const chartData = {
        labels: Object.keys(placeholderData),
        datasets: [
            {
                label: "Places",
                data: Object.values(placeholderData),
                backgroundColor: [
                    "rgba(255, 99, 132, 0.6)",
                    "rgba(54, 162, 235, 0.6)",
                    "rgba(255, 206, 86, 0.6)",
                    "rgba(75, 192, 192, 0.6)",
                    "rgba(153, 102, 255, 0.6)",
                    "rgba(255, 159, 64, 0.6)",
                    "rgba(255, 99, 132, 0.6)",
                    "rgba(54, 162, 235, 0.6)",
                    "rgba(255, 206, 86, 0.6)",
                    "rgba(75, 192, 192, 0.6)",
                    "rgba(153, 102, 255, 0.6)",
                    "rgba(255, 159, 64, 0.6)",
                ],
            },
        ],
    };

    return <Pie data={chartData} options={options} />;
}

export default PieChart;