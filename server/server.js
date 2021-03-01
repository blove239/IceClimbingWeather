const express = require('express')
const axios = require('axios')
const morgan = require("morgan")
const { response } = require('express')
require('dotenv').config()

let DAY = 86400

const app = express()

const PORT = process.env.port || 8002

let currentUnixTime = Math.floor(Date.now() / 1000)

app.use(
    morgan(
        ":method :url :status :response-time ms - :res[content-length]"
    )
)

app.get('/api/hourlyweather/:lat-:lon', function(req, res) {
    res.status(200).send({weather: concurrentRequests()})
})

const concurrentRequests = () => {
    let hourly = []
    let one = `http://api.openweathermap.org/data/2.5/onecall/timemachine?lat=44.90&lon=-76.24&units=metric&dt=${currentUnixTime}&appid=${process.env.API_KEY}`
    let two = `http://api.openweathermap.org/data/2.5/onecall/timemachine?lat=44.90&lon=-76.24&units=metric&dt=${currentUnixTime - (DAY * 1)}&appid=${process.env.API_KEY}`
    let three = `http://api.openweathermap.org/data/2.5/onecall/timemachine?lat=44.90&lon=-76.24&units=metric&dt=${currentUnixTime - (DAY * 2)}&appid=${process.env.API_KEY}`

    const requestOne = axios.get(one)
    const requestTwo = axios.get(two)
    const requestThree = axios.get(three)

    axios.all([requestOne, requestTwo, requestThree]).then(axios.spread((...responses) => {
        const responseOne = responses[0].data
        const responseTwo = responses[1].data
        const responseThree = responses[2].data

        hourly = responseOne.hourly.concat(responseTwo.hourly).concat(responseThree.hourly)

        //dt === unix time formatted date time
        hourly.sort((a, b) => (a.dt > b.dt) ? 1 : ((b.dt > a.dt) ? -1 : 0))

        const transformedHourly = hourly.map(item => {
            let unix_timestamp = item.dt
            const date = new Date(unix_timestamp * 1000)
            const month = date.getMonth() + 1
            const day = date.getDate()
            const hours = date.getHours()
            const minutes = "0" + date.getMinutes()

            return ({
                date: month + '-' + day + '-' + hours + ':' + minutes.substr(-2),
                temp: item.temp
            })
        })
        console.log(transformedHourly)
        return transformedHourly
    })).catch(errors => {
        console.log(errors)
        // react on errors.
    })
}

concurrentRequests()
