//Require the dev-dependencies
const chai = require('chai')
const chaiHttp = require('chai-http')
// eslint-disable-next-line no-unused-vars
const should = chai.should()
const Log = require('log')
const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')

const log = new Log('info')
const PregnancyCenterModel = require('../../pregnancy-centers/schema/mongoose-schema')
const server = require('../../server')
const PersonModel = require('../../persons/schema/mongoose-schema')

const { mockAuthenticate, assertError } = require('../helpers')

chai.use(chaiHttp)

/*
	* Test the GET /api/pregnancy-centers/near-me' route with authentication
	*/
describe('/GET /api/pregnancy-centers/near-me', () => {
	it('it should return an array with only the Birthright of Albany in it, not the Bridge to Life', async () => {
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
			primaryContactPerson: primaryContactPerson,
			prcName: 'Birthright of Albany',
			phone: '+15184382978',
			website: 'http://www.birthright.org',
			services: {},
			verifiedData: {
				prcName: {
					date: new Date('2018-11-15'),
					verified: true,
				},
				address: { verified: true },
				phone: { verified: true },
				website: { verified: true },
			},
		})

		// copy of above, but outOfBusiness
		await PregnancyCenterModel.create({
			address: {
				line1: '586 Central Ave.\nAlbany, NY 12206',
				location: {
					type: 'Point',
					coordinates: [-73.7814005, 42.6722152],
				},
			},
			outOfBusiness: true,
			primaryContactPerson: primaryContactPerson,
			prcName: 'Birthright of Albany - outOfBusiness',
			phone: '+15184382978',
			website: 'http://www.birthright.org',
			services: {},
			verifiedData: {
				prcName: {
					date: new Date('2018-11-15'),
					verified: true,
				},
				address: { verified: true },
				phone: { verified: true },
				website: { verified: true },
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
				prcName: {
					date: new Date('2018-11-15'),
					verified: true,
				},
				address: { verified: true },
				phone: { verified: true },
				website: { verified: true },
			},
		})

		await mockAuthenticate()
		const res = await chai
			.request(server)
			.get(
				'/api/pregnancy-centers/near-me?lng=-73.781332&lat=42.6721989&miles=5',
			)

		res.should.have.status(200)
		res.body.should.be.a('array')
		res.body.length.should.be.eql(1)
		res.body[0].prcName.should.be.eql('Birthright of Albany')
	})
})

describe('/pregnancy-centers/near-me', () => {
	it('the near-me endpoint should only return verified resources', async () => {
		// Verified before 10-31-18
		await PregnancyCenterModel.create({
			address: {
				line1: '586 Central Ave.\nAlbany, NY 12206',
				location: {
					type: 'Point',
					coordinates: [-73.7814005, 42.6722152],
				},
			},
			prcName: 'Verified before 10-31-18',
			phone: '+15184382978',
			website: 'http://www.birthright.org',
			services: {},
			verifiedData: {
				prcName: {
					date: new Date('2018-08-01'),
					verified: true,
				},
				address: { verified: true },
				phone: { verified: true },
				website: { verified: true },
			},
		})

		// Verified after 10-31-18
		await PregnancyCenterModel.create({
			address: {
				line1: '586 Central Ave.\nAlbany, NY 12206',
				location: {
					type: 'Point',
					coordinates: [-73.7814005, 42.6722152],
				},
			},
			prcName: 'Verified after 10-31-18',
			phone: '+15184382978',
			website: 'http://www.birthright.org',
			services: {},
			verifiedData: {
				prcName: {
					date: new Date('2018-11-01'),
					verified: true,
				},
				address: { verified: true },
				phone: { verified: true },
				website: { verified: true },
			},
		})

		// No verification data for prcName
		await PregnancyCenterModel.create({
			address: {
				line1: '586 Central Ave.\nAlbany, NY 12206',
				location: {
					type: 'Point',
					coordinates: [-73.7814005, 42.6722152],
				},
			},
			prcName: 'No verification data for prcName',
			phone: '+15184382978',
			website: 'http://www.birthright.org',
			services: {},
			verifiedData: {
				address: { verified: true },
				phone: { verified: true },
				website: { verified: true },
			},
		})

		await mockAuthenticate()
		const res = await chai
			.request(server)
			.get(
				'/api/pregnancy-centers/near-me?lng=-73.781332&lat=42.6721989&miles=5',
			)

		res.should.have.status(200)
		res.body.should.be.a('array')
		res.body.length.should.be.eql(1)
		res.body[0].prcName.should.be.eql('Verified after 10-31-18')
	})
})

