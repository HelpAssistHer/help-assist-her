'use strict'

const PregnancyCenterModel = require('../app/models/pregnancy-center')
const pregnancyCenterSchemaJoi = require('../app/schemas/pregnancy-center')

const moment = require('moment')

const Log = require('log')
const log = new Log('info')

//Require the dev-dependencies
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server/server')
const hoursUtil = require('../utils/utils')

// eslint-disable-next-line no-unused-vars
const should = chai.should()
const Joi = require('joi')

chai.use(chaiHttp)

// Allows the middleware to think we're already authenticated.
function mockAuthenticate() {
	server.request.isAuthenticated = function () {
		return true
	}
}

// Allows the middleware to think we are *not* authenticated
function mockUnauthenticate () {
	server.request.isAuthenticated = function () {
		return false
	}
}

function assertError(res, statusCode, error, message=null) {
	res.should.have.status(statusCode)
	res.body.should.have.property('statusCode')
	res.body.should.have.property('error')

	if (message) {
		res.body.should.have.property('message')
		res.body.message.should.equal(message)
	}

	res.body.statusCode.should.equal(statusCode)
	res.body.error.should.equal(error)

}

function assertUnauthenticatedError(res) {
	assertError(res, 401, 'Unauthorized', 'User is not logged in.')
}

