const express = require('express')
const axios = require('axios')
const morgan = require('morgan')
const db = require('./db')
const cors = require('cors')
require('dotenv').config()

const { DAY, OME_THOUSAND_MILLISECONDS, THREE_DAYS } = require('./constants')

const app = express()

app.use(cors())

const PORT = process.env.port || 8002

let currentUnixTime = Math.floor(Date.now() / OME_THOUSAND_MILLISECONDS)

app.use(
    morgan(
        ":method :url :status :response-time ms - :res[content-length]"
    )
)

app.listen(PORT, () => {
    console.log(`Network access via PORT: ${PORT}!`);
});

app.get('/api/city/:city', async function (req, res) {
    // need to validate inputs
    let data = await db.findCity(req.params.city)
    res.status(200).send(data)
})

app.get('/api/weather/:lat-:lon', async function (req, res) {
    // need to validate inputs
    try {
        const data = await concurrentRequests(req.params.lat, req.params.lon)
        res.status(200).json(data)
    } catch (err) {
        // expand on error so client can respond appropriately 
        res.status(500)
    }
})

const concurrentRequests = (lat, long) => {
    return new Promise((res, rej) => {
        let hourly = []
        let currentWeather = []
        let requestList = []
        for (let i = 0; i < THREE_DAYS; i++) {
            let request = `http://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${lat}&lon=${long}&units=metric&dt=${currentUnixTime - (DAY * i)}&appid=${process.env.API_KEY}`
            requestList.push(axios.get(request))
        }

        axios.all(requestList).then(axios.spread((...responses) => {

            const responseOne = responses[0].data
            const responseTwo = responses[1].data
            const responseThree = responses[2].data

            hourly = responseOne.hourly.concat(responseTwo.hourly).concat(responseThree.hourly)
            current = responseOne.current

            //dt === unix time formatted date time
            hourly.sort((a, b) => (a.dt > b.dt) ? 1 : ((b.dt > a.dt) ? -1 : 0))

            const transformedHourly = hourly.map(item => {
                let unix_timestamp = item.dt
                const date = new Date(unix_timestamp * OME_THOUSAND_MILLISECONDS)
                const month = date.getMonth() + 1
                const day = date.getDate()
                const hours = date.getHours()
                const minutes = "0" + date.getMinutes()
                return ({
                    date: month + '-' + day + ' ' + hours + ':' + minutes.substr(-2),
                    temp: item.temp
                })
            })
            return res({
                current: current,
                hourly: transformedHourly
            })
        })).catch(errors => {
            rej(errors)
        })
    })
}
