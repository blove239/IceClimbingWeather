const express = require('express')
const axios = require('axios')
const redis = require('redis')
const morgan = require('morgan')
const db = require('./db/db')
const cors = require('cors')
const { DAY, ONE_HOUR_IN_SECONDS, ONE_THOUSAND_MILLISECONDS, THREE_DAYS } = require('./utils/constants')
require('dotenv').config()

const corsOptions = {
    origin: process.env.HOMEPAGE,
    optionsSuccessStatus: 200
}

const port_redis = process.env.PORT || 6379
const password_redis = process.env.PASSWORD_REDIS
const PORT = process.env.port || 8002

const redis_client = redis.createClient({
    port: port_redis,
    password: password_redis
})

const app = express()

app.use(cors(corsOptions))

let currentUnixTime = Math.floor(Date.now() / ONE_THOUSAND_MILLISECONDS)

let unixTimeLastHour = Math.floor(currentUnixTime / ONE_HOUR_IN_SECONDS) * ONE_HOUR_IN_SECONDS

app.use(
    morgan(
        ":method :url :status :response-time ms - :res[content-length]"
    )
)

app.listen(PORT, () => {
    console.log(`Network access via PORT: ${PORT}!`);
});

app.get('/api/city/:city', async function (req, res) {
    let data = await db.findCity(req.params.city)
    res.status(200).send(data)
})

const checkCache = (req, res, next) => {
    const { lat, lon } = req.params

    const key = lat + lon + '-' + unixTimeLastHour
    redis_client.get(key, (err, data) => {
        if (err) {
            console.log(err)
            res.status(500).send(err)
        }
        if (data != null) {
            res.send(data)
        } else {
            next()
        }
    })
}

app.get('/api/weather/:lat-:lon', checkCache, async function (req, res) {
    try {
        const { lat, lon } = req.params

        await db.validateLatLon(lat,lon)

        const data = await concurrentRequests(lat, lon)

        const key = lat + lon + '-' + unixTimeLastHour
        redis_client.setex(key, ONE_HOUR_IN_SECONDS, JSON.stringify(data))

        res.status(200).json(data)
    } catch (err) {
        console.log(err)
        res.status(500).send()
    }
})

const concurrentRequests = (lat, lon) => {
    return new Promise((res, rej) => {
        let requestList = []
        for (let i = 0; i < THREE_DAYS; i++) {
            let request = `http://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${lat}&lon=${lon}&units=metric&dt=${unixTimeLastHour - (DAY * i)}&appid=${process.env.API_KEY}`
            requestList.push(axios.get(request))
        }

        axios.all(requestList).then(axios.spread((...responses) => {
            const responseOne = responses[0].data
            const responseTwo = responses[1].data
            const responseThree = responses[2].data

            let hourly = responseOne.hourly.concat(responseTwo.hourly).concat(responseThree.hourly)
            let current = responseOne.current

            //dt === unix time formatted date time
            hourly.sort((a, b) => (a.dt > b.dt) ? 1 : ((b.dt > a.dt) ? -1 : 0))

            const transformedHourly = hourly.map(item => {
                let unix_timestamp = item.dt
                const date = new Date(unix_timestamp * ONE_THOUSAND_MILLISECONDS)
                const month = date.getMonth() + 1
                const day = date.getDate()
                const hours = date.getHours()
                const minutes = '0' + date.getMinutes()
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
