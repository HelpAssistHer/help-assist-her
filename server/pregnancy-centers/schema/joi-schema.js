'use strict'

const Joi = require('@hapi/joi')
const isObjectId = require('../../util/is-object-id')

const helpers = require('./helpers')
const personSchemaJoi = require('../../persons/schema/joi-schema')
const {
	addressSchemaJoi,
	hoursSchemaJoi,
	dateUserActionSchemaJoi,
} = require('../../locations/schema/joi-schema')

const pregnancyCenterSchemaJoi = Joi.object({
	__v: Joi.number().min(0),
	_id: Joi.any()
		.custom(isObjectId)
		.allow(null),
	address: addressSchemaJoi,
	createdAt: Joi.date().iso(),
	doNotList: Joi.boolean(),
	email: Joi.string().email(),
	hotlinePhoneNumber: Joi.string()
		.trim()
		.regex(/\+1([2-9][0-8][0-9])([2-9][0-9]{2})([0-9]{4})/),
	hours: hoursSchemaJoi,
	inVerification: Joi.any()
		.custom(isObjectId)
		.allow(null),
	prcName: Joi.string(),
	notes: Joi.string(),
	otherServices: Joi.string(),
	outOfBusiness: Joi.boolean(),
	phone: Joi.string()
		.trim()
		.regex(/\+1([2-9][0-8][0-9])([2-9][0-9]{2})([0-9]{4})/),
	primaryContactPerson: personSchemaJoi,
	services: helpers.getPregnancyCenterServicesSchema(Joi.boolean()),
	verifiedData: {
		address: dateUserActionSchemaJoi,
		email: dateUserActionSchemaJoi,
		hotlinePhoneNumber: dateUserActionSchemaJoi,
		hours: dateUserActionSchemaJoi,
		prcName: dateUserActionSchemaJoi,
		phone: dateUserActionSchemaJoi,
		primaryContactPerson: dateUserActionSchemaJoi,
		services: dateUserActionSchemaJoi,
		website: dateUserActionSchemaJoi,
	},
	updated: {
		address: dateUserActionSchemaJoi,
		doNotList: dateUserActionSchemaJoi,
		email: dateUserActionSchemaJoi,
		hotlinePhoneNumber: dateUserActionSchemaJoi,
		hours: dateUserActionSchemaJoi,
		notes: dateUserActionSchemaJoi,
		outOfBusiness: dateUserActionSchemaJoi,
		phone: dateUserActionSchemaJoi,
		prcName: dateUserActionSchemaJoi,
		primaryContactPerson: dateUserActionSchemaJoi,
		services: dateUserActionSchemaJoi,
		website: dateUserActionSchemaJoi,
	},
	updatedAt: Joi.date().iso(),
	website: Joi.string(),
})

module.exports = pregnancyCenterSchemaJoi
