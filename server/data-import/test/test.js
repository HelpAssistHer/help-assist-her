'use strict'

// const moment = require('moment')
//
// //Require the dev-dependencies
// const chai = require('chai')
// const chaiHttp = require('chai-http')
// const config = require('config')
// // eslint-disable-next-line no-unused-vars
// const should = chai.should()
// const Joi = require('joi')
// const Log = require('log')
// const mongoose = require('mongoose')
// mongoose.Promise = require('bluebird')

const PregnancyCenterHistoryModel = require('../../pregnancy-center-history/schema/mongoose-schema')
const PregnancyCenterModel = require('../../pregnancy-centers/schema/mongoose-schema')
const pregnancyCenterSchemaJoi = require('../../pregnancy-centers/schema/joi-schema')
const server = require('../../server')
const UserModel = require('../../users/schema/mongoose-schema')

server
PregnancyCenterModel
pregnancyCenterSchemaJoi
UserModel
PregnancyCenterHistoryModel

//chai.use(chaiHttp)
//
// // Allows the middleware to think we're already authenticated.
// function mockAuthenticate() {
// 	server.request.isAuthenticated = function () {
// 		return true
// 	}
// 	UserModel.findOne({displayName: 'Kate Sills'}, (err, found) => {
// 		server.request.user =  found
// 	})
// }
//
// // Allows the middleware to think we are *not* authenticated
// function mockUnauthenticate () {
// 	server.request.isAuthenticated = function () {
// 		return false
// 	}
// }
//
// function assertError(res, statusCode, error, message=null) {
// 	res.should.have.status(statusCode)
// 	res.body.should.have.property('statusCode')
// 	res.body.should.have.property('error')
//
// 	if (message) {
// 		res.body.should.have.property('message')
// 		res.body.message.should.equal(message)
// 	}
//
// 	res.body.statusCode.should.equal(statusCode)
// 	res.body.error.should.equal(error)
// }
//
// function assertUnauthenticatedError(res) {
// 	assertError(res, 401, 'Unauthorized', 'User is not logged in.')
// }
//
// //Our parent block
// describe('PregnancyCenters', () => {
// 	beforeEach( async () => { //Before each test we empty the database
// 		mockUnauthenticate()
// 		await PregnancyCenterModel.remove({})
// 		await UserModel.remove({})
// 		const me = new UserModel({
// 			displayName: 'Kate Sills'
// 		})
// 		await me.save()
// 		const someoneElse = new UserModel({
// 			displayName: 'Someone Else'
// 		})
// 		return someoneElse.save()
// 	})
//
// 	/*
// 	 * Test the /GET /api/pregnancy-centers/open-now route w/o authentication
// 	 */
// 	describe('/GET /api/pregnancy-centers/open-now no-auth', () => {
// 		it('it should return a 401 error because there is no authentication', async () => {
// 			try {
// 				await chai.request(server)
// 					.get('/api/pregnancy-centers/open-now')
// 					.set('origin', config.server.originWhitelist[0])
// 			} catch (err) {
// 				assertUnauthenticatedError(err.response)
// 			}
// 		})
// 	})
//
// 	/*
// 	 * Test the /GET /api/pregnancy-centers/open-now route with authentication
// 	 */
// 	describe('/GET /api/pregnancy-centers/open-now ', () => {
// 		it('it should return one pregnancy center open at 10am on Mondays', async () => {
//
// 			// 1 is Monday
//
// 			await PregnancyCenterModel.create({
// 				'address': {
// 					'line1': '586 Central Ave.\nAlbany, NY 12206',
// 					'location': {
// 						'type': 'Point',
// 						'coordinates': [
// 							-73.7814005,
// 							42.6722152
// 						]
// 					},
// 				},
// 				'name': 'Birthright of Albany',
// 				'phone': '+15184382978',
// 				'website': 'http://www.birthright.org',
// 				'services': [],
// 				'hours': {
// 					1: [
// 						{
// 							open: 800, // 8am
// 							close: 1500 // 3pm
// 						}
// 					] // 1 is Monday
// 				}
//
// 			})
//
// 			await PregnancyCenterModel.create({
// 				'address': {
// 					'line1': '23-40 Astoria Boulevard\nAstoria, NY 11102',
// 					'location': {
// 						'type': 'Point',
// 						'coordinates': [
// 							-73.9241081,
// 							40.771253
// 						]
// 					},
// 				},
// 				'name': 'The Bridge To Life, Inc.',
// 				'phone': '+17182743577',
// 				'email': 'thebridgetolife@verizon.net',
// 				'website': 'http://www.thebridgetolife.org',
// 				'services': [],
// 				'hours': {
// 					1: [
// 						{
// 							open: 1300, // 1pm
// 							close: 1500 // 3pm
// 						}
// 					], // monday
// 					2: [
// 						{
// 							open: 1300, // 1pm
// 							close: 1500 // 3pm
// 						}
// 					],  // tuesday
// 				}
// 			})
//
// 			mockAuthenticate()
//
// 			const res = await chai.request(server)
// 				.get('/api/pregnancy-centers/open-now?time=1000&day=1')
// 				.set('origin', config.server.originWhitelist[0])
// 			res.should.have.status(200)
// 			res.body.should.be.a('array')
// 			res.body.length.should.be.eql(1)
// 			res.body[0].name.should.equal('Birthright of Albany')
// 		})
// 	})
//
// 	/*
// 	 * Test the /GET /api/pregnancy-centers route w/o authentication
// 	 */
// 	describe('/GET /api/pregnancy-centers no-auth', () => {
// 		it('it should return a 401 error because there is no authentication', async () => {
// 			try {
// 				await chai.request(server)
// 					.get('/api/pregnancy-centers')
// 					.set('origin', config.server.originWhitelist[0])
// 			} catch (err) {
// 				assertUnauthenticatedError(err.response)
// 			}
// 		})
// 	})
//
// 	/*
// 	 * Test the /POST /api/pregnancy-centers route w/o authentication
// 	 */
// 	describe('/POST /api/pregnancy-centers no-auth', () => {
// 		it('it should return a 401 error because there is no authentication', async () => {
// 			const pregnancyCenter = {
// 				address: {
// 					line1:'586 Central Ave.\nAlbany, NY 12206',
// 					location:{
// 						'type':'Point',
// 						'coordinates':[-73.7814005, 42.6722152]
// 					}},
// 				name:'Birthright of Albany',
// 				phone:'+15184382978',
// 				website:'http://www.birthright.org',
// 				services:[],
// 			}
//
// 			try {
// 				await chai.request(server)
// 					.post('/api/pregnancy-centers')
// 					.set('origin', config.server.originWhitelist[0])
// 					.send(pregnancyCenter)
// 			} catch (err) {
// 				assertUnauthenticatedError(err.response)
// 			}
// 		})
// 	})
//
// 	/*
// 	 * Test the /GET /api/pregnancy-centers route -- authenticated
// 	 */
// 	describe('/GET /api/pregnancy-centers', () => {
// 		it('it should return an empty array because there are no pregnancy centers yet', async () => {
// 			mockAuthenticate()
// 			const res = await chai.request(server)
// 				.get('/api/pregnancy-centers')
// 				.set('origin', config.server.originWhitelist[0])
// 			res.should.have.status(200)
// 			res.body.should.be.a('array')
// 			res.body.length.should.be.eql(0)
// 		})
// 	})
//
// 	/*
// 	 * Test the /POST /api/pregnancy-centers route -- authenticated
// 	 */
// 	describe('/POST /api/pregnancy-centers', () => {
// 		it('it should create a new pregnancy center and return the data', async () => {
// 			const pregnancyCenter = {
// 				address: {
// 					line1:'586 Central Ave.\nAlbany, NY 12206',
// 					location:{
// 						'type':'Point',
// 						'coordinates':[-73.7814005, 42.6722152]
// 					}},
// 				name:'Birthright of Albany',
// 				phone:'+15184382978',
// 				website:'http://www.birthright.org',
// 				services:[],
// 			}
// 			mockAuthenticate()
// 			const res = await chai.request(server)
// 				.post('/api/pregnancy-centers')
// 				.set('origin', config.server.originWhitelist[0])
// 				.send(pregnancyCenter)
// 			res.should.have.status(201)
// 			res.body.should.be.a('object')
// 			res.body.should.have.property('address')
// 			res.body.should.have.property('name')
// 			res.body.should.have.property('_id')
// 			res.body.should.have.property('website')
// 			res.body.should.have.property('phone')
// 			res.body.should.have.property('services')
// 			res.body.address.line1.should.equal('586 Central Ave.\nAlbany, NY 12206')
// 			res.body.address.location.type.should.equal('Point')
// 			res.body.address.location.coordinates.should.deep.equal(
// 				[-73.7814005, 42.6722152])
// 			res.body.name.should.equal('Birthright of Albany')
// 			res.body.phone.should.equal('+15184382978')
// 			res.body.website.should.equal('http://www.birthright.org')
// 			res.body.services.should.deep.equal([])
// 		})
// 	})
//
// 	/*
// 	 * Test the GET /api/pregnancy-centers/near-me' route w/o authentication
// 	 */
// 	describe('/GET /api/pregnancy-centers/near-me no-auth', () => {
// 		it('it should return a 401 error because there is no authentication', async () => {
// 			try {
// 				await chai.request(server)
// 					.get('/api/pregnancy-centers/near-me')
// 					.set('origin', config.server.originWhitelist[0])
// 			} catch (err) {
// 				assertUnauthenticatedError(err.response)
// 			}
// 		})
// 	})
//
// 	/*
// 	 * Test the GET /api/pregnancy-centers/near-me' route with authentication
// 	 */
// 	describe('/GET /api/pregnancy-centers/near-me', () => {
// 		it('it should return an array with only the Birthright of Albany in it, not the Bridge to Life', async () => {
//
// 			await PregnancyCenterModel.create({
// 				'address': {
// 					'line1': '586 Central Ave.\nAlbany, NY 12206',
// 					'location': {
// 						'type': 'Point',
// 						'coordinates': [
// 							-73.7814005,
// 							42.6722152
// 						]
// 					},
// 				},
// 				'name': 'Birthright of Albany',
// 				'phone': '+15184382978',
// 				'website': 'http://www.birthright.org',
// 				'services': []
//
// 			})
//
// 			await PregnancyCenterModel.create({
// 				'address': {
// 					'line1': '23-40 Astoria Boulevard\nAstoria, NY 11102',
// 					'location': {
// 						'type': 'Point',
// 						'coordinates': [
// 							-73.9241081,
// 							40.771253
// 						]
// 					},
// 				},
// 				'name': 'The Bridge To Life, Inc.',
// 				'phone': '+17182743577',
// 				'email': 'thebridgetolife@verizon.net',
// 				'website': 'http://www.thebridgetolife.org',
// 				'services': []
// 			})
//
// 			mockAuthenticate()
// 			const res = await chai.request(server)
// 				.get('/api/pregnancy-centers/near-me?lng=-73.781332&lat=42.6721989&miles=5')
// 				.set('origin', config.server.originWhitelist[0])
// 			res.should.have.status(200)
// 			res.body.should.be.a('array')
// 			res.body.length.should.be.eql(1)
// 			res.body[0].name.should.equal('Birthright of Albany')
// 		})
// 	})
//
// 	/*
// 	 * Test the /GET /api/pregnancy-centers/verify route w/o authentication
// 	 */
// 	describe('/GET /api/pregnancy-centers/verify no-auth', () => {
// 		it('it should return a 401 error because there is no authentication', async () => {
// 			try {
// 				await chai.request(server)
// 					.get('/api/pregnancy-centers/verify')
// 					.set('origin', config.server.originWhitelist[0])
// 			} catch (err) {
// 				assertUnauthenticatedError(err.response)
// 			}
// 		})
// 	})
//
// 	/*
// 	 * Test the /GET /api/pregnancy-centers/verify route with authentication
// 	 */
// 	describe('/GET /api/pregnancy-centers/verify', () => {
// 		it('it should return a single pregnancy center were verified.address is null', async () => {
//
// 			await PregnancyCenterModel.create({
// 				'address': {
// 					'line1': '586 Central Ave.\nAlbany, NY 12206',
// 					'location': {
// 						'type': 'Point',
// 						'coordinates': [
// 							-73.7814005,
// 							42.6722152
// 						]
// 					},
// 				},
// 				'name': 'Birthright of Albany',
// 				'phone': '+15184382978',
// 				'website': 'http://www.birthright.org',
// 				'services': []
//
// 			})
//
// 			await PregnancyCenterModel.create({
// 				'address': {
// 					'line1': '23-40 Astoria Boulevard\nAstoria, NY 11102',
// 					'location': {
// 						'type': 'Point',
// 						'coordinates': [
// 							-73.9241081,
// 							40.771253
// 						]
// 					},
// 				},
// 				'name': 'The Bridge To Life, Inc.',
// 				'phone': '+17182743577',
// 				'email': 'thebridgetolife@verizon.net',
// 				'website': 'http://www.thebridgetolife.org',
// 				'services': [],
// 				'verified': {
// 					'address': {
// 						'date': '2017-04-16T23:33:17.220Z'
// 					}
// 				}
// 			})
// 			mockAuthenticate()
//
// 			const res = await chai.request(server)
// 				.get('/api/pregnancy-centers/verify')
// 				.set('origin', config.server.originWhitelist[0])
//
// 			res.should.have.status(200)
// 			res.body.should.be.a('object')
// 			res.body.should.have.property('name')
// 			res.body.name.should.equal('Birthright of Albany')
// 			res.body.should.not.have.property('verified')
//
// 		})
// 	})
//
// 	/*
// 	 * Test the /GET /api/pregnancy-centers/verify route with authentication
// 	 */
// 	describe('/GET /api/pregnancy-centers/verify', () => {
// 		it('it should return a 404 not found because all pregnancy centers have been verified', async () => {
//
// 			await PregnancyCenterModel.create({
// 				'address': {
// 					'line1': '586 Central Ave.\nAlbany, NY 12206',
// 					'location': {
// 						'type': 'Point',
// 						'coordinates': [
// 							-73.7814005,
// 							42.6722152
// 						]
// 					},
// 				},
// 				'name': 'Birthright of Albany',
// 				'phone': '+15184382978',
// 				'website': 'http://www.birthright.org',
// 				'services': [],
// 				'verified': {
// 					'address': {
// 						'date' : '2017-04-16T23:33:17.220Z'
// 					}
// 				}
//
// 			})
//
// 			await PregnancyCenterModel.create({
// 				'address': {
// 					'line1': '23-40 Astoria Boulevard\nAstoria, NY 11102',
// 					'location': {
// 						'type': 'Point',
// 						'coordinates': [
// 							-73.9241081,
// 							40.771253
// 						]
// 					},
// 				},
// 				'name': 'The Bridge To Life, Inc.',
// 				'phone': '+17182743577',
// 				'email': 'thebridgetolife@verizon.net',
// 				'website': 'http://www.thebridgetolife.org',
// 				'services': [],
// 				'verified': {
// 					'address': {
// 						'date' : '2017-04-16T23:33:17.220Z'
// 					}
// 				}
// 			})
//
// 			mockAuthenticate()
//
// 			try {
// 				await chai.request(server)
// 					.get('/api/pregnancy-centers/verify')
// 					.set('origin', config.server.originWhitelist[0])
// 			} catch (err) {
// 				assertError(err.response, 404, 'Not Found')
// 			}
// 		})
// 	})
//
// 	/*
// 	 * Test the /PUT /api/pregnancy-centers/:pregnancyCenterId route w/o authentication
// 	 */
// 	describe('/PUT /api/pregnancy-centers/:pregnancyCenterId no-auth', () => {
// 		it('it should return a 401 error because there is no authentication', async () => {
//
// 			const pc = new PregnancyCenterModel({
// 				'address': {
// 					'line1': '586 Central Ave.\nAlbany, NY 12206',
// 					'location': {
// 						'type': 'Point',
// 						'coordinates': [
// 							-73.7814005,
// 							42.6722152
// 						]
// 					},
// 				},
// 				'name': 'Birthright of Albany',
// 				'phone': '+15184382978',
// 				'website': 'http://www.birthright.org',
// 				'services': [],
// 				'verified': {
// 					'address': {
// 						'date' : '2017-04-16T23:33:17.220Z'
// 					}
// 				}
//
// 			})
// 			await pc.save()
//
// 			try {
// 				await chai.request(server)
// 					.put('/api/pregnancy-centers/'+pc._id)
// 					.set('origin', config.server.originWhitelist[0])
// 					.send(pc)
// 			} catch (err) {
// 				assertUnauthenticatedError(err.response)
// 			}
// 		})
// 	})
//
// 	/*
// 	 * Test the /PUT /api/pregnancy-centers/:pregnancyCenterId route with authentication
// 	 */
// 	describe('/PUT /api/pregnancy-centers/:pregnancyCenterId', () => {
// 		it('it should return the updated pregnancyCenter record', async () => {
//
// 			const oldValues = {
// 				'address': {
// 					'line1': '586 Central Ave.\nAlbany, NY 12206',
// 					'location': {
// 						'type': 'Point',
// 						'coordinates': [
// 							-73.7814005,
// 							42.6722152
// 						]
// 					},
// 				},
// 				'name': 'Birthright of Albany',
// 				'phone': '+15184382978',
// 				'website': 'http://www.birthright.org',
// 				'services': [],
// 				'verified': {
// 					'address': {
// 						'date' : '2017-04-16T23:33:17.220Z'
// 					}
// 				}
// 			}
//
// 			const newValues = {
// 				'address': {
// 					'line1': 'New Address',
// 					'location': {
// 						'type': 'Point',
// 						'coordinates': [
// 							-73.7814005,
// 							42.6722152
// 						]
// 					},
// 				},
// 				'name': 'Birthright of Albany',
// 				'phone': '+15184382978',
// 				'website': 'http://www.birthright.org',
// 				'services': [],
// 				'verified': {
// 					'address': {
// 						'date' : '2017-04-16T23:33:17.220Z'
// 					}
// 				}
// 			}
//
// 			const testUser = await UserModel.findOne({ displayName: 'Kate Sills'})
//
// 			const oldPCObj = await PregnancyCenterModel.create(oldValues)
//
// 			mockAuthenticate()
//
// 			const res = await chai.request(server)
// 				.put('/api/pregnancy-centers/' + oldPCObj._id)
// 				.set('origin', config.server.originWhitelist[0])
// 				.send(newValues)
//
// 			res.should.have.status(200)
// 			res.body.should.be.a('object')
// 			res.body.should.have.property('_id')
// 			res.body.should.have.property('name')
// 			res.body._id.should.equal(String(oldPCObj._id))
// 			res.body.name.should.equal('Birthright of Albany')
// 			res.body.should.have.property('verified')
// 			res.body.should.have.property('updated')
// 			res.body.updated.should.have.property('address')
// 			res.body.updated.address.should.have.property('userId')
// 			res.body.updated.address.userId.should.equal(testUser._id.toString())
// 			res.body.verified.should.have.property('address')
//
// 			// check that the pregnancy center history is created as well.
// 			const newPCObj = await PregnancyCenterHistoryModel.find({
// 				pregnancyCenterId: oldPCObj._id
// 			})
// 			newPCObj.should.have.length(1)
// 		})
// 	})
//
// 	/*
// 	 * Test the /GET /api/pregnancy-centers/:pregnancyCenterId route w/o authentication
// 	 */
// 	describe('/GET /api/pregnancy-centers/:pregnancyCenterId no-auth', () => {
// 		it('it should return a 401 error because there is no authentication', async () => {
//
// 			const pc = new PregnancyCenterModel({
// 				'address': {
// 					'line1': '586 Central Ave.\nAlbany, NY 12206',
// 					'location': {
// 						'type': 'Point',
// 						'coordinates': [
// 							-73.7814005,
// 							42.6722152
// 						]
// 					},
// 				},
// 				'name': 'Birthright of Albany',
// 				'phone': '+15184382978',
// 				'website': 'http://www.birthright.org',
// 				'services': []
//
// 			})
// 			await pc.save()
//
// 			try {
// 				await chai.request(server)
// 					.get('/api/pregnancy-centers/'+pc._id)
// 					.set('origin', config.server.originWhitelist[0])
// 			} catch (err) {
// 				assertUnauthenticatedError(err.response)
// 			}
// 		})
// 	})
//
// 	/*
// 	 * Test the /GET /api/pregnancy-centers/:pregnancyCenterId route with authentication
// 	 */
// 	describe('/GET /api/pregnancy-centers/:pregnancyCenterId', () => {
// 		it('it should return a single pregnancy center matching the id', async () => {
//
// 			const pc = new PregnancyCenterModel({
// 				'address': {
// 					'line1': '586 Central Ave.\nAlbany, NY 12206',
// 					'location': {
// 						'type': 'Point',
// 						'coordinates': [
// 							-73.7814005,
// 							42.6722152
// 						]
// 					},
// 				},
// 				'name': 'Birthright of Albany',
// 				'phone': '+15184382978',
// 				'website': 'http://www.birthright.org',
// 				'services': []
//
// 			})
//
// 			await pc.save()
//
// 			mockAuthenticate()
// 			const res = await chai.request(server)
// 				.get('/api/pregnancy-centers/'+pc._id)
// 				.set('origin', config.server.originWhitelist[0])
// 			res.should.have.status(200)
// 			res.body.should.be.a('object')
// 			res.body.should.have.property('_id')
// 			res.body.should.have.property('name')
// 			res.body._id.should.equal(String(pc._id))
// 			res.body.name.should.equal('Birthright of Albany')
// 			res.body.should.not.have.property('verified')
//
// 		})
// 	})
//
// 	/*
// 	 * Test the Joi validation for pregnancy centers separately from the API routes
// 	 */
// 	describe('Test Joi validation for pregnancy centers address 1', () => {
// 		it('validation should fail because the address is not an object ', async () => {
//
// 			const testPCObj1 = {
// 				address: 'My address' // should be an object with line1, line2, city, etc.
// 			}
//
// 			const validationObj = await Joi.validate(testPCObj1, pregnancyCenterSchemaJoi, {
// 				abortEarly: false
// 			})
// 			validationObj.error.name.should.equal('ValidationError')
// 			validationObj.error.message.should.equal('child "address" fails because ["address" must be an object]')
// 		})
// 	})
//
// 	/*
// 	 * Test the Joi validation for pregnancy centers separately from the API routes
// 	 */
// 	describe('Test Joi validation for pregnancy centers address 2', () => {
// 		it('validation should fail because the location coordinates are reversed ', async () => {
//
// 			const testPCObj2 = {
// 				address: {
// 					line1: '123 Main Street',
// 					city: 'Albany',
// 					state: 'NY',
// 					location: {
// 						type: 'Point',
// 						coordinates: [
// 							42.6722152,
// 							-73.7814005 // lat, lng, reversed
//
// 						]
// 					},
//
// 				}
// 			}
//
// 			const validationObj = await Joi.validate(testPCObj2, pregnancyCenterSchemaJoi, {
// 				abortEarly: false
// 			})
//
// 			validationObj.error.name.should.equal('ValidationError')
// 			validationObj.error.message.should.equal('child "address" fails because [child "location" fails because [child "coordinates" fails because ["coordinates" at position 0 fails because ["0" must be less than or equal to -66], "coordinates" at position 1 fails because ["1" must be larger than or equal to 23]]]]')
// 		})
// 	})
//
// 	/*
// 	 * Test the Joi validation for pregnancy centers separately from the API routes
// 	 */
// 	describe('Test Joi validation for pregnancy centers address 3', () => {
// 		it('validation should fail because the location coordinates are reversed ', async () => {
//
// 			const testPCObj3 = {
// 				address: {
// 					line1: '123 Main Street',
// 					city: 'Albany',
// 					state: 'NY',
// 					location: {
// 						type: 'Point',
// 						coordinates: [
// 							42.6722152,
// 							-73.7814005 // lat, lng, reversed
//
// 						]
// 					},
//
// 				}
// 			}
//
// 			const validationObj = await Joi.validate(testPCObj3, pregnancyCenterSchemaJoi, {
// 				abortEarly: false
// 			})
// 			validationObj.error.name.should.equal('ValidationError')
// 			validationObj.error.message.should.equal('child "address" fails because [child "location" fails because [child "coordinates" fails because ["coordinates" at position 0 fails because ["0" must be less than or equal to -66], "coordinates" at position 1 fails because ["1" must be larger than or equal to 23]]]]')
// 		})
// 	})
//
// 	/*
// 	 * Test the Joi validation for pregnancy centers separately from the API routes
// 	 */
// 	describe('Test Joi validation for pregnancy centers dateCreated 4', () => {
// 		it('validation should fail because the dateCreated provided is not a date ', async () => {
//
// 			const testPCObj4 = {
// 				dateCreated: '3/3/2017'
// 			}
//
// 			const validationObj = await Joi.validate(testPCObj4, pregnancyCenterSchemaJoi, {
// 				abortEarly: false
// 			})
// 			validationObj.error.name.should.equal('ValidationError')
// 			validationObj.error.message.should.equal('child "dateCreated" fails because ["dateCreated" must be a valid ISO 8601 date]')
// 		})
// 	})
//
// 	/*
// 	 * Test the Joi validation for pregnancy centers separately from the API routes
// 	 */
// 	describe('Test Joi validation for pregnancy centers email 5', () => {
// 		it('validation should fail because the email address provided does not have an @', async () => {
//
// 			const testPCObj5 = {
// 				email: 'pregnancycenter.com'
// 			}
//
// 			const validationObj = await Joi.validate(testPCObj5, pregnancyCenterSchemaJoi, {
// 				abortEarly: false
// 			})
// 			validationObj.error.name.should.equal('ValidationError')
// 			validationObj.error.message.should.equal('child "email" fails because ["email" must be a valid email]')
// 		})
// 	})
//
// 	/*
// 	 * Test the Joi validation for pregnancy centers separately from the API routes
// 	 */
// 	describe('Test Joi validation for pregnancy centers hours 6', () => {
// 		it('validation should pass because hours follow this format', async () => {
//
// 			const testPCObj6 = {
// 				hours: {
// 					2: [{
// 						open: 800,
// 						close: 1700
// 					}]
// 				}
// 			}
//
// 			const validationObj = await Joi.validate(testPCObj6, pregnancyCenterSchemaJoi, {
// 				abortEarly: false
// 			})
// 			if (validationObj.error) {
// 				throw validationObj.error
// 			}
// 			const validatedData = validationObj.value
// 			validatedData.hours.should.deep.equal({
// 				2: [{
// 					open: 800,
// 					close: 1700
// 				}]
// 			})
// 		})
// 	})
//
// 	/*
// 	 * Test the Joi validation for pregnancy centers separately from the API routes
// 	 */
// 	describe('Test Joi validation for pregnancy centers readable hours 7', () => {
// 		it('validation should fail because tues is not one of the keys (it\'s 1-7)', async () => {
//
// 			const testPCObj7 = {
// 				hours: {
// 					tues: [{
// 						open: '800',
// 						close: '1700'
// 					}]
// 				}
// 			}
//
// 			const validationObj = await Joi.validate(testPCObj7, pregnancyCenterSchemaJoi, {
// 				abortEarly: false
// 			})
// 			validationObj.error.name.should.equal('ValidationError')
// 			validationObj.error.message.should.equal('child "hours" fails because ["tues" is not allowed]')
// 		})
// 	})
//
// 	/*
// 	 * Test the Joi validation for pregnancy centers separately from the API routes
// 	 */
// 	describe('Test Joi validation for pregnancy centers hours 8', () => {
// 		it('validation should pass because hours follow this format', async () => {
//
// 			const testPCObj8 = {
// 				hours: {
// 					1: [{
// 						open: 800,
// 						close: 1600,
// 					}]
// 				}
// 			}
//
// 			const validationObj = await Joi.validate(testPCObj8, pregnancyCenterSchemaJoi, {
// 				abortEarly: false
// 			})
// 			if (validationObj.error) {
// 				throw validationObj.error
// 			}
// 			const validatedData = validationObj.value
//
// 			validatedData.hours.should.deep.equal({
// 				1: [{
// 					open: 800,
// 					close: 1600,
// 				}]
// 			})
// 		})
// 	})
//
// 	/*
// 	 * Test the Joi validation for pregnancy centers separately from the API routes
// 	 */
// 	describe('Test Joi validation for pregnancy centers phone 9', () => {
// 		it('validation should fail because phone is in format xxx.xxx.xxx and needs to be in E.164 international format', async () => {
//
// 			const testPCObj9 = {
// 				phone: '888.444.2222'
// 			}
//
// 			const validationObj = await Joi.validate(testPCObj9, pregnancyCenterSchemaJoi, {
// 				abortEarly: false
// 			})
// 			validationObj.error.name.should.equal('ValidationError')
// 			validationObj.error.message.should.equal('child "phone" fails because ["phone" needs to be a valid phone number according to E.164 international format]')
// 		})
// 	})
//
// 	/*
// 	 * Test the Joi validation for pregnancy centers separately from the API routes
// 	 */
// 	describe('Test Joi validation for pregnancy centers phone 10', () => {
// 		it('validation should pass because phone is in E.164 international format', async () => {
//
// 			const testPCObj10 = {
// 				phone: '+18884442222'
// 			}
//
// 			const validationObj = await Joi.validate(testPCObj10, pregnancyCenterSchemaJoi, {
// 				abortEarly: false
// 			})
// 			if (validationObj.error) {
// 				throw validationObj.error
// 			}
// 			const validatedData = validationObj.value
// 			validatedData.phone.should.equal('+18884442222')
// 		})
// 	})
//
// 	/*
// 	 * Test the Joi validation for pregnancy centers separately from the API routes
// 	 */
// 	describe('Test Joi validation for pregnancy centers services 12', () => {
// 		it('validation should fail because one of the services is mispelled', async () => {
//
// 			const testPCObj12 = {
// 				services: [
// 					'Ulllltrasound', 'PARENTING_CLASSES'
// 				]
// 			}
//
// 			const validationObj = await Joi.validate(testPCObj12, pregnancyCenterSchemaJoi, {
// 				abortEarly: false
// 			})
// 			validationObj.error.name.should.equal('ValidationError')
// 			validationObj.error.message.should.equal('child "services" fails because ["services" at position 0 fails because ["0" must be one of [PREGNANCY_TEST, ULTRASOUND, MATERIAL_ASSISTANCE, POST_ABORTION_HEALING, PARENTING_CLASSES, STD_TESTING, COUNSELING]]]')
// 		})
// 	})
//
// 	/*
// 	 * Test the Joi validation for pregnancy centers separately from the API routes
// 	 */
// 	describe('Test Joi validation for pregnancy centers verified 13', () => {
// 		it('validation should fail because each verified field object only has keys date and userId', async () => {
//
// 			const testPCObj13 = {
// 				verified: {
// 					address: {
// 						dateVerified: moment()
// 					}
// 				}
// 			}
//
// 			const validationObj = await Joi.validate(testPCObj13, pregnancyCenterSchemaJoi, {
// 				abortEarly: false
// 			})
// 			validationObj.error.name.should.equal('ValidationError')
// 			validationObj.error.message.should.equal('child "verified" fails because [child "address" fails because ["dateVerified" is not allowed]]')
// 		})
// 	})
//
// 	/*
// 	 * Test the Joi validation for pregnancy centers separately from the API routes
// 	 */
// 	describe('Test Joi validation for pregnancy centers verified 13', () => {
// 		it('validation should pass because the verified field for address has date and userId', async () => {
//
// 			const testPCObj13 = {
// 				verified: {
// 					address: {
// 						date: moment().toISOString(),
// 						userId: '58e46a8d210140d7e47bf58b'
// 					}
// 				}
// 			}
//
// 			const validationObj = await Joi.validate(testPCObj13, pregnancyCenterSchemaJoi, {
// 				abortEarly: false
// 			})
// 			if (validationObj.error) {
// 				throw validationObj.error
// 			}
// 			const validatedData = validationObj.value
// 			validatedData.verified.address.userId.should.equal('58e46a8d210140d7e47bf58b')
// 		})
// 	})
//})
