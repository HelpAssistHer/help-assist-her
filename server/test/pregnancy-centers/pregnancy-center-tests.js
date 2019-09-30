'use strict'

const moment = require('moment')

//Require the dev-dependencies
const _ = require('lodash')
const chai = require('chai')
const chaiHttp = require('chai-http')
// eslint-disable-next-line no-unused-vars
const should = chai.should()
const Log = require('log')
const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')

const log = new Log('info')
const PregnancyCenterHistoryModel = require('../../pregnancy-center-history/schema/mongoose-schema')
const PregnancyCenterModel = require('../../pregnancy-centers/schema/mongoose-schema')
const pregnancyCenterSchemaJoi = require('../../pregnancy-centers/schema/joi-schema')
const server = require('../../server')
const UserModel = require('../../users/schema/mongoose-schema')
const PersonModel = require('../../persons/schema/mongoose-schema')

const {
	mockAuthenticate,
	assertUnauthenticatedError,
	assertError,
	beforeEachPregnancyCenter,
	importTest,
} = require('../helpers')

chai.use(chaiHttp)

describe('PregnancyCenters', () => {
	beforeEach(beforeEachPregnancyCenter)

	importTest('near-me', './pregnancy-centers/near-me-tests.js')

	/*
	 * Test the /GET /api/pregnancy-centers/open-now route w/o authentication
	 */
	describe('/GET /api/pregnancy-centers/open-now no-auth', () => {
		it('it should return a 401 error because there is no authentication', async () => {
			try {
				await chai.request(server).get('/api/pregnancy-centers/open-now')
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
				phone: '+18884442222',
			})
			await primaryContactPerson.save()

			// 1 is Monday

			await PregnancyCenterModel.create({
				address: {
					line1: '586 Central Ave.\nAlbany, NY 12206',
					location: {
						type: 'Point',
						coordinates: [-73.7814005, 42.6722152],
					},
				},
				prcName: 'Birthright of Albany',
				phone: '+15184382978',
				primaryContactPerson: primaryContactPerson,
				website: 'http://www.birthright.org',
				services: {},
				hours: {
					1: {
						open: 800, // 8am
						close: 1500, // 3pm
					}, // 1 is Monday
				},
			})

			// copy of the above model, but with outOfBusiness = True - should not be returned
			await PregnancyCenterModel.create({
				address: {
					line1: '586 Central Ave.\nAlbany, NY 12206',
					location: {
						type: 'Point',
						coordinates: [-73.7814005, 42.6722152],
					},
				},
				outOfBusiness: true,
				prcName: 'Birthright of Albany - outOfBusiness',
				phone: '+15184382978',
				primaryContactPerson: primaryContactPerson,
				website: 'http://www.birthright.org',
				services: {},
				hours: {
					1: {
						open: 800, // 8am
						close: 1500, // 3pm
					}, // 1 is Monday
				},
			})

			await PregnancyCenterModel.create({
				address: {
					line1: '23-40 Astoria Boulevard\nAstoria, NY 11102',
					location: {
						type: 'Point',
						coordinates: [-73.9241081, 40.771253],
					},
				},
				prcName: 'The Bridge To Life, Inc.',
				phone: '+17182743577',
				email: 'thebridgetolife@verizon.net',
				website: 'http://www.thebridgetolife.org',
				services: {},
				hours: {
					1: {
						open: 1300, // 1pm
						close: 1500, // 3pm
					}, // monday
					2: {
						open: 1300, // 1pm
						close: 1500, // 3pm
					}, // tuesday
				},
			})

			await mockAuthenticate()

			const res = await chai
				.request(server)
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
				await chai.request(server).get('/api/pregnancy-centers')
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
						type: 'Point',
						coordinates: [-73.7814005, 42.6722152],
					},
				},
				prcName: 'Birthright of Albany',
				phone: '+15184382978',
				website: 'http://www.birthright.org',
				services: {},
			}

			try {
				await chai
					.request(server)
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
			const res = await chai.request(server).get('/api/pregnancy-centers')

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
				phone: '+18884442222',
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
						type: 'Point',
						coordinates: [-73.7814005, 42.6722152],
					},
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
						date: '2017-04-16T23:33:17.220Z',
					},
				},
			}
			const testUser = await UserModel.findOne({ displayName: 'Kate Sills' })
			await mockAuthenticate()
			const res = await chai
				.request(server)
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
			res.body.address.location.coordinates.should.deep.equal([
				-73.7814005,
				42.6722152,
			])
			res.body.prcName.should.equal('Birthright of Albany')
			res.body.phone.should.equal('+15184382978')
			res.body.website.should.equal('http://www.birthright.org')
			res.body.verifiedData.phone.verified.should.equal(true)

			// why overwrite the date?
			res.body.verifiedData.phone.date.should.not.equal(
				'2017-04-16T23:33:17.220Z',
			)
			res.body.verifiedData.phone.userId.should.equal(testUser._id.toString())
		})
	})

	/*
	 * Test the /GET /api/pregnancy-centers/verify route w/o authentication
	 */
	describe('/GET /api/pregnancy-centers/verify no-auth', () => {
		it('it should return a 401 error because there is no authentication', async () => {
			try {
				await chai.request(server).get('/api/pregnancy-centers/verify')
			} catch (err) {
				assertUnauthenticatedError(err.response)
			}
		})
	})

	/*
	 * Test the /GET /api/pregnancy-centers/verify route with authentication
	 */
	describe('/GET /api/pregnancy-centers/verify', () => {
		it('it should return a single pregnancy center where verifiedData.address is null', async () => {
			const primaryContactPerson = new PersonModel({
				firstName: 'Joanna',
				lastName: 'Smith',
				email: 'email@email.org',
				phone: '+18884442222',
			})
			await primaryContactPerson.save()

			await PregnancyCenterModel.create({
				address: {
					line1: '586 Central Ave.\nAlbany, NY 12206',
					location: {
						type: 'Point',
						coordinates: [-73.7814005, 42.6722152],
					},
				},
				outOfBusiness: true, // should not affect things
				prcName: 'Birthright of Albany',
				primaryContactPerson: primaryContactPerson,
				phone: '+15184382978',
				website: 'http://www.birthright.org',
				services: {},
			})

			const primaryContactPerson2 = new PersonModel({
				firstName: 'Joanna2',
				lastName: 'Smith',
				email: 'email@email.org',
				phone: '+18884442222',
			})
			await primaryContactPerson2.save()

			await PregnancyCenterModel.create({
				address: {
					line1: '23-40 Astoria Boulevard\nAstoria, NY 11102',
					location: {
						type: 'Point',
						coordinates: [-73.9241081, 40.771253],
					},
				},
				outOfBusiness: true, // should not affect things
				prcName: 'The Bridge To Life, Inc.',
				phone: '+17182743577',
				primaryContactPerson: primaryContactPerson2,
				email: 'thebridgetolife@verizon.net',
				website: 'http://www.thebridgetolife.org',
				services: {},
				verifiedData: {
					address: {
						date: '2017-04-16T23:33:17.220Z',
					},
				},
			})
			await mockAuthenticate()

			const res = await chai
				.request(server)
				.get('/api/pregnancy-centers/verify')

			// note that verification is randomized, so there is no guarantee of the resulting object
			res.should.have.status(200)
			res.body.should.be.a('object')
			res.body.should.have.property('prcName')
			res.body.should.have.property('outOfBusiness')
			res.body.primaryContactPerson.should.have.property('firstName')
		})
	})

	describe('/GET /api/pregnancy-centers/verify', () => {
		it('should return a pregnancy center that has no verification data for prcName', async () => {
			await PregnancyCenterModel.create({
				address: {
					line1: '586 Central Ave.\nAlbany, NY 12206',
					location: {
						type: 'Point',
						coordinates: [-73.7814005, 42.6722152],
					},
				},
				outOfBusiness: true,
				prcName: 'No verification data',
				phone: '+15184382978',
				website: 'http://www.birthright.org',
				services: {},
				verifiedData: {},
			})

			await mockAuthenticate()

			const res = await chai
				.request(server)
				.get('/api/pregnancy-centers/verify')

			res.should.have.status(200)
			res.body.should.be.a('object')
			res.body.should.have.property('prcName')
			res.body.should.have.property('outOfBusiness')
			res.body.prcName.should.be.eql('No verification data')
		})

		it('should return a pregnancy center that was verified before 10-31-2018', async () => {
			await PregnancyCenterModel.create({
				address: {
					line1: '586 Central Ave.\nAlbany, NY 12206',
					location: {
						type: 'Point',
						coordinates: [-73.7814005, 42.6722152],
					},
				},
				outOfBusiness: true,
				prcName: 'Verified before 10-31-18',
				phone: '+15184382978',
				website: 'http://www.birthright.org',
				services: {},
				verifiedData: {
					prcName: {
						date: new Date('2017-08-15'),
						verified: true,
					},
				},
			})

			await mockAuthenticate()

			const res = await chai
				.request(server)
				.get('/api/pregnancy-centers/verify')

			res.should.have.status(200)
			res.body.should.be.a('object')
			res.body.should.have.property('prcName')
			res.body.should.have.property('outOfBusiness')
			res.body.prcName.should.be.eql('Verified before 10-31-18')
		})

		it('should NOT return a pregnancy center that was verified after 10-31-2018', async () => {
			await PregnancyCenterModel.create({
				address: {
					line1: '586 Central Ave.\nAlbany, NY 12206',
					location: {
						type: 'Point',
						coordinates: [-73.7814005, 42.6722152],
					},
				},
				outOfBusiness: true,
				prcName: 'Verified after 10-31-18',
				phone: '+15184382978',
				website: 'http://www.birthright.org',
				services: {},
				verifiedData: {
					prcName: {
						date: new Date('2018-12-01'),
						verified: true,
					},
				},
			})

			await mockAuthenticate()

			try {
				await chai.request(server).get('/api/pregnancy-centers/verify')
			} catch (err) {
				assertError(err.response, 404, 'Not Found')
			}
		})
	})

	/*
	 * Test the /GET /api/pregnancy-centers/verify route with authentication
	 */
	describe('/GET /api/pregnancy-centers/verify', () => {
		it('it should return a 404 not found because all pregnancy centers have been verified', async () => {
			await PregnancyCenterModel.create({
				address: {
					line1: '586 Central Ave.\nAlbany, NY 12206',
					location: {
						type: 'Point',
						coordinates: [-73.7814005, 42.6722152],
					},
				},
				outOfBusiness: true,
				prcName: 'Birthright of Albany',
				phone: '+15184382978',
				website: 'http://www.birthright.org',
				services: {},
				verifiedData: {
					address: {
						date: '2017-04-16T23:33:17.220Z',
					},
				},
			})

			await PregnancyCenterModel.create({
				address: {
					line1: '23-40 Astoria Boulevard\nAstoria, NY 11102',
					location: {
						type: 'Point',
						coordinates: [-73.9241081, 40.771253],
					},
				},
				prcName: 'The Bridge To Life, Inc.',
				phone: '+17182743577',
				email: 'thebridgetolife@verizon.net',
				website: 'http://www.thebridgetolife.org',
				services: {},
				verifiedData: {
					address: {
						date: '2017-04-16T23:33:17.220Z',
					},
				},
			})

			await mockAuthenticate()

			try {
				await chai.request(server).get('/api/pregnancy-centers/verify')
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
				address: {
					line1: '586 Central Ave.\nAlbany, NY 12206',
					location: {
						type: 'Point',
						coordinates: [-73.7814005, 42.6722152],
					},
				},
				prcName: 'Birthright of Albany',
				phone: '+15184382978',
				website: 'http://www.birthright.org',
				services: {},
				verifiedData: {
					address: {
						date: '2017-04-16T23:33:17.220Z',
					},
				},
			})
			await pc.save()

			try {
				await chai
					.request(server)
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
				phone: '+18884442222',
			})
			await primaryContactPerson.save()

			const oldValues = {
				address: {
					line1: '586 Central Ave.\nAlbany, NY 12206',
					location: {
						type: 'Point',
						coordinates: [-73.7814005, 42.6722152],
					},
				},
				prcName: 'Birthright of Albany',
				phone: '+15184382978',
				website: 'http://www.birthright.org',
				services: {},
				primaryContactPerson: primaryContactPerson,
				verifiedData: {
					address: {
						verified: true,
						date: '2017-04-16T23:33:17.220Z',
					},
				},
			}

			const primaryContactPerson2 = {
				firstName: 'Joanna B',
				lastName: 'Smith',
				email: 'email2@email.org',
				phone: '+18884442222',
				_id: primaryContactPerson._id,
			}

			const newValues = {
				address: {
					line1: 'New Address',
					location: {
						type: 'Point',
						coordinates: [-73.7814005, 42.6722152],
					},
				},
				prcName: 'Birthright of Albany',
				phone: '+15184382978',
				website: 'http://www.birthright.org',
				services: {},
				primaryContactPerson: primaryContactPerson2,
				verifiedData: {
					address: {
						verified: true,
						date: '2017-04-16T23:33:17.220Z',
					},
				},
			}

			const testUser = await UserModel.findOne({ displayName: 'Kate Sills' })

			const oldPCObj = await PregnancyCenterModel.create(oldValues)

			const res = await chai
				.request(server)
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
				pregnancyCenterId: oldPCObj._id,
			})
			const fields = _.map(histories, 'field')
			fields.should.have.members([
				'address',
				'primaryContactPerson',
				'verifiedData',
			])
			for (const pc_history of histories) {
				if (pc_history.field === 'primaryContactPerson') {
					pc_history.newValue.firstName.should.equal(
						primaryContactPerson2.firstName,
					)
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
				phone: '+18884442222',
			})
			await primaryContactPerson.save()

			const oldValues = {
				address: {
					line1: '586 Central Ave.\nAlbany, NY 12206',
					location: {
						type: 'Point',
						coordinates: [-73.7814005, 42.6722152],
					},
				},
				outOfBusiness: true,
				prcName: 'Birthright of Albany',
				phone: '+15184382978',
				website: 'http://www.birthright.org',
				services: {},
				primaryContactPerson: primaryContactPerson,
				verifiedData: {
					address: {
						verified: true,
						date: '2017-04-16T23:33:17.220Z',
					},
				},
			}

			const primaryContactPerson2 = {
				firstName: 'Joanna B',
				lastName: 'Smith',
				email: 'email2@email.org',
				phone: '+18884442222',
				_id: primaryContactPerson._id,
			}

			const newValues = {
				address: {
					line1: 'New Address',
					location: {
						type: 'Point',
						coordinates: [-73.7814005, 42.6722152],
					},
				},
				prcName: 'Birthright of Albany',
				phone: '+15184382978',
				website: 'http://www.birthright.org',
				services: {},
				primaryContactPerson: primaryContactPerson2,
				verifiedData: {
					address: {
						verified: true,
						date: '2017-04-16T23:33:17.220Z',
					},
				},
			}

			const oldPCObj = await PregnancyCenterModel.create(oldValues)
			try {
				await chai
					.request(server)
					.put(`/api/pregnancy-centers/${oldPCObj._id}`)
					.send(newValues)
			} catch (err) {
				assertError(
					err.response,
					400,
					'Bad Request',
					'Cannot edit an outOfBusiness FQHC or PregnancyCenter',
				)
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
				address: {
					line1: '586 Central Ave.\nAlbany, NY 12206',
					location: {
						type: 'Point',
						coordinates: [-73.7814005, 42.6722152],
					},
				},
				prcName: 'Birthright of Albany',
				phone: '+15184382978',
				website: 'http://www.birthright.org',
				services: {},
			}
			let oldPCObj = await PregnancyCenterModel.create(initialPRCData)
			oldPCObj = oldPCObj.toObject()

			// --------- try updating PrimaryContactPerson with an empty object {}

			oldPCObj.primaryContactPerson = {}

			const res = await chai
				.request(server)
				.put('/api/pregnancy-centers/' + oldPCObj._id)
				.send(oldPCObj)

			// make sure no person was created due to the empty obj
			const people = await PersonModel.find({})
			people.should.have.length(0)

			// check that that no histories were created
			const histories = await PregnancyCenterHistoryModel.find({
				pregnancyCenterId: oldPCObj._id,
			})
			histories.should.have.length(1)
			histories[0].field.should.equal('address')

			// make sure result is what is expected
			res.should.have.status(200)
			res.body.should.be.a('object')
			res.body.should.have.property('_id')
			res.body.should.have.property('prcName')
			res.body._id.should.equal(String(oldPCObj._id))
			res.body.updated.address.should.have.property('userId')
		})
	})

	/*
	 * Test the /PUT /api/pregnancy-centers/:pregnancyCenterId route where PrimaryContactPerson is {_id: undefined}
	 */
	describe('/PUT /api/pregnancy-centers/:pregnancyCenterId', () => {
		it('it should return no new person for PrimaryContactPerson = {_id: undefined}', async () => {
			await mockAuthenticate()

			const initialPRCData = {
				address: {
					line1: '586 Central Ave.\nAlbany, NY 12206',
					location: {
						type: 'Point',
						coordinates: [-73.7814005, 42.6722152],
					},
				},
				prcName: 'Birthright of Albany',
				phone: '+15184382978',
				website: 'http://www.birthright.org',
				services: {},
			}
			let oldPCObj = await PregnancyCenterModel.create(initialPRCData)
			oldPCObj = oldPCObj.toObject()

			// --------- try updating PrimaryContactPerson with an undefined id and nothing else

			oldPCObj.primaryContactPerson = { _id: undefined }

			const res = await chai
				.request(server)
				.put('/api/pregnancy-centers/' + oldPCObj._id)
				.send(oldPCObj)

			// make sure no person was created due to the empty obj
			const people = await PersonModel.find({})
			people.should.have.length(0)

			// check that that no histories were created
			const histories = await PregnancyCenterHistoryModel.find({
				pregnancyCenterId: oldPCObj._id,
			})
			histories.should.have.length(1)
			histories[0].field.should.equal('address')

			// make sure result is what is expected
			res.should.have.status(200)
			res.body.should.be.a('object')
			res.body.should.have.property('_id')
			res.body.should.have.property('prcName')
			res.body._id.should.equal(String(oldPCObj._id))
			res.body.updated.address.should.have.property('userId')
		})
	})

	/*
	 * Test the /PUT /api/pregnancy-centers/:pregnancyCenterId route where PrimaryContactPerson is a null _id and nothing else
	 */
	describe('/PUT /api/pregnancy-centers/:pregnancyCenterId', () => {
		it('it should return no new person for PrimaryContactPerson = {_id: null}', async () => {
			await mockAuthenticate()

			const initialPRCData = {
				address: {
					line1: '586 Central Ave.\nAlbany, NY 12206',
					location: {
						type: 'Point',
						coordinates: [-73.7814005, 42.6722152],
					},
				},
				prcName: 'Birthright of Albany',
				phone: '+15184382978',
				website: 'http://www.birthright.org',
				services: {},
			}
			let oldPCObj = await PregnancyCenterModel.create(initialPRCData)
			oldPCObj = oldPCObj.toObject()

			// ---------- try updating PrimaryContactPerson with a null _id and nothing else

			oldPCObj.primaryContactPerson = { _id: null }
			try {
				await chai
					.request(server)
					.put('/api/pregnancy-centers/' + oldPCObj._id)
					.send(oldPCObj)
			} catch (err) {
				assertError(
					err.response,
					400,
					'Bad Request',
					'child "primaryContactPerson" fails because [child "_id" fails because ["_id" must be a string]]',
				)
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
				address: {
					line1: '586 Central Ave.\nAlbany, NY 12206',
					location: {
						type: 'Point',
						coordinates: [-73.7814005, 42.6722152],
					},
				},
				prcName: 'Birthright of Albany',
				phone: '+15184382978',
				website: 'http://www.birthright.org',
				services: {},
			}
			let oldPCObj = await PregnancyCenterModel.create(initialPRCData)
			oldPCObj = oldPCObj.toObject()
			const testUser = await UserModel.findOne({ displayName: 'Kate Sills' })

			// ---------- try updating PrimaryContactPerson with no _id but firstName: Kate
			oldPCObj.primaryContactPerson = { firstName: 'Kate' }

			const res = await chai
				.request(server)
				.put('/api/pregnancy-centers/' + oldPCObj._id)
				.send(oldPCObj)

			// make sure one person was created
			const people = await PersonModel.find({})
			people.should.have.length(1)

			// check that one history was created
			const histories = await PregnancyCenterHistoryModel.find({
				pregnancyCenterId: oldPCObj._id,
			})
			histories.should.have.length(2)
			for (const pc_history of histories) {
				if (pc_history.field === 'primaryContactPerson') {
					pc_history.newValue.firstName.should.equal('Kate')
				} else {
					pc_history.field.should.equal('address')
				}
			}

			// make sure result is what is expected
			res.should.have.status(200)
			res.body.should.be.a('object')
			res.body.should.have.property('_id')
			res.body.should.have.property('prcName')
			res.body.should.have.property('primaryContactPerson')
			res.body._id.should.equal(String(oldPCObj._id))
			res.body.updated.primaryContactPerson.userId.should.equal(
				testUser._id.toString(),
			)
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
				phone: '+18884442222',
			})
			await primaryContactPerson.save()

			const initialPCData = {
				address: {
					line1: '586 Central Ave.\nAlbany, NY 12206',
					location: {
						type: 'Point',
						coordinates: [-73.7814005, 42.6722152],
					},
				},
				primaryContactPerson: primaryContactPerson,
				prcName: 'Birthright of Albany',
				phone: '+15184382978',
				website: 'http://www.birthright.org',
				services: {},
			}
			let oldPCObj = await PregnancyCenterModel.create(initialPCData)

			// make sure one person was created
			const people = await PersonModel.find({})
			people.should.have.length(1)

			oldPCObj = oldPCObj.toObject()
			const testUser = await UserModel.findOne({ displayName: 'Kate Sills' })

			// ---------- try updating PrimaryContactPerson with full
			oldPCObj.primaryContactPerson = {
				_id: oldPCObj.primaryContactPerson._id,
				firstName: 'Kate2',
				lastName: 'Sills2',
			}

			const res = await chai
				.request(server)
				.put('/api/pregnancy-centers/' + oldPCObj._id)
				.send(oldPCObj)

			// make sure we still only have one person
			const people2 = await PersonModel.find({})
			people2.should.have.length(1)

			// check that one history was created
			const histories = await PregnancyCenterHistoryModel.find({
				pregnancyCenterId: oldPCObj._id,
			})
			histories.should.have.length(2)
			for (const pc_history of histories) {
				if (pc_history.field === 'primaryContactPerson') {
					pc_history.newValue.firstName.should.equal('Kate2')
					pc_history.newValue.lastName.should.equal('Sills2')
				} else {
					pc_history.field.should.equal('address')
				}
			}

			// make sure result is what is expected
			res.should.have.status(200)
			res.body.should.be.a('object')
			res.body.should.have.property('_id')
			res.body.should.have.property('prcName')
			res.body.should.have.property('primaryContactPerson')
			res.body.should.have.property('address')
			res.body.address.location.should.have.property('coordinates')
			res.body._id.should.equal(String(oldPCObj._id))
			res.body.updated.primaryContactPerson.userId.should.equal(
				testUser._id.toString(),
			)
		})
	})

	/*
	 * Test the /GET /api/pregnancy-centers/:pregnancyCenterId route w/o authentication
	 */
	describe('/GET /api/pregnancy-centers/:pregnancyCenterId no-auth', () => {
		it('it should return a 401 error because there is no authentication', async () => {
			const pc = new PregnancyCenterModel({
				address: {
					line1: '586 Central Ave.\nAlbany, NY 12206',
					location: {
						type: 'Point',
						coordinates: [-73.7814005, 42.6722152],
					},
				},
				prcName: 'Birthright of Albany',
				phone: '+15184382978',
				website: 'http://www.birthright.org',
				services: {},
			})
			await pc.save()

			try {
				await chai.request(server).get('/api/pregnancy-centers/' + pc._id)
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
				phone: '+18884442222',
			})
			await primaryContactPerson.save()

			const pc = new PregnancyCenterModel({
				address: {
					line1: '586 Central Ave.\nAlbany, NY 12206',
					location: {
						type: 'Point',
						coordinates: [-73.7814005, 42.6722152],
					},
				},
				prcName: 'Birthright of Albany',
				primaryContactPerson: primaryContactPerson,
				phone: '+15184382978',
				hotlinePhoneNumber: '+15184382978',
				website: 'http://www.birthright.org',
				services: {},
			})

			await pc.save()

			await mockAuthenticate()
			const res = await chai
				.request(server)
				.get('/api/pregnancy-centers/' + pc._id)

			res.should.have.status(200)
			res.body.should.be.a('object')
			res.body.should.have.property('_id')
			res.body.should.have.property('prcName')
			res.body._id.should.equal(String(pc._id))
			res.body.hotlinePhoneNumber.should.equal('+15184382978')
			res.body.prcName.should.equal('Birthright of Albany')
			res.body.primaryContactPerson.firstName.should.equal('Joanna')
			res.body.verifiedData.should.deep.equal({})
		})
	})

	/*
 * Test the /PUT /api/pregnancy-centers/:pregnancyCenterId/out-of-business route with authentication
 */
	describe('/PUT /api/pregnancy-centers/:pregnancyCenterId/out-of-business', () => {
		it('it should return a single pregnancy center with updated outOfBusiness with authentication', async () => {
			const primaryContactPerson = new PersonModel({
				firstName: 'Joanna',
				lastName: 'Smith',
				email: 'email@email.org',
				phone: '+18884442222',
			})
			await primaryContactPerson.save()

			const pc = new PregnancyCenterModel({
				address: {
					line1: '586 Central Ave.\nAlbany, NY 12206',
					location: {
						type: 'Point',
						coordinates: [-73.7814005, 42.6722152],
					},
				},
				prcName: 'Birthright of Albany',
				primaryContactPerson: primaryContactPerson,
				phone: '+15184382978',
				hotlinePhoneNumber: '+15184382978',
				website: 'http://www.birthright.org',
				services: {},
				outOfBusiness: true,
			})

			await pc.save()
			const testUser = await UserModel.findOne({ displayName: 'Kate Sills' })

			await mockAuthenticate()
			const res = await chai
				.request(server)
				.put(`/api/pregnancy-centers/${pc._id}/out-of-business`)
				.send({ outOfBusiness: false })

			res.should.have.status(200)
			res.body.should.be.a('object')
			res.body.should.have.property('_id')
			res.body.should.have.property('prcName')
			res.body._id.should.equal(String(pc._id))
			res.body.prcName.should.equal('Birthright of Albany')
			res.body.hotlinePhoneNumber.should.equal('+15184382978')
			res.body.primaryContactPerson.firstName.should.equal('Joanna')
			res.body.verifiedData.should.deep.equal({})
			res.body.outOfBusiness.should.equal(false)
			res.body.updated.outOfBusiness.userId.should.equal(
				testUser._id.toString(),
			)

			// check that the pregnancy center history is created as well.
			const histories = await PregnancyCenterHistoryModel.find({
				pregnancyCenterId: pc._id,
			})

			const fields = _.map(histories, 'field')
			fields.should.have.members(['outOfBusiness'])

			// test other way

			const res2 = await chai
				.request(server)
				.put(`/api/pregnancy-centers/${pc._id}/out-of-business`)
				.send({ outOfBusiness: true })

			res2.should.have.status(200)
			res2.body.should.be.a('object')
			res2.body.should.have.property('_id')
			res2.body.should.have.property('prcName')
			res2.body._id.should.equal(String(pc._id))
			res2.body.hotlinePhoneNumber.should.equal('+15184382978')
			res2.body.prcName.should.equal('Birthright of Albany')
			res2.body.primaryContactPerson.firstName.should.equal('Joanna')
			res2.body.verifiedData.should.deep.equal({})
			res2.body.outOfBusiness.should.equal(true)

			// test no change

			const res3 = await chai
				.request(server)
				.put(`/api/pregnancy-centers/${pc._id}/out-of-business`)
				.send({ outOfBusiness: true })

			res3.should.have.status(200)
			res3.body.should.be.a('object')
			res3.body.should.have.property('_id')
			res3.body.should.have.property('prcName')
			res3.body.hotlinePhoneNumber.should.equal('+15184382978')
			res3.body._id.should.equal(String(pc._id))
			res3.body.prcName.should.equal('Birthright of Albany')
			res3.body.primaryContactPerson.firstName.should.equal('Joanna')
			res3.body.verifiedData.should.deep.equal({})
			res3.body.outOfBusiness.should.equal(true)
		})
	})

	/*
 	* Test the /PUT /api/pregnancy-centers/:pregnancyCenterId/out-of-business route with authentication
 	*/
	describe('/PUT /api/pregnancy-centers/:pregnancyCenterId/out-of-business', () => {
		it('it should return a single pregnancy center with updated outOfBusiness', async () => {
			const primaryContactPerson = new PersonModel({
				firstName: 'Joanna',
				lastName: 'Smith',
				email: 'email@email.org',
				phone: '+18884442222',
			})
			await primaryContactPerson.save()

			const pc = new PregnancyCenterModel({
				address: {
					line1: '586 Central Ave.\nAlbany, NY 12206',
					location: {
						type: 'Point',
						coordinates: [-73.7814005, 42.6722152],
					},
				},
				prcName: 'Birthright of Albany',
				primaryContactPerson: primaryContactPerson,
				phone: '+15184382978',
				hotlinePhoneNumber: '+15184382978',
				website: 'http://www.birthright.org',
				services: {},
				outOfBusiness: true,
			})

			await pc.save()
			const testUser = await UserModel.findOne({ displayName: 'Kate Sills' })

			await mockAuthenticate()
			const res = await chai
				.request(server)
				.put(`/api/pregnancy-centers/${pc._id}/out-of-business`)
				.send({ outOfBusiness: false })

			res.should.have.status(200)
			res.body.should.be.a('object')
			res.body.should.have.property('_id')
			res.body.should.have.property('prcName')
			res.body._id.should.equal(String(pc._id))
			res.body.prcName.should.equal('Birthright of Albany')
			res.body.hotlinePhoneNumber.should.equal('+15184382978')
			res.body.primaryContactPerson.firstName.should.equal('Joanna')
			res.body.verifiedData.should.deep.equal({})
			res.body.outOfBusiness.should.equal(false)
			res.body.updated.outOfBusiness.userId.should.equal(
				testUser._id.toString(),
			)

			// check that the pregnancy center history is created as well.
			const histories = await PregnancyCenterHistoryModel.find({
				pregnancyCenterId: pc._id,
			})

			const fields = _.map(histories, 'field')
			fields.should.have.members(['outOfBusiness'])

			// test other way

			const res2 = await chai
				.request(server)
				.put(`/api/pregnancy-centers/${pc._id}/out-of-business`)
				.send({ outOfBusiness: true })

			res2.should.have.status(200)
			res2.body.should.be.a('object')
			res2.body.should.have.property('_id')
			res2.body.should.have.property('prcName')
			res2.body._id.should.equal(String(pc._id))
			res2.body.hotlinePhoneNumber.should.equal('+15184382978')
			res2.body.prcName.should.equal('Birthright of Albany')
			res2.body.primaryContactPerson.firstName.should.equal('Joanna')
			res2.body.verifiedData.should.deep.equal({})
			res2.body.outOfBusiness.should.equal(true)

			// test no change

			const res3 = await chai
				.request(server)
				.put(`/api/pregnancy-centers/${pc._id}/out-of-business`)
				.send({ outOfBusiness: true })

			res3.should.have.status(200)
			res3.body.should.be.a('object')
			res3.body.should.have.property('_id')
			res3.body.should.have.property('prcName')
			res3.body._id.should.equal(String(pc._id))
			res3.body.hotlinePhoneNumber.should.equal('+15184382978')
			res3.body.prcName.should.equal('Birthright of Albany')
			res3.body.primaryContactPerson.firstName.should.equal('Joanna')
			res3.body.verifiedData.should.deep.equal({})
			res3.body.outOfBusiness.should.equal(true)
		})
	})

	/*
 	* Test the /PUT /api/pregnancy-centers/:pregnancyCenterId/do-not-list route with authentication
 	*/
	describe('/PUT /api/pregnancy-centers/:pregnancyCenterId/do-not-list', () => {
		it('it should return a single pregnancy center with updated doNotList', async () => {
			const primaryContactPerson = new PersonModel({
				firstName: 'Joanna',
				lastName: 'Smith',
				email: 'email@email.org',
				phone: '+18884442222',
			})
			await primaryContactPerson.save()

			const pc = new PregnancyCenterModel({
				address: {
					line1: '586 Central Ave.\nAlbany, NY 12206',
					location: {
						type: 'Point',
						coordinates: [-73.7814005, 42.6722152],
					},
				},
				prcName: 'Birthright of Albany',
				primaryContactPerson: primaryContactPerson,
				phone: '+15184382978',
				hotlinePhoneNumber: '+15184382978',
				website: 'http://www.birthright.org',
				services: {},
				doNotList: true,
			})

			await pc.save()
			const testUser = await UserModel.findOne({ displayName: 'Kate Sills' })

			await mockAuthenticate()
			const res = await chai
				.request(server)
				.put('/api/pregnancy-centers/' + pc._id + '/do-not-list')
				.send({ doNotList: false })

			res.should.have.status(200)
			res.body.should.be.a('object')
			res.body.should.have.property('_id')
			res.body.should.have.property('prcName')
			res.body._id.should.equal(String(pc._id))
			res.body.hotlinePhoneNumber.should.equal('+15184382978')
			res.body.prcName.should.equal('Birthright of Albany')
			res.body.primaryContactPerson.firstName.should.equal('Joanna')
			res.body.verifiedData.should.deep.equal({})
			res.body.doNotList.should.equal(false)
			res.body.updated.doNotList.userId.should.equal(testUser._id.toString())

			// check that the pregnancy center history is created as well.
			const histories = await PregnancyCenterHistoryModel.find({
				pregnancyCenterId: pc._id,
			})

			const fields = _.map(histories, 'field')
			fields.should.have.members(['doNotList'])

			// test other way

			const res2 = await chai
				.request(server)
				.put('/api/pregnancy-centers/' + pc._id + '/do-not-list')
				.send({ doNotList: true })

			res2.should.have.status(200)
			res2.body.should.be.a('object')
			res2.body.should.have.property('_id')
			res2.body.should.have.property('prcName')
			res2.body._id.should.equal(String(pc._id))
			res2.body.hotlinePhoneNumber.should.equal('+15184382978')
			res2.body.prcName.should.equal('Birthright of Albany')
			res2.body.primaryContactPerson.firstName.should.equal('Joanna')
			res2.body.verifiedData.should.deep.equal({})
			res2.body.doNotList.should.equal(true)

			// test no change

			const res3 = await chai
				.request(server)
				.put('/api/pregnancy-centers/' + pc._id + '/do-not-list')
				.send({ doNotList: true })

			res3.should.have.status(200)
			res3.body.should.be.a('object')
			res3.body.should.have.property('_id')
			res3.body.should.have.property('prcName')
			res3.body.hotlinePhoneNumber.should.equal('+15184382978')
			res3.body._id.should.equal(String(pc._id))
			res3.body.prcName.should.equal('Birthright of Albany')
			res3.body.primaryContactPerson.firstName.should.equal('Joanna')
			res3.body.verifiedData.should.deep.equal({})
			res3.body.doNotList.should.equal(true)
		})
	})

	/*
	 * Test the Joi validation for pregnancy centers separately from the API routes
	 */
	describe('Test Joi validation for pregnancy centers address 1', () => {
		it('validation should fail because the address is not an object ', async () => {
			const testPCObj1 = {
				address: 'My address', // should be an object with line1, line2, city, etc.
			}
			const { error } = await pregnancyCenterSchemaJoi.validate(testPCObj1, {
				abortEarly: false,
			})
			error.name.should.equal('ValidationError')
			error.message.should.equal('"address" must be of type object')
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
							-73.7814005, // lat, lng, reversed
						],
					},
				},
			}

			const { error } = await pregnancyCenterSchemaJoi.validate(testPCObj2, {
				abortEarly: false,
			})

			error.name.should.equal('ValidationError')
			error.message.should.equal(
				'"address.location.coordinates[0]" must be less than or equal to -66. "address.location.coordinates[1]" must be larger than or equal to 23',
			)
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
							-73.7814005, // lat, lng, reversed
						],
					},
				},
			}

			const { error } = await pregnancyCenterSchemaJoi.validate(testPCObj3, {
				abortEarly: false,
			})
			error.name.should.equal('ValidationError')
			error.message.should.equal(
				'"address.location.coordinates[0]" must be less than or equal to -66. "address.location.coordinates[1]" must be larger than or equal to 23',
			)
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
						close: 1700,
					},
				},
			}

			const { error, value } = await pregnancyCenterSchemaJoi.validate(
				testPCObj6,
				{
					abortEarly: false,
				},
			)
			if (error) {
				throw error
			}
			value.hours.should.deep.equal({
				2: {
					open: 800,
					close: 1700,
				},
			})
		})
	})

	/*
	 * Test the Joi validation for pregnancy centers separately from the API routes
	 */
	describe('Test Joi validation for pregnancy centers readable hours 7', () => {
		it("validation should fail because tues is not one of the keys (it's 1-7)", async () => {
			const testPCObj7 = {
				hours: {
					tues: {
						open: '800',
						close: '1700',
					},
				},
			}

			const { error } = await pregnancyCenterSchemaJoi.validate(testPCObj7, {
				abortEarly: false,
			})
			error.name.should.equal('ValidationError')
			error.message.should.equal('"hours.tues" is not allowed')
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
					},
				},
			}

			const { error, value } = await pregnancyCenterSchemaJoi.validate(
				testPCObj8,
				{
					abortEarly: false,
				},
			)
			if (error) {
				throw error
			}
			value.hours.should.deep.equal({
				1: {
					open: 800,
					close: 1600,
				},
			})
		})
	})

	/*
	 * Test the Joi validation for pregnancy centers separately from the API routes
	 */
	describe('Test Joi validation for pregnancy centers phone 9', () => {
		it('validation should fail because phone is in format xxx.xxx.xxx and needs to be in E.164 international format', async () => {
			const testPCObj9 = {
				phone: '888.444.2222',
			}

			const { error } = await pregnancyCenterSchemaJoi.validate(testPCObj9, {
				abortEarly: false,
			})
			error.name.should.equal('ValidationError')
			error.message.should.equal(
				`"phone" with value "888.444.2222" fails to match the required pattern: /\\+1([2-9][0-8][0-9])([2-9][0-9]{2})([0-9]{4})/`,
			)
		})
	})

	/*
	 * Test the Joi validation for pregnancy centers separately from the API routes
	 */
	describe('Test Joi validation for pregnancy centers phone 10', () => {
		it('validation should pass because phone is in E.164 international format', async () => {
			const testPCObj10 = {
				phone: '+18884442222',
			}

			const { error, value } = await pregnancyCenterSchemaJoi.validate(
				testPCObj10,
				{
					abortEarly: false,
				},
			)
			if (error) {
				throw error
			}
			value.phone.should.equal('+18884442222')
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
				},
			}

			const { error } = await pregnancyCenterSchemaJoi.validate(testPCObj12, {
				abortEarly: false,
			})
			error.name.should.equal('ValidationError')
			error.message.should.equal('"services.Ulllltrasound" is not allowed')
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
						dateVerified: moment(),
					},
				},
			}

			const { error } = await pregnancyCenterSchemaJoi.validate(testPCObj13, {
				abortEarly: false,
			})
			error.name.should.equal('ValidationError')
			error.message.should.equal(
				'"verifiedData.address.dateVerified" is not allowed',
			)
		})
	})

	/*
	 * Test the Joi validation for pregnancy centers separately from the API routes
	 */
	describe('Test Joi validation for pregnancy centers verifiedData 14', () => {
		it('validation should pass because the verifiedData field for address has date and userId and verified', async () => {
			const testPCObj14 = {
				verifiedData: {
					address: {
						date: moment().toISOString(),
						userId: '58e46a8d210140d7e47bf58b',
						verified: true,
					},
				},
			}

			const { error, value } = await pregnancyCenterSchemaJoi.validate(
				testPCObj14,
				{
					abortEarly: false,
				},
			)
			if (error) {
				throw error
			}
			value.verifiedData.address.userId.should.equal('58e46a8d210140d7e47bf58b')
		})
	})

	/*
	 * Test the Joi validation for pregnancy centers separately from the API routes
	 */
	describe('Test Joi validation for pregnancy centers verifiedData 15', () => {
		it('validation should fail because inVerification should be a user objectId', async () => {
			const testPCObj15 = {
				inVerification: 'dwdss',
			}

			const { error } = await pregnancyCenterSchemaJoi.validate(testPCObj15, {
				abortEarly: false,
			})
			error.name.should.equal('ValidationError')
			error.message.should.equal('"inVerification" contains an invalid value')
		})
	})

	/*
	 * Test the Joi validation for pregnancy centers separately from the API routes
	 */
	describe('Test Joi validation for pregnancy centers verifiedData 16', () => {
		it('validation should pass because inVerification is a user objectId', async () => {
			const testUser = await UserModel.findOne({ displayName: 'Kate Sills' })

			const testPCObj16 = {
				inVerification: testUser._id,
			}

			const { error, value } = await pregnancyCenterSchemaJoi.validate(
				testPCObj16,
				{
					abortEarly: false,
				},
			)
			if (error) {
				throw error
			}
			value.inVerification.should.equal(testUser._id)
		})
	})
})
