'use strict'

const config = require('config')
const EJSON = require('mongodb-extended-json')
const fs = require('fs')
const Joi = require('joi')
const Log = require('log')
const mongoose = require('mongoose')
const P = require('bluebird')

const PregnancyCenterModel = require('../pregnancy-centers/schema/mongoose-schema')
const pregnancyCenterSchemaJoi = require('../pregnancy-centers/schema/joi-schema')

mongoose.Promise = require('bluebird')
const log = new Log('info')

// TODO: Error handling
const startDatabase = P.coroutine(function *startDatabase() {
	yield mongoose.connect(config.mongo.connectionString)

	log.info('Connected to database')
})

startDatabase()

// note that exports are 'mongoexport --db hah-dev --collection pregnancycenters --jsonArray --out cessilye_nypc_geocoded.json'

async function reimport() {
	let docs

	await PregnancyCenterModel.collection.drop()

	try {
		const dataToImport = fs.readFileSync('server/data-import/test/fixtures/cessilye_nypc.json', 'utf8')
		docs = EJSON.parse(dataToImport)
	} catch (err) {
		log.error(err)
		process.exit()
	}

	for (const doc of docs) {
		const validationObj = await Joi.validate(doc, pregnancyCenterSchemaJoi, {
			abortEarly: false
		})
		if (validationObj.error) {
			log.error(validationObj.error)
		} else {
			const validatedPregnancyCenter = validationObj.value
			const newPregnancyCenter = await PregnancyCenterModel.create(validatedPregnancyCenter)
			log.info(newPregnancyCenter._id)
		}
	}
	process.exit()
}

reimport()
