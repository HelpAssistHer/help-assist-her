'use strict'

const config = require('config')
const EJSON = require('mongodb-extended-json')
const fs = require('fs')
const Joi = require('joi')
const Log = require('log')
const mongoose = require('mongoose')
const P = require('bluebird')
const R = require('ramda')

const PregnancyCenterModel = require('../pregnancy-centers/schema/mongoose-schema')
const pregnancyCenterSchemaJoi = require('../pregnancy-centers/schema/joi-schema')

const FqhcModel = require('../fqhcs/schema/mongoose-schema')
const fqhcSchemaJoi = require('../fqhcs/schema/joi-schema')

mongoose.Promise = require('bluebird')
const log = new Log('info')

// TODO: Error handling
const startDatabase = P.coroutine(function *startDatabase() {
	yield mongoose.connect(config.mongo.connectionString)

	log.info('Connected to database')
})

startDatabase()

// note that exports are 'mongoexport --db hah-dev --collection pregnancycenters --jsonArray --out cessilye_nypc_geocoded.json'

const clearDatabase = async () => {
	try {
		await PregnancyCenterModel.collection.drop()
		await FqhcModel.collection.drop()
		log.info('Pregnancy Center and FQHC collections cleared')
	} catch (err) {
		log.error(err)
		if (!err.message.includes('ns')) {
			throw err
		}
	}
}

const getPregnancyCenterData = () => {
	return new P(async (resolve, reject) => {
		try {
			const dataToImport = fs.readFileSync('server/data-import/fixtures/cessilye_nypc.json', 'utf8')
			return resolve(EJSON.parse(dataToImport))
		} catch (err) {
			log.error(err)
			return reject(err)
		}
	})
}

const getFqhcData = () => {
	return new P(async (resolve, reject) => {
		try {
			const dataToImport = fs.readFileSync('server/data-import/fixtures/fqhcs.json', 'utf8')
			return resolve(EJSON.parse(dataToImport))
		} catch (err) {
			log.error(err)
			return reject(err)
		}
	})
}

const validate = (joiSchema, doc) => {
	const result = Joi.validate(doc, joiSchema, {
		abortEarly: false
	})
	if (result.error) {
		if (result.error.message.includes('phone')) {
			delete doc['phone']
			return validate(joiSchema, doc)
		} else {
			log.info('line 83')
			log.error(result.error)
			log.error(doc)
			return false
		}
	} else {
		return result.value
	}
}

const validateAndAddLocation = (joiSchema, model, doc) => {
	return new P(async (resolve, reject) => {
		try {
			let result = await Joi.validate(doc, joiSchema, {
				abortEarly: false
			})
			if (result.error && result.error.message.includes('phone')) {
				delete doc['phone']
				result = await Joi.validate(doc, joiSchema, {
					abortEarly: false
				})
			}

			const newLocation = await model.create(result.value)
				log.info(newLocation._id)
			return resolve()
		} catch (err) {
			log.info('line 103')
			log.info(doc)
			log.error(err.message)
			return reject(err)
		}
	})
}

const validateAndAddPregnancyCenter = R.partial(validateAndAddLocation, [pregnancyCenterSchemaJoi, PregnancyCenterModel])
const validateAndAddFqhc = R.partial(validateAndAddLocation, [fqhcSchemaJoi, FqhcModel])

const importPregnancyCenters = async () => {
	return new P(async (resolve, reject) => {
		try {
			const docs = await getPregnancyCenterData()
			await R.map(validateAndAddPregnancyCenter, docs)
			return resolve()
		} catch (err) {
			log.error(err)
			return reject(err)
		}
	})
}

const importFqhcs = () => {
	return new P(async (resolve, reject) => {
		try {
			const docs = await getFqhcData()
			await R.map(validateAndAddFqhc, docs)
			return resolve()
		} catch (err) {
			log.error(err)
			return reject(err)
		}
	})
}

async function reimport() {
	await clearDatabase()
	await importPregnancyCenters()
	await importFqhcs()
	process.exit()
}

reimport()
