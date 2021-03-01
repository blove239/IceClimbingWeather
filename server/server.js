const express = require('express');
const axios = require('axios');
const morgan = require("morgan");
require('dotenv').config();

let DAY = 86400;

const app = express();

const PORT = process.env.port || 8002;

let currentUnixTime = Math.floor(Date.now() / 1000);


app.use(
    morgan(
        ":method :url :status :response-time ms - :res[content-length]"
    )
);

function concurrentRequests() {
    let hourly = [];
    let current = undefined
    for (let i = 0; i < 3; i++) {
        let request = `http://api.openweathermap.org/data/2.5/onecall/timemachine?lat=44.90&lon=-76.24&units=metric&dt=${currentUnixTime - (DAY * i)}&appid=${process.env.API_KEY}`
        http.get(request, (res) => {
            let body = ''
            res.on('data', function (chunk) {
                body += chunk
            })
            res.on('end', function () {
                let data = JSON.parse(body)

                if (i === 0) {
                    current = data.current
                    hourly.push(data.hourly)
                } else {
                    hourly.push(data.hourly)
                }
            })
        }).end()
    }

    hourly.forEach(list => {
        list.forEach(object => {

        })
    })
    setTimeout(() => {
        console.log("current", current)
        console.log("hourly", hourly)
    },1000)
   
}
concurrentRequests()
