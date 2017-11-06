'use strict'

const config = require('config')
const Log = require('log')
const mongoose = require('mongoose')
const P = require('bluebird')
const PregnancyCenterModel = require('../pregnancy-centers/schema/mongoose-schema')
mongoose.Promise = require('bluebird')

const log = new Log('info')

// TODO: Error handling
const startDatabase = P.coroutine(function *startDatabase() {
	yield mongoose.connect(config.mongo.connectionString)
	
})

startDatabase()

async function clearInVerificationField() {
	const query = { inVerification: {$exists: true}}
	const update = {inVerification: null}
	try {
		await PregnancyCenterModel.update(query, update, {multi: true})
	} catch (err) {
		log.error(err)
	}
	process.exit()
}

clearInVerificationField()
