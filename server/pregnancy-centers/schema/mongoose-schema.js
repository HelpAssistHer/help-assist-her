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
	prcName: String,
	notes: String,
	phone: String,
	primaryContactPerson: { type: Person.ObjectId, ref: 'Person' },
	services: {
		default: {},
		pregnancyTest: Boolean,
		ultrasound: Boolean,
		materialAssistance: Boolean,
		postAbortionHealing: Boolean,
		parentingClasses: Boolean,
		stdTesting: Boolean,
		professionalCounseling: Boolean,
		other: Boolean
	},
	verified: {
		address: userDateSchema,
		hours: userDateSchema,
		name: userDateSchema,
		phone: userDateSchema,
		primaryContact: userDateSchema,
		services: userDateSchema,
		website: userDateSchema,
	},
	updated: {
		address: userDateSchema,
		hours: userDateSchema,
		name: userDateSchema,
		notes: userDateSchema,
		phone: userDateSchema,
		primaryContact: userDateSchema,
		services: userDateSchema,
		website: userDateSchema,
	},
	website: String,
}, {
	timestamps: true, // createdAt and updatedAt are automatically added
	minimize: false // services will have a default of {}
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

