'use strict'

const Joi = require('@hapi/joi')
const isObjectId = require('../../util/is-object-id')
const helpers = require('../../pregnancy-centers/schema/helpers.js')
const {
	addressSchemaJoi,
	hoursSchemaJoi,
	dateUserActionSchemaJoi,
} = require('../../locations/schema/joi-schema')

const fqhcSchemaJoi = Joi.object().keys({
	__v: Joi.number().min(0),
	_id: Joi.string(),
	address: addressSchemaJoi,
	classification: Joi.string(),
	createdAt: Joi.date().iso(),
	doNotList: Joi.boolean(),
	email: Joi.string().email(),
	hours: hoursSchemaJoi,
	inVerification: Joi.any()
		.custom(isObjectId)
		.allow(null),
	fqhcName: Joi.string(),
	notes: Joi.string(),
	otherServices: Joi.string(),
	outOfBusiness: Joi.boolean(),
	phone: Joi.string()
		.trim()
		.regex(/\+1([2-9][0-8][0-9])([2-9][0-9]{2})([0-9]{4})/),
	services: helpers.getPregnancyCenterServicesSchema(Joi.boolean()),
	verifiedData: {
		address: dateUserActionSchemaJoi,
		email: dateUserActionSchemaJoi,
		hours: dateUserActionSchemaJoi,
		fqhcName: dateUserActionSchemaJoi,
		phone: dateUserActionSchemaJoi,
		services: dateUserActionSchemaJoi,
		website: dateUserActionSchemaJoi,
	},
	updated: {
		address: dateUserActionSchemaJoi,
		doNotList: dateUserActionSchemaJoi,
		email: dateUserActionSchemaJoi,
		fqhcName: dateUserActionSchemaJoi,
		hours: dateUserActionSchemaJoi,
		notes: dateUserActionSchemaJoi,
		outOfBusiness: dateUserActionSchemaJoi,
		phone: dateUserActionSchemaJoi,
		services: dateUserActionSchemaJoi,
		website: dateUserActionSchemaJoi,
	},
	updatedAt: Joi.date().iso(),
	website: Joi.string().allow(null),
})

module.exports = fqhcSchemaJoi
