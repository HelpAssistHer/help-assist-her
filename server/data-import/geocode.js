'use strict'

const config = require('config')
const Log = require('log')
const mongoose = require('mongoose')
const P = require('bluebird')

const PregnancyCenterModel = require('../pregnancy-centers/schema/mongoose-schema')

mongoose.Promise = require('bluebird')
const log = new Log('info')

const googleMapsClient = require('@google/maps').createClient({
	key: config.googleMaps.key,
	Promise: P,
})

// TODO: Error handling
const startDatabase = P.coroutine(function* startDatabase() {
	yield mongoose.connect(config.mongo.connectionString)

	log.info('Connected to database')
})

startDatabase()

// the longitude and latitute of PregnancyCenter are in pc.address.location, which is a GeoJSON point
// GeoJSON Point: { type: "Point", coordinates: [long, lat] }
//

// Google's geocoding API has the location part of the result in the format:
// "location" : {
//     "lat" : 37.4224764,
//     "lng" : -122.0842499
// }

async function geocodePregnancyCenters() {
	const pregnancyCenters = await PregnancyCenterModel.find({
		'address.location': null,
	})
	for (const pregnancyCenter of pregnancyCenters) {
		log.info(pregnancyCenter.prcName)
		log.info(pregnancyCenter.getFullAddress())

		// Geocode an address.
		const response = await googleMapsClient
			.geocode({ address: pregnancyCenter.getFullAddress() })
			.asPromise()
		const location = response.json.results[0].geometry.location

		log.info(location)

		pregnancyCenter.address.location = {
			type: 'Point',
			coordinates: [location.lng, location.lat],
		}
		await pregnancyCenter.save()
	}
	process.exit()
}

geocodePregnancyCenters()
