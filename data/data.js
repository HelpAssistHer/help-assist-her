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

// TODO: Error handling
const loadData = P.coroutine(function *startDatabase() {
	const connectionString = `mongodb://${config.server.hostname}/${config.database.name}`

	yield mongoose.connect(connectionString)

	PregnancyCenterModel.collection.drop()

	// note that exports are 'mongoexport --db hah-dev --collection pregnancycenters --jsonArray --out cessilye_nypc_geocoded.json'

	fs.readFile('../test/fixtures/cessilye_nypc.json', 'utf8', function (err, data) {
		if (err) throw err
		const docs = EJSON.parse(data)
		for (let doc_num in docs) {
			Joi.validateAsync(docs[doc_num], pregnancyCenterSchemaJoi, {
				abortEarly: false
			}).then( (validatedData) => {
				PregnancyCenterModel.create(validatedData, function (err) {
					if (err) {
						log.error(err)
					}
				})
			}).catch( (err) => log.error(err))
				.then( () => log.info('pregnancy center imported'))
		}
	})
})

loadData()
