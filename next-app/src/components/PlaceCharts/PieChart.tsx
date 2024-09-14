"use client";   
import React, { useState, useEffect} from "react";
import { Pie, ChartProps } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import { ChartOptions } from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';

import { Place, GroupByRating } from "../places/places";
import { getChartColors, ChartColors } from '../../lib/themeColours';
Chart.register(ChartDataLabels);


type Props = {
    places: Place[];
}

const PieChart = ({ places }: Props) => {

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

    const options: ChartOptions<'pie'> = {
        responsive: true,
        maintainAspectRatio: false,
        backgroundColor: chartColours.backgroundSecondary,
        color: chartColours.text,
        plugins: {
            title: {
                display: true,
                text: "Place Amicability",
                font: {
                    size: 24,
                    family: 'Arial',
                },
                color: chartColours.text,
            },
            legend: {
                display: true,
                position: 'right',
                labels: {
                    font: {
                        size: 18,
                        family: 'Arial',
                    },
                    color: chartColours.text,
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
                color: "white",
            }
        },
    }
    const chartData = {
        labels: Object.keys(GroupByRating(places)),
        datasets: [
            {
                label: "Places",
                data: Object.values(GroupByRating(places)),
                backgroundColor: [
                    chartColours.success,
                    chartColours.warning,
                    chartColours.danger,
                    chartColours.info,

                ],
            },
        ],
    };

    return <div className="bg-foreground h-[50vh] lg:w-[30vw] md:w-[30vw] sm:w-screen rounded-lg border-4 border-border m-1 p-1 "> <Pie data={chartData} options={options} /></div> ;
}

export default PieChart;