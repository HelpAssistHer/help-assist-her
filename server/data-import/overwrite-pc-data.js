'use strict'

const config = require('config')
// Note that EJSON was updated without testing
const EJSON = require('mongodb-extjson')
const fs = require('fs')
const Log = require('log')
const mongoose = require('mongoose')
const P = require('bluebird')

const PregnancyCenterModel = require('../pregnancy-centers/schema/mongoose-schema')
const pregnancyCenterSchemaJoi = require('../pregnancy-centers/schema/joi-schema')

mongoose.Promise = require('bluebird')
const log = new Log('info')

const connectToDatabase = async () => {
	mongoose.connect(config.mongo.connectionString, { bufferCommands: false })
	log.info(`Connected to database ${config.mongo.connectionString} `)
}

const clearDatabase = async () => {
	try {
		await PregnancyCenterModel.collection.drop()
		log.info('Pregnancy Center collection cleared')
	} catch (err) {
		log.error(err)
	}
}

const getPregnancyCenterData = async () => {
	const dataToImport = fs.readFileSync(
		'server/data-import/fixtures/cessilye_nypc.json',
		'utf8',
	)
	log.info('pregnancy center data read in')
	return EJSON.parse(dataToImport)
}

const validateAndAddLocation = async (joiSchema, model, doc) => {
	let result = await joiSchema.validate(doc, {
		abortEarly: false,
	})

	const newLocation = await model.create(result.value)
	return newLocation._id
}

const importDocs = async (getDataFunction, schemaJoi, model) => {
	try {
		const docs = await getDataFunction()

		return await Promise.all(
			docs.map(async doc => {
				const _id = await validateAndAddLocation(schemaJoi, model, doc)
				log.info(_id)
			}),
		)
	} catch (err) {
		log.error(err)
		throw err
	}
}

async function reimport() {
	try {
		await connectToDatabase()
		const clear = process.argv[2]
		if (clear === '--clear') {
			await clearDatabase()
		}
		await importDocs(
			getPregnancyCenterData,
			pregnancyCenterSchemaJoi,
			PregnancyCenterModel,
		)
		log.info('pc data added')
		process.exit()
	} catch (err) {
		log.error(err)
	}
}

P.resolve(reimport())
