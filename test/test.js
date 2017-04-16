//During the test the env variable is set to test
// process.env.NODE_ENV = 'test'

const mongoose = require('mongoose')
const PregnancyCenterModel = require('../app/models/pregnancy-center')
const pregnancyCenterSchemaJoi = require('../app/schemas/pregnancy-center')

const Log = require('log')
const log = new Log('info')

//Require the dev-dependencies
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server/server')
const should = chai.should()

chai.use(chaiHttp)

//Our parent block
describe('PregnancyCenters', () => {
	beforeEach((done) => { //Before each test we empty the database
		PregnancyCenterModel.remove({}, (err) => {
			done()
		})
	})
	/*
	 * Test the /GET /api/pregnancy-centers route
	 */
	describe('/GET /api/pregnancy-centers', () => {
		it('it should GET all the pregnancy centers', (done) => {
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
	 * Test the /POST route
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
				resources:[],
			}
			chai.request(server)
				.post('/api/pregnancy-centers')
				.send(pregnancyCenter)
				.end((err, res) => {
					log.info(res.body)
					res.should.have.status(200)
					res.body.should.be.a('object')
					res.body.should.have.property('address')
					res.body.should.have.property('name')
					res.body.should.have.property('_id')
					res.body.should.have.property('website')
					res.body.should.have.property('phone')
					res.body.should.have.property('resources')
					res.body.address.line1.should.equal('586 Central Ave.\nAlbany, NY 12206')
					res.body.address.location.type.should.equal('Point')
					res.body.address.location.coordinates.should.deep.equal(
						[-73.7814005, 42.6722152])
					res.body.name.should.equal('Birthright of Albany')
					res.body.phone.should.equal('+15184382978')
					res.body.website.should.equal('http://www.birthright.org')
					res.body.resources.should.deep.equal([])
					done()
				})
		})
	})

	/*
	 * Test the /POST route
	 */
	describe('/POST /api/pregnancy-centers', () => {
		it('it should create a new pregnancy center and return the data', (done) => {
			const pregnancyCenter = {
				'address': {
					'line1':'518 Clinton Ave.\nAlbany, NY 12206',
					'location':{
						'type':'Point',
						'coordinates':[-73.7681818,42.6644982]
					}
				},
				'name':'Alpha Pregnancy Care Center',
				'notes':'They have ongoing CBE classes.\nPlease change website to ORG.\nSocial worker and peer counseling.',
				'phone':'518.462.2188',
				'email':'info@alphacare.org',
				'resources':['Ultrasound','Material Assistance','Post-Abortion Healing','Parenting Classes','Counseling'],
				'website':'http://www.alphacare.com',
				'verified':{
					'address':{
						'date':'3/3/17'
					},
					'name':{
						'date':'3/3/17'
					},
					'phone':{
						'date':'3/3/17'
					},
					'website':{
						'date':'3/3/17'
					},
					'email':{
						'date':'3/3/17'
					}
				}
			}
			chai.request(server)
				.post('/api/pregnancy-centers')
				.send(pregnancyCenter)
				.end((err, res) => {
					log.info(res.body)
					res.should.have.status(200)
					res.body.should.be.a('object')
					res.body.should.have.property('address')
					res.body.should.have.property('name')
					res.body.should.have.property('notes')
					res.body.should.have.property('_id')
					res.body.should.have.property('website')
					res.body.should.have.property('phone')
					res.body.should.have.property('resources')
					res.body.should.have.property('verified')
					res.body.address.line1.should.equal('518 Clinton Ave.\nAlbany, NY 12206')
					res.body.address.location.type.should.equal('Point')
					res.body.address.location.coordinates.should.deep.equal(
						[-73.7681818,42.6644982])
					res.body.name.should.equal('Alpha Pregnancy Care Center')
					//res.body.phone.should.equal('518.462.2188')
					res.body.website.should.equal('http://www.alphacare.com')
					res.body.resources.should.deep.equal(['Ultrasound','Material Assistance','Post-Abortion Healing','Parenting Classes','Counseling'])
					done()
				})
		})
	})

})