/* 
Right now, results should be shown if...
- The resource has the name, address, phone, and website verified
- The name was verified after Oct 31 (this is because we're re-verifying some of the original resources that were verified)
- The resource is NOT out of business
- The resource does NOT have Do Not List checked

valid:
name verified && address verified && phone verified && website
verified && name verified after oct 31 && ! out of business & ! do not
list
*/

const addressVerified = {
	address: { verified: true },
}

const phoneVerified = {
	phone: { verified: true },
}

const websiteVerified = {
	website: { verified: true },
}

const nameVerifiedAfterOct31 = {
	prcName: {
		date: new Date('2018-11-15'),
		verified: true,
	},
}

const outOfBusiness = {
	outOfBusiness: true,
}

const doNotList = {
	doNotList: true,
}

const defaultPregnancyCenter = {
	address: {
		line1: '586 Central Ave.\nAlbany, NY 12206',
		location: {
			type: 'Point',
			coordinates: [-73.7814005, 42.6722152],
		},
	},
	prcName: 'Default',
	phone: '+15184382978',
	website: 'http://www.birthright.org',
	services: {},
}

// These characteristics make up a valid Pregnancy Center
const verifiedRules = [
	addressVerified,
	phoneVerified,
	websiteVerified,
	nameVerifiedAfterOct31,
]

describe('/pregnancy-centers/near-me filter combinations', () => {
	it('should return this resource that has only valid rules', async () => {
		let verifiedData = {}
		for (const rule of verifiedRules) {
			verifiedData = { ...verifiedData, ...rule }
		}

		const pregnancyCenter = {
			...defaultPregnancyCenter,
			verifiedData: {
				...verifiedData,
			},
			prcName: 'all valid',
		}

		await PregnancyCenterModel.create(pregnancyCenter)

		await mockAuthenticate()
		const res = await chai
			.request(server)
			.get(
				'/api/pregnancy-centers/near-me?lng=-73.781332&lat=42.6721989&miles=5',
			)

		res.should.have.status(200)
		res.body.should.be.a('array')
		res.body.length.should.be.eql(1)
		res.body[0].prcName.should.be.eql('all valid')
	})

	it('should not return anything because these are not fully valid', async () => {
		// Choose at most three of the verified rules at random (some will
		// be duplicates)
		let verifiedData = {}
		verifiedData = {
			...verifiedData,
			...verifiedRules[Math.floor(Math.random() * verifiedRules.length)],
		}
		verifiedData = {
			...verifiedData,
			...verifiedRules[Math.floor(Math.random() * verifiedRules.length)],
		}
		verifiedData = {
			...verifiedData,
			...verifiedRules[Math.floor(Math.random() * verifiedRules.length)],
		}

		const pregnancyCenter = {
			...defaultPregnancyCenter,
			verifiedData: {
				...verifiedData,
			},
			prcName: 'some valid',
		}

		log.info(pregnancyCenter)

		await PregnancyCenterModel.create(pregnancyCenter)

		await mockAuthenticate()
		try {
			await chai
				.request(server)
				.get(
					'/api/pregnancy-centers/near-me?lng=-73.781332&lat=42.6721989&miles=5',
				)
		} catch (err) {
			assertError(err.response, 404, 'Not Found')
		}
	})

	it('should not return anything because it is OutOfBusiness', async () => {
		let verifiedData = {}
		for (const rule of verifiedRules) {
			verifiedData = { ...verifiedData, ...rule }
		}

		const pregnancyCenter = {
			...defaultPregnancyCenter,
			verifiedData: {
				...verifiedData,
			},
			...outOfBusiness,
			prcName: 'outOfBusiness',
		}

		log.info(pregnancyCenter)

		await PregnancyCenterModel.create(pregnancyCenter)

		await mockAuthenticate()
		try {
			await chai
				.request(server)
				.get(
					'/api/pregnancy-centers/near-me?lng=-73.781332&lat=42.6721989&miles=5',
				)
		} catch (err) {
			assertError(err.response, 404, 'Not Found')
		}
	})

	it('should not return anything because it is DoNotList', async () => {
		let verifiedData = {}
		for (const rule of verifiedRules) {
			verifiedData = { ...verifiedData, ...rule }
		}

		const pregnancyCenter = {
			...defaultPregnancyCenter,
			verifiedData: {
				...verifiedData,
			},
			...doNotList,
			prcName: 'Do not list',
		}

		log.info(pregnancyCenter)

		await PregnancyCenterModel.create(pregnancyCenter)

		await mockAuthenticate()
		try {
			await chai
				.request(server)
				.get(
					'/api/pregnancy-centers/near-me?lng=-73.781332&lat=42.6721989&miles=5',
				)
		} catch (err) {
			assertError(err.response, 404, 'Not Found')
		}
	})
})
