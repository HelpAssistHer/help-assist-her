//Require the dev-dependencies
const chai = require('chai')
const chaiHttp = require('chai-http')
// eslint-disable-next-line no-unused-vars
const should = chai.should()
const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')

const FQHCModel = require('../../fqhcs/schema/mongoose-schema')
const { server } = require('../../server')
const { mockAuthenticate } = require('../helpers')

chai.use(chaiHttp)

/*
 * Test the GET /api/fqhcs/near-me' route with authentication
 */
describe('/GET /api/fqhcs/near-me', () => {
	it('it should return an array with only NEARBY CLINIC in it, not FAR CLINIC', async () => {
		await FQHCModel.create({
			address: {
				line1: '586 Central Ave.\nAlbany, NY 12206',
				location: {
					type: 'Point',
					coordinates: [-73.781465, 42.672397],
				},
			},
			chcName: 'NEARBY CLINIC',
			phone: '+17185969800',
			website: 'www.brooklynplaza.org',
			services: {},
			verifiedData: {
				chcName: {
					date: new Date('2019-12-04'),
					verified: true,
				},
				address: { verified: true },
				phone: { verified: true },
				website: { verified: true },
			},
		})

		// copy of above, but outOfBusiness
		await FQHCModel.create({
			address: {
				line1: '586 Central Ave.\nAlbany, NY 12206',
				location: {
					type: 'Point',
					coordinates: [-73.7814005, 42.6722152],
				},
			},
			chcName: 'NEARBY CLINIC OUT OF BUSINESS',
			phone: '+17185969800',
			website: 'www.brooklynplaza.org',
			services: {},
			outOfBusiness: true,
			verifiedData: {
				chcName: {
					date: new Date('2019-12-04'),
					verified: true,
				},
				address: { verified: true },
				phone: { verified: true },
				website: { verified: true },
			},
		})

		await FQHCModel.create({
			address: {
				line1: '23-40 Astoria Boulevard\nAstoria, NY 11102',
				location: {
					type: 'Point',
					coordinates: [-73.9241081, 40.771253],
				},
			},
			chcName: 'FAR CLINIC',
			phone: '+17185969800',
			website: 'www.brooklynplaza.org',
			services: {},
			verifiedData: {
				chcName: {
					date: new Date('2019-12-04'),
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
			.get('/api/fqhcs/near-me?lng=-73.781465&lat=42.672397&miles=5')
		res.should.have.status(200)
		res.body.should.be.a('array')
		res.body.length.should.be.eql(1)
		res.body[0].chcName.should.be.eql('NEARBY CLINIC')
	})
})
