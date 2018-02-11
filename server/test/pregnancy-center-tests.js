'use strict'

const moment = require('moment')

//Require the dev-dependencies
const _ = require('lodash')
const chai = require('chai')
const chaiHttp = require('chai-http')
// eslint-disable-next-line no-unused-vars
const should = chai.should()
const Joi = require('joi')
const Log = require('log')
const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')

const log = new Log('info')
const PregnancyCenterHistoryModel = require('../pregnancy-center-history/schema/mongoose-schema')
const PregnancyCenterModel = require('../pregnancy-centers/schema/mongoose-schema')
const pregnancyCenterSchemaJoi = require('../pregnancy-centers/schema/joi-schema')
const server = require('../server')
const UserModel = require('../users/schema/mongoose-schema')
const PersonModel = require('../persons/schema/mongoose-schema')

chai.use(chaiHttp)

// Allows the middleware to think we're already authenticated.
async function mockAuthenticate() {
	server.request.isAuthenticated = function () {
		return true
	}
	try {
		server.request.user = await UserModel.findOne({displayName: 'Kate Sills'})
	} catch (err) {
		log.error('ERROR IN MOCKAUTHENTICATE', err)
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
describe('PregnancyCenters', () => {
	beforeEach(async () => { //Before each test we empty the database
		mockUnauthenticate()
		await PregnancyCenterModel.remove({})
		await UserModel.remove({})
		await PregnancyCenterHistoryModel.remove({})
		await PersonModel.remove({})
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
	 * Test the /GET /api/pregnancy-centers/open-now route w/o authentication
	 */
	describe('/GET /api/pregnancy-centers/open-now no-auth', () => {
		it('it should return a 401 error because there is no authentication', async () => {
			try {
				await chai.request(server)
					.get('/api/pregnancy-centers/open-now')
			} catch (err) {
				assertUnauthenticatedError(err.response)
			}
		})
	})

	/*
	 * Test the /GET /api/pregnancy-centers/open-now route with authentication
	 */
	describe('/GET /api/pregnancy-centers/open-now ', () => {
		it('it should return one pregnancy center open at 10am on Mondays', async () => {

			const primaryContactPerson = new PersonModel({
				firstName: 'Joanna',
				lastName: 'Smith',
				email: 'email@email.org',
				phone: '+18884442222'
			})
			await primaryContactPerson.save()

			// 1 is Monday

			await PregnancyCenterModel.create({
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
				'prcName': 'Birthright of Albany',
				'phone': '+15184382978',
				'primaryContactPerson': primaryContactPerson,
				'website': 'http://www.birthright.org',
				'services': {},
				'hours': {
					1: {
						open: 800, // 8am
						close: 1500 // 3pm
					}// 1 is Monday
				}

			})

			// copy of the above model, but with outOfBusiness = True - should not be returned
			await PregnancyCenterModel.create({
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
				outOfBusiness: true,
				'prcName': 'Birthright of Albany - outOfBusiness',
				'phone': '+15184382978',
				'primaryContactPerson': primaryContactPerson,
				'website': 'http://www.birthright.org',
				'services': {},
				'hours': {
					1: {
						open: 800, // 8am
						close: 1500 // 3pm
					}// 1 is Monday
				}

			})

			await PregnancyCenterModel.create({
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
				'prcName': 'The Bridge To Life, Inc.',
				'phone': '+17182743577',
				'email': 'thebridgetolife@verizon.net',
				'website': 'http://www.thebridgetolife.org',
				'services': {},
				'hours': {
					1: {
						open: 1300, // 1pm
						close: 1500 // 3pm
					}, // monday
					2: {
						open: 1300, // 1pm
						close: 1500 // 3pm
					} // tuesday
				}
			})

			await mockAuthenticate()

			const res = await chai.request(server)
				.get('/api/pregnancy-centers/open-now?time=1000&day=1')
			res.should.have.status(200)
			res.body.should.be.a('array')
			res.body.length.should.be.eql(1)
			res.body[0].prcName.should.equal('Birthright of Albany')
			res.body[0].primaryContactPerson.firstName.should.equal('Joanna')
		})
	})

	/*
	 * Test the /GET /api/pregnancy-centers route w/o authentication
	 */
	describe('/GET /api/pregnancy-centers no-auth', () => {
		it('it should return a 401 error because there is no authentication', async () => {
			try {
				await chai.request(server)
					.get('/api/pregnancy-centers')

			} catch (err) {
				assertUnauthenticatedError(err.response)
			}
		})
	})

	/*
	 * Test the /POST /api/pregnancy-centers route w/o authentication
	 */
	describe('/POST /api/pregnancy-centers no-auth', () => {
		it('it should return a 401 error because there is no authentication', async () => {
			const pregnancyCenter = {
				address: {
					line1: '586 Central Ave.\nAlbany, NY 12206',
					location: {
						'type': 'Point',
						'coordinates': [-73.7814005, 42.6722152]
					}
				},
				prcName: 'Birthright of Albany',
				phone: '+15184382978',
				website: 'http://www.birthright.org',
				services: {},
			}

			try {
				await chai.request(server)
					.post('/api/pregnancy-centers')

					.send(pregnancyCenter)
			} catch (err) {
				assertUnauthenticatedError(err.response)
			}
		})
	})

	/*
	 * Test the /GET /api/pregnancy-centers route -- authenticated
	 */
	describe('/GET /api/pregnancy-centers', () => {
		it('it should return an empty array because there are no pregnancy centers yet', async () => {
			await mockAuthenticate()
			const res = await chai.request(server)
				.get('/api/pregnancy-centers')

			res.should.have.status(200)
			res.body.should.be.a('array')
			res.body.length.should.be.eql(0)
		})
	})

	/*
	 * Test the /POST /api/pregnancy-centers route -- authenticated
	 */
	describe('/POST /api/pregnancy-centers', () => {
		it('it should create a new pregnancy center and return the data', async () => {

			const primaryContactPerson = new PersonModel({
				firstName: 'Joanna',
				lastName: 'Smith',
				email: 'email@email.org',
				phone: '+18884442222'
			})

			try {
				await primaryContactPerson.save()
			} catch (err) {
				log.error(err)
			}

			const pregnancyCenter = {
				address: {
					line1: '586 Central Ave.\nAlbany, NY 12206',
					location: {
						'type': 'Point',
						'coordinates': [-73.7814005, 42.6722152]
					}
				},
				outOfBusiness: true, // this shouldn't affect anything
				prcName: 'Birthright of Albany',
				phone: '+15184382978',
				website: 'http://www.birthright.org',
				primaryContactPerson: primaryContactPerson,
				services: {},
				verifiedData: {
					phone: {
						verified: true,
						'date': '2017-04-16T23:33:17.220Z'
					}
				}
			}
			const testUser = await UserModel.findOne({displayName: 'Kate Sills'})
			await mockAuthenticate()
			const res = await chai.request(server)
				.post('/api/pregnancy-centers')
				.send(pregnancyCenter)
			res.should.have.status(201)
			res.body.should.be.a('object')
			res.body.should.have.property('address')
			res.body.should.have.property('outOfBusiness')
			res.body.should.have.property('prcName')
			res.body.should.have.property('_id')
			res.body.should.have.property('website')
			res.body.should.have.property('phone')
			res.body.should.have.property('primaryContactPerson')
			res.body.primaryContactPerson.firstName.should.equal('Joanna')
			res.body.primaryContactPerson.lastName.should.equal('Smith')
			res.body.primaryContactPerson.email.should.equal('email@email.org')
			res.body.primaryContactPerson.phone.should.equal('+18884442222')
			res.body.address.line1.should.equal('586 Central Ave.\nAlbany, NY 12206')
			res.body.address.location.type.should.equal('Point')
			res.body.address.location.coordinates.should.deep.equal(
				[-73.7814005, 42.6722152])
			res.body.prcName.should.equal('Birthright of Albany')
			res.body.phone.should.equal('+15184382978')
			res.body.website.should.equal('http://www.birthright.org')
			res.body.verifiedData.phone.verified.should.equal(true)
			res.body.verifiedData.phone.date.should.not.equal('2017-04-16T23:33:17.220Z')
			res.body.verifiedData.phone.userId.should.equal(testUser._id.toString())
		})
	})

	/*
	 * Test the GET /api/pregnancy-centers/near-me' route w/o authentication
	 */
	describe('/GET /api/pregnancy-centers/near-me no-auth', () => {
		it('it should return a 401 error because there is no authentication', async () => {
			try {
				await chai.request(server)
					.get('/api/pregnancy-centers/near-me')

			} catch (err) {
				assertUnauthenticatedError(err.response)
			}
		})
	})

	/*
	 * Test the GET /api/pregnancy-centers/near-me' route with authentication
	 */
	describe('/GET /api/pregnancy-centers/near-me', () => {
		it('it should return an array with only the Birthright of Albany in it, not the Bridge to Life', async () => {

			const primaryContactPerson = new PersonModel({
				firstName: 'Joanna',
				lastName: 'Smith',
				email: 'email@email.org',
				phone: '+18884442222'
			})
			await primaryContactPerson.save()

			await PregnancyCenterModel.create({
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
				'primaryContactPerson': primaryContactPerson,
				'prcName': 'Birthright of Albany',
				'phone': '+15184382978',
				'website': 'http://www.birthright.org',
				'services': {}

			})

			// copy of above, but outOfBusiness
			await PregnancyCenterModel.create({
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
				outOfBusiness: true,
				'primaryContactPerson': primaryContactPerson,
				'prcName': 'Birthright of Albany - outOfBusiness',
				'phone': '+15184382978',
				'website': 'http://www.birthright.org',
				'services': {}

			})

			await PregnancyCenterModel.create({
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
				'prcName': 'The Bridge To Life, Inc.',
				'phone': '+17182743577',
				'email': 'thebridgetolife@verizon.net',
				'website': 'http://www.thebridgetolife.org',
				services: {},
			})

			await mockAuthenticate()
			const res = await chai.request(server)
				.get('/api/pregnancy-centers/near-me?lng=-73.781332&lat=42.6721989&miles=5')

			res.should.have.status(200)
			res.body.should.be.a('array')
			res.body.length.should.be.eql(1)
			res.body[0].prcName.should.equal('Birthright of Albany')
			res.body[0].primaryContactPerson.firstName.should.equal('Joanna')
		})
	})

	/*
	 * Test the /GET /api/pregnancy-centers/verify route w/o authentication
	 */
	describe('/GET /api/pregnancy-centers/verify no-auth', () => {
		it('it should return a 401 error because there is no authentication', async () => {
			try {
				await chai.request(server)
					.get('/api/pregnancy-centers/verify')

			} catch (err) {
				assertUnauthenticatedError(err.response)
			}
		})
	})

	/*
	 * Test the /GET /api/pregnancy-centers/verify route with authentication
	 */
	describe('/GET /api/pregnancy-centers/verify', () => {
		it('it should return a single pregnancy center were verifiedData.address is null', async () => {

			const primaryContactPerson = new PersonModel({
				firstName: 'Joanna',
				lastName: 'Smith',
				email: 'email@email.org',
				phone: '+18884442222'
			})
			await primaryContactPerson.save()

			await PregnancyCenterModel.create({
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
				'outOfBusiness': true, // should not affect things
				'prcName': 'Birthright of Albany',
				'primaryContactPerson': primaryContactPerson,
				'phone': '+15184382978',
				'website': 'http://www.birthright.org',
				services: {},

			})

			const primaryContactPerson2 = new PersonModel({
				firstName: 'Joanna2',
				lastName: 'Smith',
				email: 'email@email.org',
				phone: '+18884442222'
			})
			await primaryContactPerson2.save()

			await PregnancyCenterModel.create({
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
				outOfBusiness: true, // should not affect things
				'prcName': 'The Bridge To Life, Inc.',
				'phone': '+17182743577',
				'primaryContactPerson': primaryContactPerson2,
				'email': 'thebridgetolife@verizon.net',
				'website': 'http://www.thebridgetolife.org',
				'services': {},
				'verifiedData': {
					'address': {
						'date': '2017-04-16T23:33:17.220Z'
					}
				}
			})
			await mockAuthenticate()

			const res = await chai.request(server)
				.get('/api/pregnancy-centers/verify')

			// note that verification is randomized, so there is no guarantee of the resulting object
			res.should.have.status(200)
			res.body.should.be.a('object')
			res.body.should.have.property('prcName')
			res.body.should.have.property('outOfBusiness')
			res.body.primaryContactPerson.should.have.property('firstName')

		})
	})

	/*
	 * Test the /GET /api/pregnancy-centers/verify route with authentication
	 */
	describe('/GET /api/pregnancy-centers/verify', () => {
		it('it should return a 404 not found because all pregnancy centers have been verified', async () => {

			await PregnancyCenterModel.create({
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
				outOfBusiness: true,
				'prcName': 'Birthright of Albany',
				'phone': '+15184382978',
				'website': 'http://www.birthright.org',
				'services': {},
				'verifiedData': {
					'address': {
						'date': '2017-04-16T23:33:17.220Z'
					}
				}

			})

			await PregnancyCenterModel.create({
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
				'prcName': 'The Bridge To Life, Inc.',
				'phone': '+17182743577',
				'email': 'thebridgetolife@verizon.net',
				'website': 'http://www.thebridgetolife.org',
				'services': {},
				'verifiedData': {
					'address': {
						'date': '2017-04-16T23:33:17.220Z'
					}
				}
			})

			await mockAuthenticate()

			try {
				await chai.request(server)
					.get('/api/pregnancy-centers/verify')

			} catch (err) {
				assertError(err.response, 404, 'Not Found')
			}
		})
	})

	/*
	 * Test the /PUT /api/pregnancy-centers/:pregnancyCenterId route w/o authentication
	 */
	describe('/PUT /api/pregnancy-centers/:pregnancyCenterId no-auth', () => {
		it('it should return a 401 error because there is no authentication', async () => {

			const pc = new PregnancyCenterModel({
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
				'prcName': 'Birthright of Albany',
				'phone': '+15184382978',
				'website': 'http://www.birthright.org',
				'services': {},
				'verifiedData': {
					'address': {
						'date': '2017-04-16T23:33:17.220Z'
					}
				}

			})
			await pc.save()

			try {
				await chai.request(server)
					.put('/api/pregnancy-centers/' + pc._id)

					.send(pc)
			} catch (err) {
				assertUnauthenticatedError(err.response)
			}
		})
	})

	/*
	 * Test the /PUT /api/pregnancy-centers/:pregnancyCenterId route with authentication
	 */
	describe('/PUT /api/pregnancy-centers/:pregnancyCenterId', () => {
		it('it should return the updated pregnancyCenter record', async () => {
			await mockAuthenticate()

			const primaryContactPerson = new PersonModel({
				firstName: 'Joanna',
				lastName: 'Smith',
				email: 'email@email.org',
				phone: '+18884442222'
			})
			await primaryContactPerson.save()

			const oldValues = {
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
				'prcName': 'Birthright of Albany',
				'phone': '+15184382978',
				'website': 'http://www.birthright.org',
				'services': {},
				primaryContactPerson: primaryContactPerson,
				'verifiedData': {
					'address': {
						'verified': true,
						'date': '2017-04-16T23:33:17.220Z'
					}
				}
			}

			const primaryContactPerson2 = {
				firstName: 'Joanna B',
				lastName: 'Smith',
				email: 'email2@email.org',
				phone: '+18884442222',
				_id: primaryContactPerson._id
			}

			const newValues = {
				'address': {
					'line1': 'New Address',
					'location': {
						'type': 'Point',
						'coordinates': [
							-73.7814005,
							42.6722152
						]
					},
				},
				'prcName': 'Birthright of Albany',
				'phone': '+15184382978',
				'website': 'http://www.birthright.org',
				'services': {},
				primaryContactPerson: primaryContactPerson2,
				'verifiedData': {
					'address': {
						'verified': true,
						'date': '2017-04-16T23:33:17.220Z'
					}
				}
			}

			const testUser = await UserModel.findOne({displayName: 'Kate Sills'})

			const oldPCObj = await PregnancyCenterModel.create(oldValues)

			const res = await chai.request(server)
				.put('/api/pregnancy-centers/' + oldPCObj._id)
				.send(newValues)

			res.should.have.status(200)
			res.body.should.be.a('object')
			res.body.should.have.property('_id')
			res.body.should.have.property('prcName')
			res.body.should.have.property('primaryContactPerson')
			res.body._id.should.equal(String(oldPCObj._id))
			res.body.prcName.should.equal('Birthright of Albany')
			res.body.should.have.property('verifiedData')
			res.body.should.have.property('updated')
			res.body.updated.should.have.property('address')
			res.body.updated.address.should.have.property('userId')
			res.body.updated.address.userId.should.equal(testUser._id.toString())
			res.body.verifiedData.should.have.property('address')
			res.body.verifiedData.address.userId.should.equal(testUser._id.toString())

			// check that the pregnancy center history is created as well.
			const histories = await PregnancyCenterHistoryModel.find({
				pregnancyCenterId: oldPCObj._id
			})
			const fields = _.map(histories, 'field')
			fields.should.have.members(['address', 'primaryContactPerson', 'verifiedData'])
			for (const pc_history of histories) {
				if (pc_history.field === 'primaryContactPerson') {
					pc_history.newValue.firstName.should.equal(primaryContactPerson2.firstName)
				}
			}

			const people = await PersonModel.find({})
			people.should.have.length(1)
		})
	})

	/*
	 * Test the /PUT /api/pregnancy-centers/:pregnancyCenterId route with authentication and outOfBusiness = True
	 * original pc has been outOfBusiness, trying to edit it without re-opening should be an error
	 */
	describe('/PUT /api/pregnancy-centers/:pregnancyCenterId', () => {
		it('original pc has been outOfBusiness, trying to edit it without re-opening should be an error', async () => {
			await mockAuthenticate()

			const primaryContactPerson = new PersonModel({
				firstName: 'Joanna',
				lastName: 'Smith',
				email: 'email@email.org',
				phone: '+18884442222'
			})
			await primaryContactPerson.save()

			const oldValues = {
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
				'outOfBusiness': true,
				'prcName': 'Birthright of Albany',
				'phone': '+15184382978',
				'website': 'http://www.birthright.org',
				'services': {},
				primaryContactPerson: primaryContactPerson,
				'verifiedData': {
					'address': {
						'verified': true,
						'date': '2017-04-16T23:33:17.220Z'
					}
				}
			}

			const primaryContactPerson2 = {
				firstName: 'Joanna B',
				lastName: 'Smith',
				email: 'email2@email.org',
				phone: '+18884442222',
				_id: primaryContactPerson._id
			}

			const newValues = {
				'address': {
					'line1': 'New Address',
					'location': {
						'type': 'Point',
						'coordinates': [
							-73.7814005,
							42.6722152
						]
					},
				},
				'prcName': 'Birthright of Albany',
				'phone': '+15184382978',
				'website': 'http://www.birthright.org',
				'services': {},
				primaryContactPerson: primaryContactPerson2,
				'verifiedData': {
					'address': {
						'verified': true,
						'date': '2017-04-16T23:33:17.220Z'
					}
				}
			}
			
			const oldPCObj = await PregnancyCenterModel.create(oldValues)
			try {
				await chai.request(server)
					.put('/api/pregnancy-centers/' + oldPCObj._id)
					.send(newValues)
			} catch (err) {
				assertError(err.response, 400, 'Bad Request', 'Cannot edit a outOfBusiness Pregnancy Center')
			}
		})
	})

	/*
	 * Test the /PUT /api/pregnancy-centers/:pregnancyCenterId route where PrimaryContactPerson is {}
	 */
	describe('/PUT /api/pregnancy-centers/:pregnancyCenterId', () => {
		it('it should return no new person for PrimaryContactPerson = {}', async () => {

			await mockAuthenticate()

			const initialPRCData = {
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
				'prcName': 'Birthright of Albany',
				'phone': '+15184382978',
				'website': 'http://www.birthright.org',
				'services': {},
			}
			let oldPCObj = await PregnancyCenterModel.create(initialPRCData)
			oldPCObj = oldPCObj.toObject()

			// --------- try updating PrimaryContactPerson with an empty object {}

			oldPCObj.primaryContactPerson = {}

			const res = await chai.request(server)
				.put('/api/pregnancy-centers/' + oldPCObj._id)
				.send(oldPCObj)

			// make sure no person was created due to the empty obj
			const people = await PersonModel.find({})
			people.should.have.length(0)

			// check that that no histories were created
			const histories = await PregnancyCenterHistoryModel.find({
				pregnancyCenterId: oldPCObj._id
			})
			histories.should.have.length(0)

			// make sure result is what is expected
			res.should.have.status(200)
			res.body.should.be.a('object')
			res.body.should.have.property('_id')
			res.body.should.have.property('prcName')
			res.body._id.should.equal(String(oldPCObj._id))
			res.body.updated.should.deep.equal({})
		})
	})

	/*
	 * Test the /PUT /api/pregnancy-centers/:pregnancyCenterId route where PrimaryContactPerson is {_id: undefined}
	 */
	describe('/PUT /api/pregnancy-centers/:pregnancyCenterId', () => {
		it('it should return no new person for PrimaryContactPerson = {_id: undefined}', async () => {
			await mockAuthenticate()

			const initialPRCData = {
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
				'prcName': 'Birthright of Albany',
				'phone': '+15184382978',
				'website': 'http://www.birthright.org',
				'services': {},
			}
			let oldPCObj = await PregnancyCenterModel.create(initialPRCData)
			oldPCObj = oldPCObj.toObject()

			// --------- try updating PrimaryContactPerson with an undefined id and nothing else

			oldPCObj.primaryContactPerson = {_id: undefined}

			const res = await chai.request(server)
				.put('/api/pregnancy-centers/' + oldPCObj._id)
				.send(oldPCObj)

			// make sure no person was created due to the empty obj
			const people = await PersonModel.find({})
			people.should.have.length(0)

			// check that that no histories were created
			const histories = await PregnancyCenterHistoryModel.find({
				pregnancyCenterId: oldPCObj._id
			})
			histories.should.have.length(0)

			// make sure result is what is expected
			res.should.have.status(200)
			res.body.should.be.a('object')
			res.body.should.have.property('_id')
			res.body.should.have.property('prcName')
			res.body._id.should.equal(String(oldPCObj._id))
			res.body.updated.should.deep.equal({})
		})
	})

	/*
	 * Test the /PUT /api/pregnancy-centers/:pregnancyCenterId route where PrimaryContactPerson is a null _id and nothing else
	 */
	describe('/PUT /api/pregnancy-centers/:pregnancyCenterId', () => {
		it('it should return no new person for PrimaryContactPerson = {_id: null}', async () => {
			await mockAuthenticate()

			const initialPRCData = {
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
				'prcName': 'Birthright of Albany',
				'phone': '+15184382978',
				'website': 'http://www.birthright.org',
				'services': {},
			}
			let oldPCObj = await PregnancyCenterModel.create(initialPRCData)
			oldPCObj = oldPCObj.toObject()

			// ---------- try updating PrimaryContactPerson with a null _id and nothing else

			oldPCObj.primaryContactPerson = {_id: null}
			try {
				await chai.request(server)
					.put('/api/pregnancy-centers/' + oldPCObj._id)
					.send(oldPCObj)
			} catch (err) {
				assertError(err.response, 400, 'Bad Request', 'child "primaryContactPerson" fails because [child "_id" fails because ["_id" must be a string]]')
			}
		})
	})

	/*
	 * Test the /PUT /api/pregnancy-centers/:pregnancyCenterId route where PrimaryContactPerson has no _id (create)
	 */
	describe('/PUT /api/pregnancy-centers/:pregnancyCenterId', () => {
		it('it should return 1 new PrimaryContactPerson with firstName = Kate', async () => {
			await mockAuthenticate()

			const initialPRCData = {
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
				'prcName': 'Birthright of Albany',
				'phone': '+15184382978',
				'website': 'http://www.birthright.org',
				'services': {},
			}
			let oldPCObj = await PregnancyCenterModel.create(initialPRCData)
			oldPCObj = oldPCObj.toObject()
			const testUser = await UserModel.findOne({displayName: 'Kate Sills'})

			// ---------- try updating PrimaryContactPerson with no _id but firstName: Kate
			oldPCObj.primaryContactPerson = {firstName: 'Kate'}

			const res = await chai.request(server)
				.put('/api/pregnancy-centers/' + oldPCObj._id)
				.send(oldPCObj)

			// make sure one person was created
			const people = await PersonModel.find({})
			people.should.have.length(1)

			// check that one history was created
			const histories = await PregnancyCenterHistoryModel.find({
				pregnancyCenterId: oldPCObj._id
			})
			histories.should.have.length(1)
			for (const pc_history of histories) {
				if (pc_history.field === 'primaryContactPerson') {
					pc_history.newValue.firstName.should.equal('Kate')
				}
			}

			// make sure result is what is expected
			res.should.have.status(200)
			res.body.should.be.a('object')
			res.body.should.have.property('_id')
			res.body.should.have.property('prcName')
			res.body.should.have.property('primaryContactPerson')
			res.body._id.should.equal(String(oldPCObj._id))
			res.body.updated.primaryContactPerson.userId.should.equal(testUser._id.toString())
		})
	})

	/*
	 * Test the /PUT /api/pregnancy-centers/:pregnancyCenterId route where PrimaryContactPerson has id (update)
	 */
	describe('/PUT /api/pregnancy-centers/:pregnancyCenterId', () => {
		it('it should return 1 updated PrimaryContactPerson with firstName = Kate2, lastName = Sills2', async () => {
			await mockAuthenticate()

			const primaryContactPerson = new PersonModel({
				firstName: 'Kate',
				lastName: 'Sills',
				email: 'email@email.org',
				phone: '+18884442222'
			})
			await primaryContactPerson.save()

			const initialPRCData = {
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
				'primaryContactPerson': primaryContactPerson,
				'prcName': 'Birthright of Albany',
				'phone': '+15184382978',
				'website': 'http://www.birthright.org',
				'services': {},
			}
			let oldPCObj = await PregnancyCenterModel.create(initialPRCData)

			// make sure one person was created
			const people = await PersonModel.find({})
			people.should.have.length(1)

			oldPCObj = oldPCObj.toObject()
			const testUser = await UserModel.findOne({displayName: 'Kate Sills'})

			// ---------- try updating PrimaryContactPerson with full
			oldPCObj.primaryContactPerson = {
				_id: oldPCObj.primaryContactPerson._id,
				firstName: 'Kate2',
				lastName: 'Sills2'
			}

			const res = await chai.request(server)
				.put('/api/pregnancy-centers/' + oldPCObj._id)
				.send(oldPCObj)

			// make sure we still only have one person
			const people2 = await PersonModel.find({})
			people2.should.have.length(1)

			// check that one history was created
			const histories = await PregnancyCenterHistoryModel.find({
				pregnancyCenterId: oldPCObj._id
			})
			histories.should.have.length(1)
			for (const pc_history of histories) {
				if (pc_history.field === 'primaryContactPerson') {
					pc_history.newValue.firstName.should.equal('Kate2')
					pc_history.newValue.lastName.should.equal('Sills2')
				}
			}

			// make sure result is what is expected
			res.should.have.status(200)
			res.body.should.be.a('object')
			res.body.should.have.property('_id')
			res.body.should.have.property('prcName')
			res.body.should.have.property('primaryContactPerson')
			res.body._id.should.equal(String(oldPCObj._id))
			res.body.updated.primaryContactPerson.userId.should.equal(testUser._id.toString())
		})
	})

	/*
	 * Test the /GET /api/pregnancy-centers/:pregnancyCenterId route w/o authentication
	 */
	describe('/GET /api/pregnancy-centers/:pregnancyCenterId no-auth', () => {
		it('it should return a 401 error because there is no authentication', async () => {

			const pc = new PregnancyCenterModel({
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
				'prcName': 'Birthright of Albany',
				'phone': '+15184382978',
				'website': 'http://www.birthright.org',
				'services': {}

			})
			await pc.save()

			try {
				await chai.request(server)
					.get('/api/pregnancy-centers/' + pc._id)

			} catch (err) {
				assertUnauthenticatedError(err.response)
			}
		})
	})

	/*
	 * Test the /GET /api/pregnancy-centers/:pregnancyCenterId route with authentication
	 */
	describe('/GET /api/pregnancy-centers/:pregnancyCenterId', () => {
		it('it should return a single pregnancy center matching the id', async () => {

			const primaryContactPerson = new PersonModel({
				firstName: 'Joanna',
				lastName: 'Smith',
				email: 'email@email.org',
				phone: '+18884442222'
			})
			await primaryContactPerson.save()

			const pc = new PregnancyCenterModel({
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
				'prcName': 'Birthright of Albany',
				'primaryContactPerson': primaryContactPerson,
				'phone': '+15184382978',
				'website': 'http://www.birthright.org',
				'services': {}

			})

			await pc.save()

			await mockAuthenticate()
			const res = await chai.request(server)
				.get('/api/pregnancy-centers/' + pc._id)

			res.should.have.status(200)
			res.body.should.be.a('object')
			res.body.should.have.property('_id')
			res.body.should.have.property('prcName')
			res.body._id.should.equal(String(pc._id))
			res.body.prcName.should.equal('Birthright of Albany')
			res.body.primaryContactPerson.firstName.should.equal('Joanna')
			res.body.verifiedData.should.deep.equal({})

		})
	})

	/*
	 * Test the Joi validation for pregnancy centers separately from the API routes
	 */
	describe('Test Joi validation for pregnancy centers address 1', () => {
		it('validation should fail because the address is not an object ', async () => {

			const testPCObj1 = {
				address: 'My address' // should be an object with line1, line2, city, etc.
			}

			const validationObj = await Joi.validate(testPCObj1, pregnancyCenterSchemaJoi, {
				abortEarly: false
			})
			validationObj.error.name.should.equal('ValidationError')
			validationObj.error.message.should.equal('child "address" fails because ["address" must be an object]')
		})
	})

	/*
	 * Test the Joi validation for pregnancy centers separately from the API routes
	 */
	describe('Test Joi validation for pregnancy centers address 2', () => {
		it('validation should fail because the location coordinates are reversed ', async () => {

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

			const validationObj = await Joi.validate(testPCObj2, pregnancyCenterSchemaJoi, {
				abortEarly: false
			})

			validationObj.error.name.should.equal('ValidationError')
			validationObj.error.message.should.equal('child "address" fails because [child "location" fails because [child "coordinates" fails because ["coordinates" at position 0 fails because ["0" must be less than or equal to -66], "coordinates" at position 1 fails because ["1" must be larger than or equal to 23]]]]')
		})
	})

	/*
	 * Test the Joi validation for pregnancy centers separately from the API routes
	 */
	describe('Test Joi validation for pregnancy centers address 3', () => {
		it('validation should fail because the location coordinates are reversed ', async () => {

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

			const validationObj = await Joi.validate(testPCObj3, pregnancyCenterSchemaJoi, {
				abortEarly: false
			})
			validationObj.error.name.should.equal('ValidationError')
			validationObj.error.message.should.equal('child "address" fails because [child "location" fails because [child "coordinates" fails because ["coordinates" at position 0 fails because ["0" must be less than or equal to -66], "coordinates" at position 1 fails because ["1" must be larger than or equal to 23]]]]')
		})
	})

	/*
	 * Test the Joi validation for pregnancy centers separately from the API routes
	 */
	describe('Test Joi validation for pregnancy centers hours 6', () => {
		it('validation should pass because hours follow this format', async () => {

			const testPCObj6 = {
				hours: {
					2: {
						open: 800,
						close: 1700
					}
				}
			}

			const validationObj = await Joi.validate(testPCObj6, pregnancyCenterSchemaJoi, {
				abortEarly: false
			})
			if (validationObj.error) {
				throw validationObj.error
			}
			const validatedData = validationObj.value
			validatedData.hours.should.deep.equal({
				2: {
					open: 800,
					close: 1700
				}
			})
		})
	})

	/*
	 * Test the Joi validation for pregnancy centers separately from the API routes
	 */
	describe('Test Joi validation for pregnancy centers readable hours 7', () => {
		it('validation should fail because tues is not one of the keys (it\'s 1-7)', async () => {

			const testPCObj7 = {
				hours: {
					tues: {
						open: '800',
						close: '1700'
					}
				}
			}

			const validationObj = await Joi.validate(testPCObj7, pregnancyCenterSchemaJoi, {
				abortEarly: false
			})
			validationObj.error.name.should.equal('ValidationError')
			validationObj.error.message.should.equal('child "hours" fails because ["tues" is not allowed]')
		})
	})

	/*
	 * Test the Joi validation for pregnancy centers separately from the API routes
	 */
	describe('Test Joi validation for pregnancy centers hours 8', () => {
		it('validation should pass because hours follow this format', async () => {

			const testPCObj8 = {
				hours: {
					1: {
						open: 800,
						close: 1600,
					}
				}
			}

			const validationObj = await Joi.validate(testPCObj8, pregnancyCenterSchemaJoi, {
				abortEarly: false
			})
			if (validationObj.error) {
				throw validationObj.error
			}
			const validatedData = validationObj.value

			validatedData.hours.should.deep.equal({
				1: {
					open: 800,
					close: 1600,
				}
			})
		})
	})

	/*
	 * Test the Joi validation for pregnancy centers separately from the API routes
	 */
	describe('Test Joi validation for pregnancy centers phone 9', () => {
		it('validation should fail because phone is in format xxx.xxx.xxx and needs to be in E.164 international format', async () => {

			const testPCObj9 = {
				phone: '888.444.2222'
			}

			const validationObj = await Joi.validate(testPCObj9, pregnancyCenterSchemaJoi, {
				abortEarly: false
			})
			validationObj.error.name.should.equal('ValidationError')
			validationObj.error.message.should.equal('child "phone" fails because ["phone" needs to be a valid phone number according to E.164 international format]')
		})
	})

	/*
	 * Test the Joi validation for pregnancy centers separately from the API routes
	 */
	describe('Test Joi validation for pregnancy centers phone 10', () => {
		it('validation should pass because phone is in E.164 international format', async () => {

			const testPCObj10 = {
				phone: '+18884442222'
			}

			const validationObj = await Joi.validate(testPCObj10, pregnancyCenterSchemaJoi, {
				abortEarly: false
			})
			if (validationObj.error) {
				throw validationObj.error
			}
			const validatedData = validationObj.value
			validatedData.phone.should.equal('+18884442222')
		})
	})

	/*
	 * Test the Joi validation for pregnancy centers separately from the API routes
	 */
	describe('Test Joi validation for pregnancy centers services 12', () => {
		it('validation should fail because one of the services is mispelled', async () => {

			const testPCObj12 = {
				services: {
					Ulllltrasound: false,
					parentingClasses: true,
				}
			}

			const validationObj = await Joi.validate(testPCObj12, pregnancyCenterSchemaJoi, {
				abortEarly: false
			})
			validationObj.error.name.should.equal('ValidationError')
			validationObj.error.message.should.equal('child "services" fails because ["Ulllltrasound" is not allowed]')
		})
	})

	/*
	 * Test the Joi validation for pregnancy centers separately from the API routes
	 */
	describe('Test Joi validation for pregnancy centers verified 13', () => {
		it('validation should fail because each verifiedData field object only has keys date and userId', async () => {

			const testPCObj13 = {
				verifiedData: {
					address: {
						dateVerified: moment()
					}
				}
			}

			const validationObj = await Joi.validate(testPCObj13, pregnancyCenterSchemaJoi, {
				abortEarly: false
			})
			validationObj.error.name.should.equal('ValidationError')
			validationObj.error.message.should.equal('child "verifiedData" fails because [child "address" fails because ["dateVerified" is not allowed]]')
		})
	})

	/*
	 * Test the Joi validation for pregnancy centers separately from the API routes
	 */
	describe('Test Joi validation for pregnancy centers verifiedData 14', () => {
		it('validation should pass because the verifiedData field for address has date and userId and verified',
			async () => {

				const testPCObj14 = {
					verifiedData: {
						address: {
							date: moment().toISOString(),
							userId: '58e46a8d210140d7e47bf58b',
							verified: true,
						}
					}
				}

				const validationObj = await Joi.validate(testPCObj14, pregnancyCenterSchemaJoi, {
					abortEarly: false
				})
				if (validationObj.error) {
					throw validationObj.error
				}
				const validatedData = validationObj.value
				validatedData.verifiedData.address.userId.should.equal('58e46a8d210140d7e47bf58b')
			})
	})

	/*
	 * Test the Joi validation for pregnancy centers separately from the API routes
	 */
	describe('Test Joi validation for pregnancy centers verifiedData 15', () => {
		it('validation should fail because inVerification should be a user objectId',
			async () => {

				const testPCObj15 = {
					'inVerification': 'dwdss',
				}

				const validationObj = await Joi.validate(testPCObj15, pregnancyCenterSchemaJoi, {
					abortEarly: false
				})
				validationObj.error.name.should.equal('ValidationError')
				validationObj.error.message.should.equal('child "inVerification" fails because ["inVerification" needs to be a valid MongoDB ObjectId]')
			})
	})

	/*
	 * Test the Joi validation for pregnancy centers separately from the API routes
	 */
	describe('Test Joi validation for pregnancy centers verifiedData 16', () => {
		it('validation should pass because inVerification is a user objectId',
			async () => {

				const testUser = await UserModel.findOne({displayName: 'Kate Sills'})

				const testPCObj16 = {
					'inVerification': testUser._id,
				}

				const validationObj = await Joi.validate(testPCObj16, pregnancyCenterSchemaJoi, {
					abortEarly: false
				})
				const validatedData = validationObj.value
				validatedData.inVerification.should.equal(testUser._id)
			})
	})
})
