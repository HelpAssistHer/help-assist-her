'use strict'

//Require the dev-dependencies
const _ = require('lodash')
const chai = require('chai')
const chaiHttp = require('chai-http')
const Log = require('log')
// eslint-disable-next-line no-unused-vars
const should = chai.should()
const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')

const log = new Log('info')
const FQHCModel = require('../fqhcs/schema/mongoose-schema')
const FQHCHistoryModel = require('../fqhc-history/schema/mongoose-schema')
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
function mockUnauthenticate() {
	server.request.isAuthenticated = function () {
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

//Our parent block
describe('FQHCs', () => {
	beforeEach(async () => { //Before each test we empty the database
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
				services: {},

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

	/*
	 * Test the /PUT /api/fqhcs/:fqhcId route w/o authentication
	 */
	describe('/PUT /api/fqhcs/:fqhcId no-auth', () => {
		it('it should return a 401 error because there is no authentication', async () => {

			const fqhc = new FQHCModel({
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
				services: {},
			})

			await fqhc.save()

			try {
				await chai.request(server)
					.put('/api/fqhcs/' + fqhc._id)
					.send(fqhc)
			} catch (err) {
				assertUnauthenticatedError(err.response)
			}
		})
	})

	/*
	 * Test the /PUT /api/fqhcs/:fqhcId route with authentication
	 */
	describe('/PUT /api/fqhcs/:fqhcId', () => {
		it('it should return the updated fqhc record', async () => {
			await mockAuthenticate()

			const oldValues = {
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
				services: {},
			}

			const newValues = {
				'address': {
					'line1': 'New Address',
					'location': {
						'type': 'Point',
						'coordinates': [
							-73.99, // this is fake data
							42.6722152
						]
					},
				},
				'fqhcName': 'New Name',
				'phone': '+17185969899',
				'website': 'www.newurl.org',
				services: {'wellWomanCare': true},
				verifiedData: {
					address: {
						date: '2017-04-16T23:33:17.220Z'
					}
				}
			}

			const testUser = await UserModel.findOne({displayName: 'Kate Sills'})

			const oldFQHC = await FQHCModel.create(oldValues)

			const res = await chai.request(server)
				.put('/api/fqhcs/' + oldFQHC._id)
				.send(newValues)

			res.should.have.status(200)
			res.body.should.be.a('object')
			res.body.should.have.property('_id')
			res.body.should.have.property('fqhcName')
			res.body._id.should.equal(String(oldFQHC._id))
			res.body.fqhcName.should.equal('New Name')
			res.body.should.have.property('verifiedData')
			res.body.should.have.property('updated')
			res.body.updated.should.have.property('address')
			res.body.updated.address.should.have.property('userId')
			res.body.updated.address.userId.should.equal(testUser._id.toString())
			res.body.verifiedData.should.have.property('address')
			res.body.verifiedData.address.userId.should.equal(testUser._id.toString())

			// check that the pregnancy center history is created as well.
			const histories = await FQHCHistoryModel.find({
				fqhcId: oldFQHC._id
			})
			const fields = _.map(histories, 'field')
			fields.should.have.members([ 
				'fqhcName',
				'phone',
				'website',
				'services',
				'verifiedData',
				'address' ])
		})
	})

	/*
	 * Test the /PUT /api/fqhcs/:fqhcId route with authentication - outOfBusiness == True
	 */
	describe('/PUT /api/fqhcs/:fqhcId', () => {
		it('it should return a validation error because the original was outOfBusiness', async () => {
			await mockAuthenticate()

			const oldValues = {
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
				outOfBusiness: true,
				'fqhcName': 'BROOKLYN PLAZA MEDICAL CENTER, INC.',
				'phone': '+17185969800',
				'website': 'www.brooklynplaza.org',
				services: {},
			}

			const newValues = {
				'address': {
					'line1': 'New Address',
					'location': {
						'type': 'Point',
						'coordinates': [
							-73.99, // this is fake data
							42.6722152
						]
					},
				},
				'fqhcName': 'New Name',
				'phone': '+17185969899',
				'website': 'www.newurl.org',
				services: {'wellWomanCare': true},
				verifiedData: {
					address: {
						date: '2017-04-16T23:33:17.220Z'
					}
				}
			}

			const oldFQHC = await FQHCModel.create(oldValues)
			oldFQHC.outOfBusiness.should.equal(true)
			log.info('OLD outOfBusiness IS', oldFQHC.outOfBusiness)
			try {
				await chai.request(server)
					.put('/api/fqhcs/' + oldFQHC._id)
					.send(newValues)
				chai.assert.fail(0, 1, 'Error not thrown')	
			} catch (err) {
				assertError(err.response, 400, 'Bad Request', 'Cannot edit a outOfBusiness FQHC')
			}
		})
	})

	/*
	 * Test the /PUT /api/fqhcs/:fqhcId/out-of-business
	 */
	describe('/PUT /api/fqhcs/:fqhcId/out-of-business', () => {
		it('it should return the updated fqhc', async () => {
			await mockAuthenticate()

			const oldValues = {
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
				outOfBusiness: true,
				'fqhcName': 'BROOKLYN PLAZA MEDICAL CENTER, INC.',
				'phone': '+17185969800',
				'website': 'www.brooklynplaza.org',
				services: {},
			}
			
			const oldFQHC = await FQHCModel.create(oldValues)
			oldFQHC.outOfBusiness.should.equal(true)
			const testUser = await UserModel.findOne({displayName: 'Kate Sills'})
			
			const res = await chai.request(server)
				.put('/api/fqhcs/' + oldFQHC._id +'/out-of-business')
				.send({outOfBusiness: false})

			res.should.have.status(200)
			res.body.should.be.a('object')
			res.body.should.have.property('_id')
			res.body.should.have.property('fqhcName')
			res.body._id.should.equal(String(oldFQHC._id))
			res.body.fqhcName.should.equal(oldValues.fqhcName)
			res.body.should.have.property('verifiedData')
			res.body.should.have.property('updated')
			res.body.updated.should.have.property('outOfBusiness')
			res.body.updated.outOfBusiness.should.have.property('userId')
			res.body.updated.outOfBusiness.userId.should.equal(testUser._id.toString())

			// check that the pregnancy center history is created as well.
			const histories = await FQHCHistoryModel.find({
				fqhcId: oldFQHC._id
			})
			const fields = _.map(histories, 'field')
			fields.should.have.members(['outOfBusiness'])
		})
	})
})
