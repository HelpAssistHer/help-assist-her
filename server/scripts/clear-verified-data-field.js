'use strict'

const config = require('config')
const Log = require('log')
const mongoose = require('mongoose')
const P = require('bluebird')
const PregnancyCenterModel = require('../pregnancy-centers/schema/mongoose-schema')
mongoose.Promise = require('bluebird')

const log = new Log('info')

// TODO: Error handling
const startDatabase = P.coroutine(function* startDatabase() {
	yield mongoose.connect(config.mongo.connectionString)
})

startDatabase()

async function clearVerifiedDataField() {
	const filter = { verifiedData: { $exists: true } }
	const update = { verifiedData: null }
	try {
		await PregnancyCenterModel.updateMany(filter, update)
	} catch (err) {
		log.error(err)
	}
	process.exit()
}

clearVerifiedDataField()
