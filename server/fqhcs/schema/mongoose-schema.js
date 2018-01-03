'use strict'

const mongoose = require('mongoose')

const helpers = require('../../pregnancy-centers/schema/helpers.js')
const {
	addressSchema,
	userDateSchema,
	getFullAddress
} = require('../../locations/schema/mongoose-schema')

const fqhcSchema = mongoose.Schema({
	address: addressSchema,
	classification: String,
	email: String,
	hours: Object,
	inVerification: String,
	fqhcName: String,
	notes: String,
	otherServices: String,
	phone: String,
	services: helpers.getPregnancyCenterServicesSchema(Boolean),
	verifiedData: {
		address: userDateSchema,
		email: userDateSchema,
		hours: userDateSchema,
		fqhcName: userDateSchema,
		phone: userDateSchema,
		services: userDateSchema,
		website: userDateSchema,
	},
	updated: {
		address: userDateSchema,
		email: userDateSchema,
		hours: userDateSchema,
		fqhcName: userDateSchema,
		notes: userDateSchema,
		phone: userDateSchema,
		services: userDateSchema,
		website: userDateSchema,
	},
	website: String,
}, {
	timestamps: true, // createdAt and updatedAt are automatically added
	minimize: false // services will have a default of {}
})

fqhcSchema.index({'address.location': '2dsphere'})

fqhcSchema.methods.getFullAddress = getFullAddress

// create model using the schema
const FQHCModel = mongoose.model('FQHCs', fqhcSchema)

module.exports = FQHCModel
