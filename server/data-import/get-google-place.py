'use strict'

const config = require('config')
const mongoose = require('mongoose')
const P = require('bluebird')
const fs = require('fs')
const PregnancyCenterModel = require('../app/models/pregnancy-center')

mongoose.Promise = require('bluebird')

var googleMapsClient = require('@google/maps').createClient({
    key: config.googleMaps.key,
})

// TODO: Error handling
const loadData = P.coroutine(function *startDatabase() {
    const connectionString = `mongodb://${config.server.hostname}/${config.database.name}`

    yield mongoose.connect(connectionString)

})

loadData()

PregnancyCenterModel.find({}, function (err, db_pcs) {
    if(err) {
        console.log(err)
    }

    for (var i = 0, len = db_pcs.length; i < len; i++) {
        const pc = db_pcs[i]


        // Geocode an address.
        googleMapsClient.placesNearby({
            location: [pc.location.lat, pc.location.lng],
            radius: 5,
            keyword: pc.name,
            type: 'establishment'
        }, function(err, response) {
            if (!err) {
                const results = response.json.results
                if (results.length > 0) {
                    pc.place_id = results[0].place_id
                    pc.tmp_google = {
                        'name': results[0].name,
                        'types': results[0].types
                    }
                    console.log(results[0].name, pc.place_id, results[0].types)
                    pc.save()
                }
            }
        })

    }

})



