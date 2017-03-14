'use strict'

const config = require('config')
const express = require('express')
const mongoose = require('mongoose')
const P = require('bluebird')
const bodyParser = require('body-parser')

const server = express()
server.use(bodyParser.urlencoded())
server.use(bodyParser.json())
const port = config.server.port
const PregnancyCenterModel = require('../app/models/pregnancy-center')


mongoose.Promise = require('bluebird')

// TODO: Error handling
const startDatabase = P.coroutine(function *startDatabase() {
	const connectionString = `mongodb://${config.server.hostname}/${config.database.name}`

	yield mongoose.connect(connectionString)

    console.log("connecting to database")

})

startDatabase()


server.get('/', function(req, res) {
    res.send('Hello World!')
})

server.get('/api/pregnancy-centers', function(req, res) {
	PregnancyCenterModel.find({}, function (err, allPregnancyCenters) {
        if(err) {
        	console.log(err)
		}
		res.send(allPregnancyCenters)
    })
})


// temporarily hardcoded for testing GeoJSON
// to test, navigate to /data and run "node data", then run the server and access this endpoint

server.get('/api/pregnancy-centers/near-me', function(req, res) {

    const METERS_PER_MILE = 1609.34

    PregnancyCenterModel.find({
        location: {
            $nearSphere: {
                $geometry: {
                    type: "Point",
                    coordinates: [-73.781332, 42.6721989]
                },
                $maxDistance: 5 * METERS_PER_MILE
            }
        }
    }, function (err, pregnancyCentersNearMe) {
        if (err) {
            console.log(err)
        }
        res.status(200).json(pregnancyCentersNearMe)
    })
})


server.get('/api/pregnancy-centers/verify', function(req, res) {

    // We can change the search conditions in the future based on how recently the pregnancy center has been verified ...
    // and what attributes were verified

	PregnancyCenterModel.findOne({ 'verified.address' : null}, function (err, pregnancyCenterToVerify) {
        if (err) console.log(err)
        res.status(200).json(pregnancyCenterToVerify)
	})
})


server.put('/api/pregnancy-centers/:pregnancyCenterId', function(req, res) {
    PregnancyCenterModel.update({_id: req.params['pregnancyCenterId']}, req.body, function (err, pregnancyCenterUpdated) {
        if (err) {
            console.log(err)
        } else {
            res.status(200).json(pregnancyCenterUpdated)
        }
    })
})

server.listen(port, function() {
	console.log(`Help Assist Her server listening on port ${port}`)
})
