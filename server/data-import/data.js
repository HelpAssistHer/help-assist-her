'use strict'

const config = require('config')
const Log = require('log')
const mongoose = require('mongoose')
const P = require('bluebird')
mongoose.Promise = require('bluebird')
const fs = require('fs')
const PregnancyCenterModel = require('../pregnancy-centers/schema/mongoose-schema')
const EJSON = require('mongodb-extended-json')
const Joi = require('joi')
const pregnancyCenterSchemaJoi = require('../pregnancy-centers/schema/joi-schema')
const log = new Log('info')


const loadData = P.coroutine(function *startDatabase() {
	const connectionString = `mongodb://${config.server.hostname}/${config.database.name}`

	yield mongoose.connect(connectionString)
})

loadData()

// note that exports are 'mongoexport --db hah-dev --collection pregnancycenters --jsonArray --out cessilye_nypc_geocoded.json'


async function reimport() {

	let docs

	try {
		await PregnancyCenterModel.collection.drop()
	} catch (err) {
		log.error(err)
	}

	try {
		const dataToImport = fs.readFileSync('server/data-import/test/fixtures/cessilye_nypc.json', 'utf8')
		docs = EJSON.parse(dataToImport)
	} catch (err) {
		log.error(err)
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
