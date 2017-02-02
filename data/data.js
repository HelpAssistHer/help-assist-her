'use strict'

const config = require('config')
const mongoose = require('mongoose')
const P = require('bluebird')
const fs = require('fs')
const PregnancyCenterModel = require('../app/models/pregnancy-center');

mongoose.Promise = require('bluebird')

// TODO: Error handling
const loadData = P.coroutine(function *startDatabase() {
    const connectionString = `mongodb://${config.server.hostname}/${config.database.name}`

    yield mongoose.connect(connectionString)

    fs.readFile('../test/fixtures/ny-pc.json', 'utf8', function (err, data) {
        if (err) throw err;
        console.log(data);
        const docs = JSON.parse(data);

        PregnancyCenterModel.collection.insertMany(docs, function (err, result) {
            if (err) {
                console.log(err);
            } else {
                console.log(result);
            }
        })

    });

})

loadData()