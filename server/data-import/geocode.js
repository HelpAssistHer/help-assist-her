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

const geocodeAndSave = async pregnancyCenter => {
	try {
		return safePipeP([
			getSafeFullAddress,
			getGoogleGeocode,
			getLocation,
			R.partial(addLocation, [pregnancyCenter]),
			saveDoc,
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
