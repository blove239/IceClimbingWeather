import React from 'react'
import { Line } from 'react-chartjs-2'




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
                    labelString: "Temperature °C"
                },
               
                ticks: {
                    // Include a dollar sign in the ticks
                    callback: function(value, index, values) {
                        return value + ' °C';
                    }
                }
            }],
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: "Date (M-DD-HH:MM)"
                }
            }]
        }
    }
    
    return (
        <Line
            data={data}
            options={options}
        />
    )
}

export default LineChart