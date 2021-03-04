import React from 'react'
import { ONE_THOUSAND_MILLISECONDS } from '../utils/constants'
const cardinalDirection = (degrees) => {
    if (degrees >= 337.5 || degrees < 22.5) {
        return "N"
    }
    if (degrees >= 22.5 || degrees < 67.5) {
        return "NE"
    }
    if (degrees >= 67.5 || degrees < 112.5) {
        return "E"
    }
    if (degrees >= 112.5 || degrees < 157.5) {
        return "SE"
    }
    if (degrees >= 157.5 || degrees < 202.5) {
        return "S"
    }
    if (degrees >= 202.5 || degrees < 247.5) {
        return "SW"
    }
    if (degrees >= 247.5 || degrees < 292.5) {
        return "W"
    }
    if (degrees >= 292.5 || degrees < 337.5) {
        return "NW"
    }
}

const unixDateToHoursMinutes = (unixTime) => {
    if (unixTime) {
        const date = new Date(unixTime * ONE_THOUSAND_MILLISECONDS)
        const hours = date.getHours()
        const minutes = '0' + date.getMinutes()
        return (hours + ':' + minutes.substr(-2))
    } else {
        return ''
    }
}


const CurrentWeather = ({ currentWeatherData }) => {
    return (
        <React.Fragment>
            <h4>  Current Weather  </h4>

            {currentWeatherData.length !== 0 ?
                <div>
                    <div>
                        Description: {currentWeatherData.weather[0].description}
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
                Temp: {currentWeatherData.temp} °C
            </div>
            <div>
                Feels like: {currentWeatherData.feels_like} °C
            </div>
            <div>
                Sunrise: {unixDateToHoursMinutes(currentWeatherData.sunrise)}
            </div>
            <div>
                Sunset: {unixDateToHoursMinutes(currentWeatherData.sunset)}
            </div>
            <div>
                Wind: {currentWeatherData.wind_speed} {'km/h '}
                {cardinalDirection(currentWeatherData.wind_deg)}
            </div>
            <div>
                UV Index: {currentWeatherData.uvi}
            </div>


        </React.Fragment >
    )
}

export default CurrentWeather
