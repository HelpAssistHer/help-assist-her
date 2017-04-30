'use strict'

const config = require('config')
const Log = require('log')
const mongoose = require('mongoose')
const P = require('bluebird')
const fs = require('fs')
const PregnancyCenterModel = require('../app/models/pregnancy-center')
const EJSON = require('mongodb-extended-json')
const Joi = require('joi')
P.promisifyAll(Joi)
const pregnancyCenterSchemaJoi = require('../app/schemas/pregnancy-center')
const log = new Log('info')
mongoose.Promise = require('bluebird')
P.promisifyAll(mongoose)
P.promisifyAll(fs)

const loadData = P.coroutine(function *startDatabase() {
	const connectionString = `mongodb://${config.server.hostname}/${config.database.name}`

	yield mongoose.connect(connectionString)
})

loadData()

// note that exports are 'mongoexport --db hah-dev --collection pregnancycenters --jsonArray --out cessilye_nypc_geocoded.json'

PregnancyCenterModel.collection.dropAsync()
	.catch( (err) => log.error(err))
	.then( () => {
		fs.readFile('test/fixtures/cessilye_nypc.json', 'utf8', (err, data) => {
			const docs = EJSON.parse(data)
			log.info(typeof docs)
			for (const doc of docs) {

				Joi.validateAsync(doc, pregnancyCenterSchemaJoi, {abortEarly: false})
					.catch( (err) => log.error(err))
					.then( (validatedData) => {
						PregnancyCenterModel.createAsync(validatedData)
							.then( (pc) => log.info(pc))
					})

			}

		})

	})
