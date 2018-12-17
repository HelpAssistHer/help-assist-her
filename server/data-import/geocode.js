'use strict'

const config = require('config')
const Log = require('log')
const mongoose = require('mongoose')
const P = require('bluebird')
const R = require('ramda')

const PregnancyCenterModel = require('../pregnancy-centers/schema/mongoose-schema')
const {
	getGoogleGeocode,
	getLocation,
	addLocation,
	saveDoc,
	getSafeFullAddress,
} = require('../util/geocode-helpers')

const { safePipeP } = require('../util/ramda-util')

mongoose.Promise = P
const log = new Log('info')

mongoose.connect(config.mongo.connectionString).then(
	() => {
		log.info('Connected to database')
	},
	err => {
		log.error(err)
	},
)

<<<<<<< HEAD
const geocodeAndSave = async pregnancyCenter => {
	try {
		return safePipeP([
			getSafeFullAddress,
			getGoogleGeocode,
			getLocation,
			R.partial(addLocation, [pregnancyCenter]),
			saveDoc,
=======
// ramda examples

// const then = (f, p) => p.then(f)
// const pipeP = R.pipeWith(then)
// const safePipe = R.pipeWith((f, res) => R.isNil(res) || R.isEmpty(res) ? res : f(res))

const safePipeP = R.pipeWith(
	(f, res) =>
		R.isNil(res) || R.isEmpty(res) ? res : Promise.resolve(res).then(f),
)

// the longitude and latitute of PregnancyCenter are in pc.address.location, which is a GeoJSON point
// GeoJSON Point: { type: "Point", coordinates: [long, lat] }
//

// Google's geocoding API has the location part of the result in the format:
// "location" : {
//     "lat" : 37.4224764,
//     "lng" : -122.0842499
// }

// string => response data as promise
const getGoogleGeocode = fullAddress =>
	googleMapsClient.geocode({ address: fullAddress }).asPromise() // a promise

// response => location json or null
const getLocation = response => {
	try {
		return response.json.results[0].geometry.location
	} catch (err) {
		log.info('response had no location')
		return null
	}
}

const saveLocation = async (pregnancyCenter, location) => {
	log.info(`saving ${pregnancyCenter.prcName}`)
	pregnancyCenter.address.location = {
		type: 'Point',
		coordinates: [location.lng, location.lat],
	}
	return pregnancyCenter.save() // a promise
}

const getFullAddress = pregnancyCenter => {
	const address = pregnancyCenter.getFullAddress()
	if (R.isEmpty(address)) log.info(`${pregnancyCenter.prcName} has no address`)
	return address
}

const geocodeAndSave = async pregnancyCenter => {
	try {
		return safePipeP([
			getFullAddress,
			getGoogleGeocode,
			getLocation,
			R.partial(saveLocation, [pregnancyCenter]),
>>>>>>> updated Ramda and rewrote geocode with a version of pipeWith that checks for isNil or Empty and accepts promises
		])(pregnancyCenter)
	} catch (err) {
		log.error(err)
	}
}

const geocodePregnancyCenters = async () => {
	const pregnancyCenters = await PregnancyCenterModel.find({
		'address.location': null,
	})
	return Promise.all(pregnancyCenters.map(geocodeAndSave))
}

geocodePregnancyCenters().then(() => process.exit())
