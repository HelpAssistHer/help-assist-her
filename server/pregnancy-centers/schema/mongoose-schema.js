'use strict'

const mongoose = require('mongoose')
const _ = require('lodash')

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
	email: String,
	hours: Object,
	name: String, // change to PRC name
	notes: String,
	phone: String,
	primaryContact: mongoose.Schema.Types.ObjectId,  // a user
	services: [{
		type:String,
		enum: [
			'PREGNANCY_TEST',
			'ULTRASOUND',
			'MATERIAL_ASSISTANCE',
			'POST_ABORTION_HEALING',
			'PARENTING_CLASSES',
			'STD_TESTING',
			'COUNSELING'
		]
	}],
	verified: {
		address: userDateSchema,
		email: userDateSchema,
		hours: userDateSchema,
		name: userDateSchema,
		notes: userDateSchema,
		phone: userDateSchema,
		resources: userDateSchema,
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

// create model using the schema
const PregnancyCenterModel = mongoose.model('PregnancyCenters', pregnancyCenterSchema)

// make available
module.exports = PregnancyCenterModel
