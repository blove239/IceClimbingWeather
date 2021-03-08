const nedb = require('nedb')
const fs = require('fs')
const cityList = require('./cityListNA.json')

const DB_PATH = process.env.DB_PATH || './db/data.db'

const db = new nedb({ filename: DB_PATH, autoload: true });

if (fs.existsSync(DB_PATH)) {
    console.log('DB Already Exists. No need to insert cityList.')
} else {
    db.insert(cityList)
}

db.ensureIndex({ fieldName: 'city' }, function (err) {
});

// data access layer
const dal = {}

dal.findCity = (searchName) => {
    let re = new RegExp(`^${searchName}`, 'i')
    return new Promise((res, rej) => {
        db.find({ city: re }).sort({ population: -1 }).exec((err, docs) => {
            if (err) {
                rej(err)
            } else {
                docs = docs.slice(0, 5)
                docs.forEach(doc => {
                    delete doc._id
                })
                return res(docs)
            }
        })
    })
}

dal.validateLatLon = (lat, lon) => {
    let numLat = Number(lat)
    let numLon = Number(lon)
    return new Promise((res, rej) => {
        db.findOne({ lat: numLat, lon: numLon }, (err, docs) => {
            if (docs === null && err === null) {
                return rej(new Error("City not found, please enter a valid city"))
            } if (err !== null) {
                return rej(new Error("Error looking up lat long"))
            } else {
                return res(true)
            }
        })
    })
}

module.exports = dal
