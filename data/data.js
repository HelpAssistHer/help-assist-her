'use strict'

const config = require('config')
const mongoose = require('mongoose')
const P = require('bluebird')
const fs = require('fs')
const PregnancyCenterModel = require('../app/models/pregnancy-center')
const EJSON = require('mongodb-extended-json')

mongoose.Promise = require('bluebird')

// TODO: Error handling
const loadData = P.coroutine(function *startDatabase() {
    const connectionString = `mongodb://${config.server.hostname}/${config.database.name}`

    yield mongoose.connect(connectionString)

    PregnancyCenterModel.collection.drop()

    // note that exports are 'mongoexport --db hah-dev --collection pregnancycenters --jsonArray --out cessilye_nypc_geocoded.json'

    fs.readFile('../test/fixtures/cessilye_nypc_geocoded.json', 'utf8', function (err, data) {
        if (err) throw err
        console.log(data)
        const docs = EJSON.parse(data)

        PregnancyCenterModel.collection.insertMany(docs, function (err, result) {
            if (err) {
                console.log(err)
            } else {
                console.log(result)
            }
        })

    })


})

loadData()