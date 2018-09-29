'use strict'

const mongoose = require('mongoose')

const helpers = require('./helpers')
const {
	addressSchema,
	userDateSchema,
	getFullAddress,
} = require('../../locations/schema/mongoose-schema')

const pregnancyCenterSchema = mongoose.Schema(
	{
		address: addressSchema,
		doNotList: Boolean,
		email: String,
		hotlinePhoneNumber: String,
		hours: Object,
		inVerification: mongoose.Schema.Types.ObjectId,
		prcName: String,
		notes: String,
		otherServices: String,
		outOfBusiness: Boolean,
		phone: String,
		primaryContactPerson: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Persons',
		},
		services: helpers.getPregnancyCenterServicesSchema(Boolean),
		verifiedData: {
			address: userDateSchema,
			email: userDateSchema,
			hotlinePhoneNumber: userDateSchema,
			hours: userDateSchema,
			prcName: userDateSchema,
			phone: userDateSchema,
			primaryContactPerson: userDateSchema,
			services: userDateSchema,
			website: userDateSchema,
		},
		updated: {
			address: userDateSchema,
			doNotList: userDateSchema,
			email: userDateSchema,
			hotlinePhoneNumber: userDateSchema,
			hours: userDateSchema,
			notes: userDateSchema,
			outOfBusiness: userDateSchema,
			phone: userDateSchema,
			prcName: userDateSchema,
			primaryContactPerson: userDateSchema,
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

pregnancyCenterSchema.index({ 'address.location': '2dsphere' })

pregnancyCenterSchema.methods.getFullAddress = getFullAddress

// create model using the schema
const PregnancyCenterModel = mongoose.model(
	'PregnancyCenters',
	pregnancyCenterSchema,
)

module.exports = PregnancyCenterModel
