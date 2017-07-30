'use strict'

const config = require('config')
const mongoose = require('mongoose')
const P = require('bluebird')
const PregnancyCenterModel = require('../pregnancy-centers/schema/mongoose-schema')
mongoose.Promise = require('bluebird')

// TODO: Error handling
const startDatabase = P.coroutine(function *startDatabase() {
	yield mongoose.connect(config.mongo.connectionString)
	
})

startDatabase()

async function clearInVerificationField() {
	const query = {}
	const update = {inVerification: null}
	await PregnancyCenterModel.update(query, update)
	process.exit()
}

clearInVerificationField()
