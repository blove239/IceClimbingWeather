const nedb = require('nedb')
const fs = require('fs')
const cityList = require('./cityListNA.json')

const DB_PATH = process.env.DB_PATH || "data.db"

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
                docs = docs.slice(0,5)
                docs.forEach(doc => {
                    delete doc._id
                })
                return res(docs)
            }
        })
    })
}

module.exports = dal
