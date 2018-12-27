'use strict'

const config = require('config')
const googleMaps = require('@google/maps')
const R = require('ramda')
const P = require('bluebird')
const Log = require('log')

const log = new Log('info')

const googleMapsClient = googleMaps.createClient({
	key: config.googleMaps.key,
	Promise: P,
})

// the longitude and latitute of PregnancyCenter or FQHC are in pc.address.location, which is a GeoJSON point
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

const addLocation = (doc, location) => {
	log.info(`saving ${doc.prcName || doc.fqhcName}`)
	doc.address.location = {
		type: 'Point',
		coordinates: [location.lng, location.lat],
	}
	return doc
}

const saveDoc = doc => {
	return doc.save() // a promise
}

const getFullAddress = doc => {
	const address = doc.getFullAddress()
	if (R.isEmpty(address))
		log.info(`${doc.prcName || doc.fqhCName} has no address`)
	return address
}

module.exports = {
	getGoogleGeocode,
	getLocation,
	addLocation,
	saveDoc,
	getFullAddress,
}
