'use strict'

const config = require('config')
const mongoose = require('mongoose')
const P = require('bluebird')
const Joi = require('joi')
const Log = require('log')
const PregnancyCenterModel = require('../pregnancy-centers/schema/mongoose-schema')
const log = new Log('info')

mongoose.Promise = require('bluebird')
P.promisifyAll(Joi)
P.promisifyAll(mongoose)

const googleMapsClient = require('@google/maps').createClient({
	key: 'AIzaSyDcdO_wAguQsbU1BJbeNIblfylyUNho7us'
})

// TODO: Error handling
const loadData = P.coroutine(function *startDatabase() {
	const connectionString = `mongodb://${config.server.hostname}/${config.database.name}`

	yield mongoose.connect(connectionString)

})

loadData()

// the longitude and latitute of PregnancyCenter are in pc.address.location, which is a GeoJSON point
// GeoJSON Point: { type: "Point", coordinates: [long, lat] }
//

// Google's geocoding API has the location part of the result in the format:
// "location" : {
//     "lat" : 37.4224764,
//     "lng" : -122.0842499
// }

function geocode(address) {
	return new P(function(resolve, reject) {
		googleMapsClient.geocode({ 'address': address }, function (err, response) { // called asynchronously
			if (err) {
				reject(err)
			} else {
				resolve(response.json.results[0].geometry.location)
			}
		})
	})
}

PregnancyCenterModel.findAsync({'address.location': null})
	.catch( (err) => log.error(err))
	.then ( (pregnancyCenters) => {

		for (const pregnancyCenter of pregnancyCenters) {
			log.info(pregnancyCenter.name)
			log.info(pregnancyCenter.getFullAddress())

			// Geocode an address.
			geocode(pregnancyCenter.getFullAddress())
				.catch((err) => log.error(err))
				.then((location) => {
					log.info(location)

					pregnancyCenter.address.location = {
						'type': 'Point',
						'coordinates': [location.lng, location.lat]
					}
					pregnancyCenter.saveAsync()
						.catch((err) => log.error(err))
						.then(() => log.info('Save complete'))
				})
		}
	})
