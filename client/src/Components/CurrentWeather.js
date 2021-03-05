import React from 'react'
import { cardinalDirection, unixDateToHoursMinutes } from '../utils/helper'

const CurrentWeather = ({ currentWeatherData }) => {
    return (
        <React.Fragment>
            <h4 className='font-weight-bold'>
                Current Weather
            </h4>
            
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
                        alt={currentWeatherData.weather[0].description}
                        src={`http://openweathermap.org/img/wn/${currentWeatherData.weather[0].icon}@2x.png`}
                    >
                    </img>
                </div>
                : <></>
            }
            <div>
                <span className='font-weight-bold'>
                    Temp: {' '}
                </span>
                {currentWeatherData.temp} °C
            </div>
            <div>
                <span className='font-weight-bold'>
                    Feels like: {' '}
                </span>
                {currentWeatherData.feels_like} °C
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
                {currentWeatherData.wind_speed} {'km/h '}
                {cardinalDirection(currentWeatherData.wind_deg)}
            </div>
            <div>
                <span className='font-weight-bold'>
                    UV Index {' '}
                </span>
                {currentWeatherData.uvi}
            </div>
        </React.Fragment>
    )
}

export default CurrentWeather
