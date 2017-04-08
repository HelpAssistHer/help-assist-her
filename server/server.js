'use strict'

const config = require('config')
const cors = require('cors')
const express = require('express')
const Log = require('log')
const mongoose = require('mongoose')
const P = require('bluebird')
const bodyParser = require('body-parser')

const server = express()
server.use(bodyParser.urlencoded())
server.use(bodyParser.json())
const port = config.server.port
const log = new Log('info')
const PregnancyCenterModel = require('../app/models/pregnancy-center')

mongoose.Promise = require('bluebird')
server.use(cors())

// TODO: Error handling
const startDatabase = P.coroutine(function *startDatabase() {
	const connectionString = `mongodb://${config.server.hostname}/${config.database.name}`

	yield mongoose.connect(connectionString)

	log.info('Connected to database')

})

startDatabase()

server.get('/', function (req, res) {
	res.send('Hello World!')
})

server.get('/api/pregnancy-centers', function (req, res) {
	PregnancyCenterModel.find({}, function (err, allPregnancyCenters) {
		if (err) {
			log.error(err)
		}
		res.send(allPregnancyCenters)
	})
})

// temporarily hardcoded for testing GeoJSON
// to test, navigate to /data and run "node data", then run the server and access this endpoint

server.get('/api/pregnancy-centers/near-me', function (req, res) {

	const METERS_PER_MILE = 1609.34

	const lng = req.query.lng || -73.781332
	const lat = req.query.lat || 42.6721989
	const miles = req.query.miles || 5
	log.info({'lat': lat, 'lng': lng, 'miles': miles})

	PregnancyCenterModel.find({
		'address.location': {
			$nearSphere: {
				$geometry: {
					type: 'Point',
					coordinates: [lng, lat]
				},
				$maxDistance: miles * METERS_PER_MILE
			}
		}
	}, function (err, pregnancyCentersNearMe) {
		if (err) {
			log.error(err)
		}
		res.status(200).json(pregnancyCentersNearMe)
	})
})

server.get('/api/pregnancy-centers/verify', function (req, res) {

	// We can change the search conditions in the future based on how recently the pregnancy center has been verified ...
	// and what attributes were verified

	PregnancyCenterModel.findOne({'verified.address': null}, function (err, pregnancyCenterToVerify) {
		if (err) {
			log.error(err)
		}
		res.status(200).json(pregnancyCenterToVerify)
	})
})

server.post('/api/pregnancy-centers', function (req, res) {
	PregnancyCenterModel.create(req.body, function (err, result) {
		if (err) {
			log.error(err)
		}
		res.status(204).json(result)
	})
})

server.put('/api/pregnancy-centers/:pregnancyCenterId', function (req, res) {
	PregnancyCenterModel.update({_id: req.params['pregnancyCenterId']}, req.body, function (err, pregnancyCenterUpdated) {
		if (err) {
			log.error(err)
		} else {
			res.status(200).json(pregnancyCenterUpdated)
		}
	})
})

server.listen(port, function () {
	log.info(`Help Assist Her server listening on port ${port}`)
})
