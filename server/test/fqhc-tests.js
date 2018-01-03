'use strict'

//Require the dev-dependencies
const chai = require('chai')
const chaiHttp = require('chai-http')
const Log = require('log')
// eslint-disable-next-line no-unused-vars
const should = chai.should()
const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')

const log = new Log('info')
const FQHCModel = require('../fqhcs/schema/mongoose-schema')
const server = require('../server')
const UserModel = require('../users/schema/mongoose-schema')

chai.use(chaiHttp)

// Allows the middleware to think we're already authenticated.
async function mockAuthenticate() {
	server.request.isAuthenticated = function () {
		return true
	}
	try {
		server.request.user = await UserModel.findOne({displayName: 'Kate Sills'})
	} catch (err) {
		log.err(err)
	}
}

// Allows the middleware to think we are *not* authenticated
function mockUnauthenticate () {
	server.request.isAuthenticated = function () {
		return false
	}
	server.request.user = null
}

function assertError(res, statusCode, error, message=null, data=null) {
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

//Our parent block
describe('FQHCs', () => {
	beforeEach( async () => { //Before each test we empty the database
		mockUnauthenticate()
		await FQHCModel.remove({})
		await UserModel.remove({})
		const me = new UserModel({
			displayName: 'Kate Sills'
		})
		await me.save()
		const someoneElse = new UserModel({
			displayName: 'Someone Else'
		})
		await someoneElse.save()
	})

	/*
	 * Test the /GET /api/fqhcs/verify route w/o authentication
	 */
	describe('/GET /api/fqhcs/verify no-auth', () => {
		it('it should return a 401 error because there is no authentication', async () => {
			try {
				await chai.request(server)
					.get('/api/fqhcs/verify')

			} catch (err) {
				assertUnauthenticatedError(err.response)
			}
		})
	})

	/*
	 * Test the /GET /api/fqhcs/verify route with authentication
	 */
	describe('/GET /api/fqhcs/verify', () => {
		it('it should return a single pregnancy center', async () => {
			
			await FQHCModel.create({
				'address': {
					'line1': '650 Fulton St	BROOKLYN, NY, 11217',
					'location': {
						'type': 'Point',
						'coordinates': [
							-73.7814005, // this is fake data
							42.6722152
						]
					},
				},
				'fqhcName': 'BROOKLYN PLAZA MEDICAL CENTER, INC.',
				'phone': '+17185969800',
				'website': 'www.brooklynplaza.org',
				services:{},

			})
			
			await mockAuthenticate()

			const res = await chai.request(server)
				.get('/api/fqhcs/verify')

			// note that verification is randomized, so there is no guarantee of the resulting object
			res.should.have.status(200)
			res.body.should.be.a('object')
			res.body.should.have.property('fqhcName')

		})
	})

	/*
	 * Test the /GET /api/fqhcs/verify route with authentication
	 */
	describe('/GET /api/fqhcs/verify', () => {
		it('it should return a 404 not found ', async () => {
			
			await mockAuthenticate()

			try {
				await chai.request(server)
					.get('/api/fqhcs/verify')

			} catch (err) {
				assertError(err.response, 404, 'Not Found')
			}
		})
	})
})
