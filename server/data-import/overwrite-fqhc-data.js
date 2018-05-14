'use strict'

const config = require('config')
const EJSON = require('mongodb-extended-json')
const fs = require('fs')
const Joi = require('joi')
const Log = require('log')
const mongoose = require('mongoose')
const P = require('bluebird')

const FqhcModel = require('../fqhcs/schema/mongoose-schema')
const fqhcSchemaJoi = require('../fqhcs/schema/joi-schema')

mongoose.Promise = require('bluebird')
const log = new Log('info')

const connectToDatabase = async () => {
	mongoose.connect(config.mongo.connectionString, {'bufferCommands': false})
	log.info(`Connected to database ${config.mongo.connectionString} `)
}

// note that exports are 'mongoexport --db hah-dev --collection pregnancycenters --jsonArray --out cessilye_nypc_geocoded.json'

const clearDatabase = async () => {
	try {
		await FqhcModel.collection.drop()
		log.info('FQHC collections cleared')
	} catch (err) {
		log.error(err)
	}
}

const getFqhcData = async () => {
	const dataToImport = fs.readFileSync('server/data-import/fixtures/fqhcs.json', 'utf8')
	log.info('fqhc data read in')
	return EJSON.parse(dataToImport)
}

const validateAndAddLocation = async (joiSchema, model, doc) => {

	let result = await Joi.validate(doc, joiSchema, {
		abortEarly: false
	})

	const newLocation = await model.create(result.value)
	return newLocation._id
}

const importDocs = async (getDataFunction, schemaJoi, model) => {
	try {
		const docs = await getDataFunction()

		return await Promise.all(docs.map(async doc => {
			const _id = await validateAndAddLocation(schemaJoi, model, doc)
			log.info(_id)
		}))
	} catch (err) {
		log.error(err)
		throw err
	}
}

async function reimport() {
	try {
		await connectToDatabase()

		const clear = process.argv[2]
		if(clear === '--clear'){
			await clearDatabase()
		}
		await importDocs(getFqhcData, fqhcSchemaJoi, FqhcModel)
		log.info('fqhc data added')
		process.exit()
	} catch (err) {
		log.error(err)
	}
}

P.resolve(reimport())

