import React from 'react'
import { cardinalDirection, unixDateToHoursMinutes } from '../utils/helper'
import '../css/currentWeather.css'

const CurrentWeather = ({ currentWeatherData }) => {
    return (
        <div className='neu-currentWeather'>
            <h4 className='font-weight-bold text-center'>
                Current Weather
            </h4>
            <div>
                <span className='font-weight-bold'>
                    Time: {' '}
                </span>
                {isNaN(currentWeatherData.dt) ? '' :
                    unixDateToHoursMinutes(currentWeatherData.dt)}
            </div>
            {currentWeatherData.length !== 0 ?
                <div>
                    <div>
                        <span className='font-weight-bold'>
                            Description:
                        </span>
                        <span className='text-capitalize'>
                            {' '}{currentWeatherData.weather[0].description}
                        </span>
                    </div>
                    <img
                        className='rounded mx-auto d-block'
                        alt={currentWeatherData.weather[0].description}
                        src={`http://openweathermap.org/img/wn/${currentWeatherData.weather[0].icon}@2x.png`}
                    />
                </div>
                : <></>
            }
            <div>
                <span className='font-weight-bold'>
                    Temp: {' '}
                </span>
                {isNaN(currentWeatherData.temp) ? '' :
                    Math.round(currentWeatherData.temp)} °C
            </div>
            <div>
                <span className='font-weight-bold'>
                    Feels like: {' '}
                </span>
                {isNaN(currentWeatherData.feels_like) ? '' :
                    Math.round(currentWeatherData.feels_like)} °C
            </div>
            <div>
                <span className='font-weight-bold'>
                    Sunrise: {' '}
                </span>
                {unixDateToHoursMinutes(currentWeatherData.sunrise)}
            </div>
            <div>
                <span className='font-weight-bold'>
                    Sunset: {' '}
                </span>
                {unixDateToHoursMinutes(currentWeatherData.sunset)}
            </div>
            <div>
                <span className='font-weight-bold'>
                    Wind: {' '}
                </span>
                {isNaN(currentWeatherData.wind_speed) ? '' :
                    Math.round(currentWeatherData.wind_speed)} {' km/h '}
                {cardinalDirection(currentWeatherData.wind_deg)}
            </div>
        </div>
    )
}

export default CurrentWeather
