'use strict'

const Joi = require('joi')
const Log = require('log')
const mongoose = require('mongoose')
const pregnancyCenterSchemaJoi = require('./joi-schema')
const _ = require('lodash')

const log = new Log('info')

const pointSchema = new mongoose.Schema({
	type: {type: String},
	coordinates: [Number]
})

const addressSchema = new mongoose.Schema({
	city: String,
	googlePlaceId: String, // we can store the google place ID according to TOS
	line1: String,
	line2: String,
	location: pointSchema,
	state: String,
	zip: String,
})

const userDateSchema = new mongoose.Schema({
	date: Date,
	userId: mongoose.Schema.Types.ObjectId
})

const pregnancyCenterSchema = mongoose.Schema({
	address: addressSchema,
	hours: Object,
	name: String, // change to PRC name
	notes: String,
	phone: String,
	primaryContactPerson: { type: Person.ObjectId, ref: 'Person' },
	services: [{
		type:String,
		enum: [
			'PREGNANCY_TEST',
			'ULTRASOUND',
			'MATERIAL_ASSISTANCE',
			'POST_ABORTION_HEALING',
			'PARENTING_CLASSES',
			'STD_TESTING',
			'PROFESSIONAL_COUNSELING',
			'OTHER',
		]
	}],
	verified: {
		address: userDateSchema,
		email: userDateSchema, //todo don't need this
		hours: userDateSchema,
		name: userDateSchema,
		phone: userDateSchema,
		primaryContact: userDateSchema,
		services: userDateSchema,
		website: userDateSchema,
	},
	updated: {
		address: userDateSchema,
		email: userDateSchema,
		hours: userDateSchema,
		name: userDateSchema,
		notes: userDateSchema,
		phone: userDateSchema,
		resources: userDateSchema,
		website: userDateSchema,
	},
	website: String,
}, {
	timestamps: true, // createdAt and updatedAt are automatically added
})

pregnancyCenterSchema.index({'address.location': '2dsphere'})

pregnancyCenterSchema.methods.getFullAddress = function getFullAddress() {
	return _.get(this, 'address.line1', '') + ' ' + _.get(this, 'address.line2', '') + ' '
		+ _.get(this, 'address.city', '') + ' ' + _.get(this, 'address.state', '') + ' ' +
		_.get(this, 'address.zip', '')
}

pregnancyCenterSchema.post('init', function(doc) {
	log.info('%s has been initialized from the db', doc._id)
})
pregnancyCenterSchema.post('validate', function(doc) {
	log.info('%s has been validated (but not saved yet)', doc._id)
})
pregnancyCenterSchema.post('save', function(doc) {
	log.info('%s has been saved', doc._id)
})
pregnancyCenterSchema.post('remove', function(doc) {
	log.info('%s has been removed', doc._id)
})

// create model using the schema
const PregnancyCenterModel = mongoose.model('PregnancyCenters', pregnancyCenterSchema)

// make available
module.exports = PregnancyCenterModel

