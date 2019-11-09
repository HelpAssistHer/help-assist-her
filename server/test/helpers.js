'use strict'

//Require the dev-dependencies
const chai = require('chai')
const chaiHttp = require('chai-http')
// eslint-disable-next-line no-unused-vars
const should = chai.should()
const Log = require('log')
const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')

const log = new Log('info')
const PregnancyCenterHistoryModel = require('../pregnancy-center-history/schema/mongoose-schema')
const PregnancyCenterModel = require('../pregnancy-centers/schema/mongoose-schema')
const server = require('../server')
const UserModel = require('../users/schema/mongoose-schema')
const PersonModel = require('../persons/schema/mongoose-schema')
const FQHCModel = require('../fqhcs/schema/mongoose-schema')

chai.use(chaiHttp)

// Allows the middleware to think we're already authenticated.
async function mockAuthenticate() {
	server.request.isAuthenticated = function() {
		return true
	}
	try {
		server.request.user = await UserModel.findOne({ displayName: 'Kate Sills' })
	} catch (err) {
		log.error('ERROR IN MOCKAUTHENTICATE', err)
	}
}

// Allows the middleware to think we are *not* authenticated
function mockUnauthenticate() {
	server.request.isAuthenticated = function() {
		return false
	}
	server.request.user = null
}

function assertError(res, statusCode, error, message = null, data = null) {
	res.should.have.status(statusCode)
	res.body.should.have.property('statusCode')
	res.body.should.have.property('error')

	if (message) {
		res.body.should.have.property('message')
		res.body.message.should.equal(message)
	}

	if (data) {
		res.body.should.have.property('data')
		res.body.data.should.equal(data)
	}

	res.body.statusCode.should.equal(statusCode)
	res.body.error.should.equal(error)
}

function assertUnauthenticatedError(res) {
	assertError(res, 401, 'Unauthorized', 'User is not logged in.')
}

const beforeEachPregnancyCenter = async () => {
	mockUnauthenticate()
	await PregnancyCenterModel.remove({})
	await UserModel.remove({})
	await PregnancyCenterHistoryModel.remove({})
	await PersonModel.remove({})
	const me = new UserModel({
		displayName: 'Kate Sills',
	})
	await me.save()
	const someoneElse = new UserModel({
		displayName: 'Someone Else',
	})
	await someoneElse.save()
}

const beforeEachFQHC = async () => {
	//Before each test we empty the database
	mockUnauthenticate()
	await FQHCModel.remove({})
	await UserModel.remove({})
	const me = new UserModel({
		displayName: 'Kate Sills',
	})
	await me.save()
	const someoneElse = new UserModel({
		displayName: 'Someone Else',
	})
	await someoneElse.save()
}

const importTest = (name, path) => {
	describe(name, () => {
		require(path)
	})
}

module.exports = {
	mockAuthenticate,
	mockUnauthenticate,
	assertError,
	assertUnauthenticatedError,
	beforeEachPregnancyCenter,
	beforeEachFQHC,
	importTest,
}
