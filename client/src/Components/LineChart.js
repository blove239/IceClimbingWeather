import React, { useEffect } from 'react'
import { Chart, Line } from 'react-chartjs-2'
import { faSun } from '@fortawesome/free-solid-svg-icons'
import day from '../images/day.png'
import night from '../images/night.png'

const LineChart = ({ hourlyWeather }) => {
    const data = {
        labels: hourlyWeather.map(obj => {
            return (obj.date)
        }),

        datasets: [
            {
                label: 'Temperature °C',
                data: hourlyWeather.map(obj => {
                    return (obj.temp)
                }),
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgba(255, 99, 132, 0.2)',
            },
        ],
    }

    const options = {
        scales: {
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Temperature °C'
                },
                ticks: {
                    callback: (value) => {
                        return value;
                    }
                }
            }],
            xAxes: [{
                ticks: {
                    padding: 40,
                    fontSize: 0,
                    callback: (value) => {
                        if (value.endsWith('12:00')) {
                            return 'day'
                        } if (value.endsWith(' 0:00')) {
                            return 'night'
                        }
                    }
                }
            }]
        }
    }

    useEffect(() => {
        return () => {
            Chart.pluginService.register({
                afterDraw: chart => {
                    var ctx = chart.chart.ctx;
                    var xAxis = chart.scales['x-axis-0'];
                    var yAxis = chart.scales['y-axis-0'];
                    xAxis.ticks.forEach((value, index) => {
                        var x = xAxis.getPixelForTick(index);
                        var image = new Image();
                        if (value && value.endsWith('night')) {
                            image.src = night
                            ctx.drawImage(image, x - 15, yAxis.bottom + 10, 30, 30);
                        } if (value && value.endsWith('day')) {
                            image.src = day
                            ctx.drawImage(image, x - 15, yAxis.bottom + 10, 30, 30);
                        }
                    });
                }
            });
        }
    })


    return (
        <Line
            data={data}
            options={options}
        />
    )
}

export default LineChart