//Our parent block
describe('PregnancyCenters', () => {
	beforeEach((done) => { //Before each test we empty the database
		mockUnauthenticate()
		PregnancyCenterModel.remove({}, () => {
			done()
		})
	})

	describe('Test getHumanReadableHours util function', () => {
		it('it should return a queryable hours obj transformed into a human readable object', (done) => {
			// the pregnancy center is open from 8 to 5 on weekdays, except for a lunch break on mondays
			const queryableHours = {
				1: [{
					open: 28800,
					close: 43200
				}, {
					open: 46800,
					close: 61200
				}],
				2: [{
					open: 28800,
					close: 61200
				}],
				3: [{
					open: 28800,
					close: 61200
				}],
				4: [{
					open: 28800,
					close: 61200
				}],
				5: [{
					open: 28800,
					close: 61200
				}],
				6: [],
				7: []

			}
			const readableHours = hoursUtil.getHumanReadableHours(queryableHours)
			const expectedReadableHours = {
				'mon': [{
					open: '8:00AM',
					close: '12:00PM'
				}, {
					open: '1:00PM',
					close: '5:00PM'
				}],
				'tue': [{
					open: '8:00AM',
					close: '5:00PM'
				}],
				'wed':[{
					open: '8:00AM',
					close: '5:00PM'
				}],
				'thurs': [{
					open: '8:00AM',
					close: '5:00PM'
				}],
				'fri': [{
					open: '8:00AM',
					close: '5:00PM'
				}],
				'sat': [],
				'sun': []
			}
			readableHours.should.deep.equal(expectedReadableHours)
			done()
		})
	})

	/*
	 * Test the /GET /api/pregnancy-centers/open-now route w/o authentication
	 */
	describe('/GET /api/pregnancy-centers/open-now no-auth', () => {
		it('it should return a 401 error because there is no authentication', (done) => {
			chai.request(server)
				.get('/api/pregnancy-centers/open-now')
				.end((err, res) => {
					assertUnauthenticatedError(res)
					done()
				})
		})
	})

	/*
	 * Test the /GET /api/pregnancy-centers/open-now route with authentication
	 */
	describe('/GET /api/pregnancy-centers/open-now ', () => {
		it('it should return one pregnancy center open at 8PM on Sundays', (done) => {

			// Sunday is 7 according to moment().isoWeekday(7)

			PregnancyCenterModel.create({
				'address': {
					'line1': '586 Central Ave.\nAlbany, NY 12206',
					'location': {
						'type': 'Point',
						'coordinates': [
							-73.7814005,
							42.6722152
						]
					},
				},
				'name': 'Birthright of Albany',
				'phone': '+15184382978',
				'website': 'http://www.birthright.org',
				'services': [],
				'queryableHours': {
					7: [
						{
							open: 0,
							close: 82800
						}
					]
				}

			}, function(err) {
				if (err) log.info('Error in saving', err)
			})

			PregnancyCenterModel.create({
				'address': {
					'line1': '23-40 Astoria Boulevard\nAstoria, NY 11102',
					'location': {
						'type': 'Point',
						'coordinates': [
							-73.9241081,
							40.771253
						]
					},
				},
				'name': 'The Bridge To Life, Inc.',
				'phone': '+17182743577',
				'email': 'thebridgetolife@verizon.net',
				'website': 'http://www.thebridgetolife.org',
				'services': [],
				'queryableHours': {
					0: [
						{
							open: 0,
							close: 82800
						}
					],
					7: [
						{
							open: 80000,
							close: 82800
						}
					],
				}
			}, function(err) {
				if (err) log.info(err)
			})

			mockAuthenticate()
			chai.request(server)
				.get('/api/pregnancy-centers/open-now?date='+encodeURIComponent('2017-04-17T03:47:00.023Z'))
				.end((err, res) => {
					res.should.have.status(200)
					res.body.should.be.a('array')
					res.body.length.should.be.eql(1)
					res.body[0].name.should.equal('Birthright of Albany')
					done()
				})
		})
	})

	/*
	 * Test the /GET /api/pregnancy-centers route w/o authentication
	 */
	describe('/GET /api/pregnancy-centers no-auth', () => {
		it('it should return a 401 error because there is no authentication', (done) => {
			chai.request(server)
				.get('/api/pregnancy-centers')
				.end((err, res) => {
					assertUnauthenticatedError(res)
					done()
				})
		})
	})

	/*
	 * Test the /POST /api/pregnancy-centers route w/o authentication
	 */
	describe('/POST /api/pregnancy-centers no-auth', () => {
		it('it should return a 401 error because there is no authentication', (done) => {
			const pregnancyCenter = {
				address: {
					line1:'586 Central Ave.\nAlbany, NY 12206',
					location:{
						'type':'Point',
						'coordinates':[-73.7814005, 42.6722152]
					}},
				name:'Birthright of Albany',
				phone:'+15184382978',
				website:'http://www.birthright.org',
				services:[],
			}
			chai.request(server)
				.post('/api/pregnancy-centers')
				.send(pregnancyCenter)
				.end((err, res) => {
					assertUnauthenticatedError(res)
					done()
				})
		})
	})

	/*
	 * Test the /GET /api/pregnancy-centers route -- authenticated
	 */
	describe('/GET /api/pregnancy-centers', () => {
		it('it should return an empty array because there are no pregnancy centers yet', (done) => {
			mockAuthenticate()
			chai.request(server)
				.get('/api/pregnancy-centers')
				.end((err, res) => {
					res.should.have.status(200)
					res.body.should.be.a('array')
					res.body.length.should.be.eql(0)
					done()
				})
		})
	})

	/*
	 * Test the /POST /api/pregnancy-centers route -- authenticated
	 */
	describe('/POST /api/pregnancy-centers', () => {
		it('it should create a new pregnancy center and return the data', (done) => {
			const pregnancyCenter = {
				address: {
					line1:'586 Central Ave.\nAlbany, NY 12206',
					location:{
						'type':'Point',
						'coordinates':[-73.7814005, 42.6722152]
					}},
				name:'Birthright of Albany',
				phone:'+15184382978',
				website:'http://www.birthright.org',
				services:[],
			}
			mockAuthenticate()
			chai.request(server)
				.post('/api/pregnancy-centers')
				.send(pregnancyCenter)
				.end((err, res) => {
					res.should.have.status(201)
					res.body.should.be.a('object')
					res.body.should.have.property('address')
					res.body.should.have.property('name')
					res.body.should.have.property('_id')
					res.body.should.have.property('website')
					res.body.should.have.property('phone')
					res.body.should.have.property('services')
					res.body.address.line1.should.equal('586 Central Ave.\nAlbany, NY 12206')
					res.body.address.location.type.should.equal('Point')
					res.body.address.location.coordinates.should.deep.equal(
						[-73.7814005, 42.6722152])
					res.body.name.should.equal('Birthright of Albany')
					res.body.phone.should.equal('+15184382978')
					res.body.website.should.equal('http://www.birthright.org')
					res.body.services.should.deep.equal([])
					done()
				})
		})
	})

	/*
	 * Test the GET /api/pregnancy-centers/near-me' route w/o authentication
	 */
	describe('/GET /api/pregnancy-centers/near-me no-auth', () => {
		it('it should return a 401 error because there is no authentication', (done) => {
			chai.request(server)
			.get('/api/pregnancy-centers/near-me')
			.end((err, res) => {
				assertUnauthenticatedError(res)
				done()
			})
		})
	})

	/*
	 * Test the GET /api/pregnancy-centers/near-me' route with authentication
	 */
	describe('/GET /api/pregnancy-centers/near-me', () => {
		it('it should return an array with only the Birthright of Albany in it, not the Bridge to Life', (done) => {

			PregnancyCenterModel.create({
				'address': {
					'line1': '586 Central Ave.\nAlbany, NY 12206',
					'location': {
						'type': 'Point',
						'coordinates': [
							-73.7814005,
							42.6722152
						]
					},
				},
				'name': 'Birthright of Albany',
				'phone': '+15184382978',
				'website': 'http://www.birthright.org',
				'services': []
			
			}, function(err) {
				if (err) log.info(err)
			})

			PregnancyCenterModel.create({
				'address': {
					'line1': '23-40 Astoria Boulevard\nAstoria, NY 11102',
					'location': {
						'type': 'Point',
						'coordinates': [
							-73.9241081,
							40.771253
						]
					},
				},
				'name': 'The Bridge To Life, Inc.',
				'phone': '+17182743577',
				'email': 'thebridgetolife@verizon.net',
				'website': 'http://www.thebridgetolife.org',
				'services': []
			}, function(err) {
				if (err) log.info(err)
			})

			mockAuthenticate()
			chai.request(server)
				.get('/api/pregnancy-centers/near-me?lng=-73.781332&lat=42.6721989&miles=5')
				.end((err, res) => {

					res.should.have.status(200)
					res.body.should.be.a('array')
					res.body.length.should.be.eql(1)
					res.body[0].name.should.equal('Birthright of Albany')
					done()
				})
		})
	})

	/*
	 * Test the /GET /api/pregnancy-centers/verify route w/o authentication
	 */
	describe('/GET /api/pregnancy-centers/verify no-auth', () => {
		it('it should return a 401 error because there is no authentication', (done) => {
			chai.request(server)
				.get('/api/pregnancy-centers/verify')
				.end((err, res) => {
					assertUnauthenticatedError(res)
					done()
				})
		})
	})

	/*
	 * Test the /GET /api/pregnancy-centers/verify route with authentication
	 */
	describe('/GET /api/pregnancy-centers/verify', () => {
		it('it should return a single pregnancy center were verified.address is null', (done) => {

			PregnancyCenterModel.create({
				'address': {
					'line1': '586 Central Ave.\nAlbany, NY 12206',
					'location': {
						'type': 'Point',
						'coordinates': [
							-73.7814005,
							42.6722152
						]
					},
				},
				'name': 'Birthright of Albany',
				'phone': '+15184382978',
				'website': 'http://www.birthright.org',
				'services': []

			}, function(err) {
				if (err) log.error(err)
			})

			PregnancyCenterModel.create({
				'address': {
					'line1': '23-40 Astoria Boulevard\nAstoria, NY 11102',
					'location': {
						'type': 'Point',
						'coordinates': [
							-73.9241081,
							40.771253
						]
					},
				},
				'name': 'The Bridge To Life, Inc.',
				'phone': '+17182743577',
				'email': 'thebridgetolife@verizon.net',
				'website': 'http://www.thebridgetolife.org',
				'services': [],
				'verified': {
					'address': {
						'date' : '2017-04-16T23:33:17.220Z'
					}
				}
			}, function(err) {
				if (err) log.error(err)
			})

			mockAuthenticate()

			chai.request(server)
				.get('/api/pregnancy-centers/verify')
				.end((err, res) => {

					res.should.have.status(200)
					res.body.should.be.a('object')
					res.body.should.have.property('name')
					res.body.name.should.equal('Birthright of Albany')
					res.body.should.not.have.property('verified')
					done()
				})
		})
	})

	/*
	 * Test the /GET /api/pregnancy-centers/verify route with authentication
	 */
	describe('/GET /api/pregnancy-centers/verify', () => {
		it('it should return a 404 not found because all pregnancy centers have been verified', (done) => {

			PregnancyCenterModel.create({
				'address': {
					'line1': '586 Central Ave.\nAlbany, NY 12206',
					'location': {
						'type': 'Point',
						'coordinates': [
							-73.7814005,
							42.6722152
						]
					},
				},
				'name': 'Birthright of Albany',
				'phone': '+15184382978',
				'website': 'http://www.birthright.org',
				'services': [],
				'verified': {
					'address': {
						'date' : '2017-04-16T23:33:17.220Z'
					}
				}

			}, function(err) {
				if (err) log.error(err)
			})

			PregnancyCenterModel.create({
				'address': {
					'line1': '23-40 Astoria Boulevard\nAstoria, NY 11102',
					'location': {
						'type': 'Point',
						'coordinates': [
							-73.9241081,
							40.771253
						]
					},
				},
				'name': 'The Bridge To Life, Inc.',
				'phone': '+17182743577',
				'email': 'thebridgetolife@verizon.net',
				'website': 'http://www.thebridgetolife.org',
				'services': [],
				'verified': {
					'address': {
						'date' : '2017-04-16T23:33:17.220Z'
					}
				}
			}, function(err) {
				if (err) log.error(err)
			})

			mockAuthenticate()

			chai.request(server)
				.get('/api/pregnancy-centers/verify')
				.end((err, res) => {
					assertError(res, 404, 'Not Found')
					done()
				})
		})
	})

	/*
	 * Test the /PUT /api/pregnancy-centers/:pregnancyCenterId route w/o authentication
	 */
	describe('/PUT /api/pregnancy-centers/:pregnancyCenterId no-auth', () => {
		it('it should return a 401 error because there is no authentication', (done) => {

			PregnancyCenterModel.create({
				'address': {
					'line1': '586 Central Ave.\nAlbany, NY 12206',
					'location': {
						'type': 'Point',
						'coordinates': [
							-73.7814005,
							42.6722152
						]
					},
				},
				'name': 'Birthright of Albany',
				'phone': '+15184382978',
				'website': 'http://www.birthright.org',
				'services': [],
				'verified': {
					'address': {
						'date' : '2017-04-16T23:33:17.220Z'
					}
				}

			}, function(err, pc) {
				if (err) log.error(err)
				chai.request(server)
					.put('/api/pregnancy-centers/'+pc._id)
					.send(pc)
					.end((err, res) => {
						assertUnauthenticatedError(res)
						done()
					})
			})
		})
	})

	/*
	 * Test the /PUT /api/pregnancy-centers/:pregnancyCenterId route with authentication
	 */
	describe('/PUT /api/pregnancy-centers/:pregnancyCenterId', () => {
		it('it should return the updated pregnancyCenter record', (done) => {

			PregnancyCenterModel.create({
				'address': {
					'line1': '586 Central Ave.\nAlbany, NY 12206',
					'location': {
						'type': 'Point',
						'coordinates': [
							-73.7814005,
							42.6722152
						]
					},
				},
				'name': 'Birthright of Albany',
				'phone': '+15184382978',
				'website': 'http://www.birthright.org',
				'services': [],
				'verified': {
					'address': {
						'date' : '2017-04-16T23:33:17.220Z'
					}
				}
			}, function(err, pc) {
				if (err) log.error(err)
				mockAuthenticate()

				chai.request(server)
					.put('/api/pregnancy-centers/'+pc._id)
					.send(pc)
					.end((err, res) => {

						res.should.have.status(200)
						res.body.should.be.a('object')
						res.body.should.have.property('_id')
						res.body.should.have.property('name')
						res.body._id.should.equal(String(pc._id))
						res.body.name.should.equal('Birthright of Albany')
						res.body.should.have.property('verified')
						res.body.verified.should.have.property('address')
						done()
					})
			})
		})
	})

	/*
	 * Test the /GET /api/pregnancy-centers/:pregnancyCenterId route w/o authentication
	 */
	describe('/GET /api/pregnancy-centers/:pregnancyCenterId no-auth', () => {
		it('it should return a 401 error because there is no authentication', (done) => {

			PregnancyCenterModel.create({
				'address': {
					'line1': '586 Central Ave.\nAlbany, NY 12206',
					'location': {
						'type': 'Point',
						'coordinates': [
							-73.7814005,
							42.6722152
						]
					},
				},
				'name': 'Birthright of Albany',
				'phone': '+15184382978',
				'website': 'http://www.birthright.org',
				'services': []

			}, function(err, pc) {
				if (err) log.error(err)
				chai.request(server)
					.get('/api/pregnancy-centers/'+pc._id)
					.end((err, res) => {
						assertUnauthenticatedError(res)
						done()
					})
			})
		})
	})

	/*
	 * Test the /GET /api/pregnancy-centers/:pregnancyCenterId route with authentication
	 */
	describe('/GET /api/pregnancy-centers/:pregnancyCenterId', () => {
		it('it should return a single pregnancy center matching the id', (done) => {

			PregnancyCenterModel.create({
				'address': {
					'line1': '586 Central Ave.\nAlbany, NY 12206',
					'location': {
						'type': 'Point',
						'coordinates': [
							-73.7814005,
							42.6722152
						]
					},
				},
				'name': 'Birthright of Albany',
				'phone': '+15184382978',
				'website': 'http://www.birthright.org',
				'services': []

			}, function(err, pc) {
				if (err) log.error(err)
				mockAuthenticate()
				chai.request(server)
					.get('/api/pregnancy-centers/'+pc._id)
					.end((err, res) => {
						res.should.have.status(200)
						res.body.should.be.a('object')
						res.body.should.have.property('_id')
						res.body.should.have.property('name')
						res.body._id.should.equal(String(pc._id))
						res.body.name.should.equal('Birthright of Albany')
						res.body.should.not.have.property('verified')
						done()
					})
			})
		})
	})

	/*
	 * Test the Joi validation for pregnancy centers separately from the API routes
	 */
	describe('Test Joi validation for pregnancy centers address 1', () => {
		it('validation should fail because the address is not an object ', (done) => {

			const testPCObj1 = {
				address: 'My address' // should be an object with line1, line2, city, etc.
			}

			Joi.validate(testPCObj1, pregnancyCenterSchemaJoi, {
				abortEarly: false
			}, function(err) {
				err.name.should.equal('ValidationError')
				err.message.should.equal('child "address" fails because ["address" must be an object]')
				done()
			})
		})
	})

	/*
	 * Test the Joi validation for pregnancy centers separately from the API routes
	 */
	describe('Test Joi validation for pregnancy centers address 2', () => {
		it('validation should fail because the location coordinates are reversed ', (done) => {

			const testPCObj2 = {
				address: {
					line1: '123 Main Street',
					city: 'Albany',
					state: 'NY',
					location: {
						type: 'Point',
						coordinates: [
							42.6722152,
							-73.7814005 // lat, lng, reversed

						]
					},

				}
			}

			Joi.validate(testPCObj2, pregnancyCenterSchemaJoi, {
				abortEarly: false
			}, function(err) {
				err.name.should.equal('ValidationError')
				err.message.should.equal('child "address" fails because [child "location" fails because [child "coordinates" fails because ["coordinates" at position 0 fails because ["0" must be less than or equal to -66], "coordinates" at position 1 fails because ["1" must be larger than or equal to 23]]]]')
				done()
			})
		})
	})

	/*
	 * Test the Joi validation for pregnancy centers separately from the API routes
	 */
	describe('Test Joi validation for pregnancy centers address 3', () => {
		it('validation should fail because the location coordinates are reversed ', (done) => {

			const testPCObj3 = {
				address: {
					line1: '123 Main Street',
					city: 'Albany',
					state: 'NY',
					location: {
						type: 'Point',
						coordinates: [
							42.6722152,
							-73.7814005 // lat, lng, reversed

						]
					},

				}
			}

			Joi.validate(testPCObj3, pregnancyCenterSchemaJoi, {
				abortEarly: false
			}, function(err) {
				err.name.should.equal('ValidationError')
				err.message.should.equal('child "address" fails because [child "location" fails because [child "coordinates" fails because ["coordinates" at position 0 fails because ["0" must be less than or equal to -66], "coordinates" at position 1 fails because ["1" must be larger than or equal to 23]]]]')
				done()
			})
		})
	})

	/*
	 * Test the Joi validation for pregnancy centers separately from the API routes
	 */
	describe('Test Joi validation for pregnancy centers dateCreated 4', () => {
		it('validation should fail because the dateCreated provided is not a date ', (done) => {

			const testPCObj4 = {
				dateCreated: '3/3/2017'
			}

			Joi.validate(testPCObj4, pregnancyCenterSchemaJoi, {
				abortEarly: false
			}, function(err) {
				err.name.should.equal('ValidationError')
				err.message.should.equal('child "dateCreated" fails because ["dateCreated" must be a valid ISO 8601 date]')
				done()
			})
		})
	})

	/*
	 * Test the Joi validation for pregnancy centers separately from the API routes
	 */
	describe('Test Joi validation for pregnancy centers email 5', () => {
		it('validation should fail because the email address provided does not have an @', (done) => {

			const testPCObj5 = {
				email: 'pregnancycenter.com'
			}

			Joi.validate(testPCObj5, pregnancyCenterSchemaJoi, {
				abortEarly: false
			}, function(err) {
				err.name.should.equal('ValidationError')
				err.message.should.equal('child "email" fails because ["email" must be a valid email]')
				done()
			})
		})
	})

	/*
	 * Test the Joi validation for pregnancy centers separately from the API routes
	 */
	describe('Test Joi validation for pregnancy centers readable hours 6', () => {
		it('validation should pass because readable hours follow this format', (done) => {

			const testPCObj6 = {
				hours: {
					tue: [{
						open: '8:00AM',
						close: '5:00PM'
					}]
				}
			}

			Joi.validate(testPCObj6, pregnancyCenterSchemaJoi, {
				abortEarly: false
			}, function(err, validatedData) {
				validatedData.hours.should.deep.equal({
					tue: [{
						open: '8:00AM',
						close: '5:00PM'
					}]
				})
				done()
			})
		})
	})

	/*
	 * Test the Joi validation for pregnancy centers separately from the API routes
	 */
	describe('Test Joi validation for pregnancy centers readable hours 7', () => {
		it('validation should fail because tues is not one of the keys (it\'s tue)', (done) => {

			const testPCObj7 = {
				hours: {
					tues: [{
						open: '8:00AM',
						close: '5:00PM'
					}]
				}
			}

			Joi.validate(testPCObj7, pregnancyCenterSchemaJoi, {
				abortEarly: false
			}, function(err) {
				err.name.should.equal('ValidationError')
				err.message.should.equal('child "hours" fails because ["tues" is not allowed]')
				done()
			})
		})
	})

	/*
	 * Test the Joi validation for pregnancy centers separately from the API routes
	 */
	describe('Test Joi validation for pregnancy centers queryable hours 8', () => {
		it('validation should pass because queryable hours follow this format', (done) => {

			const testPCObj8 = {
				queryableHours: {
					2: [{
						open: '28800',
						close: '61200'
					}]
				}
			}

			Joi.validate(testPCObj8, pregnancyCenterSchemaJoi, {
				abortEarly: false
			}, function(err, validatedData) {
				validatedData.queryableHours.should.deep.equal({
					2: [{
						open: 28800,
						close: 61200
					}]
				})
				done()
			})
		})
	})

	/*
	 * Test the Joi validation for pregnancy centers separately from the API routes
	 */
	describe('Test Joi validation for pregnancy centers phone 9', () => {
		it('validation should fail because phone is in format xxx.xxx.xxx and needs to be in E.164 international format', (done) => {

			const testPCObj9 = {
				phone: '888.444.2222'
			}

			Joi.validate(testPCObj9, pregnancyCenterSchemaJoi, {
				abortEarly: false
			}, function(err) {
				err.name.should.equal('ValidationError')
				err.message.should.equal('child "phone" fails because ["phone" needs to be a valid phone number according to E.164 international format]')
				done()
			})
		})
	})

	/*
	 * Test the Joi validation for pregnancy centers separately from the API routes
	 */
	describe('Test Joi validation for pregnancy centers phone 10', () => {
		it('validation should pass because phone is in E.164 international format', (done) => {

			const testPCObj10 = {
				phone: '+18884442222'
			}

			Joi.validate(testPCObj10, pregnancyCenterSchemaJoi, {
				abortEarly: false
			}, function(err, validatedData) {
				validatedData.phone.should.equal('+18884442222')
				done()
			})
		})
	})
	
	/*
	 * Test the Joi validation for pregnancy centers separately from the API routes
	 */
	describe('Test Joi validation for pregnancy centers services 12', () => {
		it('validation should fail because one of the services is mispelled', (done) => {

			const testPCObj12 = {
				services: [
					'Ulllltrasound', 'PARENTING_CLASSES'
				]
			}

			Joi.validate(testPCObj12, pregnancyCenterSchemaJoi, {
				abortEarly: false
			}, function(err) {
				err.name.should.equal('ValidationError')
				err.message.should.equal('child "services" fails because ["services" at position 0 fails because ["0" must be one of [PREGNANCY_TEST, ULTRASOUND, MATERIAL_ASSISTANCE, POST_ABORTION_HEALING, PARENTING_CLASSES, STD_TESTING, COUNSELING]]]')
				done()
			})
		})
	})

	/*
	 * Test the Joi validation for pregnancy centers separately from the API routes
	 */
	describe('Test Joi validation for pregnancy centers verified 13', () => {
		it('validation should fail because each verified field object only has keys date and userId', (done) => {

			const testPCObj13 = {
				verified: {
					address: {
						dateVerified: moment()
					}
				}
			}

			Joi.validate(testPCObj13, pregnancyCenterSchemaJoi, {
				abortEarly: false
			}, function(err) {
				err.name.should.equal('ValidationError')
				err.message.should.equal('child "verified" fails because [child "address" fails because ["dateVerified" is not allowed]]')
				done()
			})
		})
	})

	/*
	 * Test the Joi validation for pregnancy centers separately from the API routes
	 */
	describe('Test Joi validation for pregnancy centers verified 13', () => {
		it('validation should pass because the verified field for address has date and userId', (done) => {

			const testPCObj13 = {
				verified: {
					address: {
						date: moment().toISOString(),
						userId: '58e46a8d210140d7e47bf58b'
					}
				}
			}

			Joi.validate(testPCObj13, pregnancyCenterSchemaJoi, {
				abortEarly: false
			}, function(err, validatedData) {
				validatedData.verified.address.userId.should.equal('58e46a8d210140d7e47bf58b')
				done()
			})
		})
	})

})

