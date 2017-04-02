'use strict'

const config = require('config')
const mongoose = require('mongoose')
const P = require('bluebird')
const Log = require('log')
const PregnancyCenterModel = require('../app/models/pregnancy-center')

mongoose.Promise = require('bluebird')

var googleMapsClient = require('@google/maps').createClient({
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

PregnancyCenterModel.find({'address.location': null}, function (err, db_pcs) {
	if (err) {
		Log.info(err)
	}

	for (var i = 0, len = db_pcs.length; i < len; i++) {
		const pc = db_pcs[i]
		Log.info('found pregnancy center with id ' + pc.id)
		Log.info('address: ' + pc.getFullAddress())

		// Geocode an address.
		googleMapsClient.geocode({
			address: pc.getFullAddress()
		}, function (err, response) {
			if (!err) {
				const location = response.json.results[0].geometry.location
				Log.info(location)

				pc.address.location = {
					'type': 'Point',
					'coordinates': [location.lng, location.lat]
				}

				pc.save(function (err, pc) {
					if (err) {
						Log.info(err)
					} else {
						Log.info('Save complete.')
					}
				})

			} else {
				Log.info(err)
			}
		})

	}
})



