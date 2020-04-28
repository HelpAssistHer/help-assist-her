'use strict'

const mongoose = require('mongoose')

const helpers = require('../../pregnancy-centers/schema/helpers.js')
const {
	addressSchema,
	userDateSchema,
	getFullAddress,
} = require('../../locations/schema/mongoose-schema')

const fqhcSchema = mongoose.Schema(
	{
		address: addressSchema,
		classification: String,
		doNotList: Boolean,
		email: String,
		hours: Object,
		inVerification: String,
		chcName: String,
		notes: String,
		otherServices: String,
		outOfBusiness: Boolean,
		phone: String,
		services: helpers.getPregnancyCenterServicesSchema(Boolean),
		verifiedData: {
			address: userDateSchema,
			email: userDateSchema,
			hours: userDateSchema,
			chcName: userDateSchema,
			phone: userDateSchema,
			services: userDateSchema,
			website: userDateSchema,
		},
		updated: {
			address: userDateSchema,
			doNotList: userDateSchema,
			email: userDateSchema,
			chcName: userDateSchema,
			hours: userDateSchema,
			notes: userDateSchema,
			outOfBusiness: userDateSchema,
			phone: userDateSchema,
			services: userDateSchema,
			website: userDateSchema,
		},
		website: String,
	},
	{
		timestamps: true, // createdAt and updatedAt are automatically added
		minimize: false, // services will have a default of {}
	},
)

fqhcSchema.index({ 'address.location': '2dsphere' })

fqhcSchema.methods.getFullAddress = getFullAddress

// create model using the schema
const FQHCModel = mongoose.model('FQHCs', fqhcSchema)

module.exports = FQHCModel
