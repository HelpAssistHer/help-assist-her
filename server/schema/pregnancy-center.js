'use strict'

const Joi = require('@hapi/joi')
const isObjectId = require('../util/is-object-id')
const { buildPregnancyCenterSchema } = require('../util/services')
const personSchemaJoi = require('./person')
const {
	addressSchemaJoi,
	hoursSchemaJoi,
	dateUserActionSchemaJoi,
} = require('./location')

const pregnancyCenterSchemaJoi = Joi.object({
	__v: Joi.number().min(0),
	_id: Joi.any().custom(isObjectId).allow(null),
	address: addressSchemaJoi,
	createdAt: Joi.date().iso(),
	doNotList: Joi.boolean(),
	email: Joi.string().email().allow(''),
	hotlinePhoneNumber: Joi.string()
		.trim()
		.regex(/\+1([2-9][0-8][0-9])([2-9][0-9]{2})([0-9]{4})/)
		.allow(''),
	hours: hoursSchemaJoi,
	inVerification: Joi.any().custom(isObjectId).allow(null),
	prcName: Joi.string(),
	notes: Joi.string().allow(''),
	otherServices: Joi.string().allow(''),
	outOfBusiness: Joi.boolean(),
	phone: Joi.string()
		.trim()
		.regex(/\+1([2-9][0-8][0-9])([2-9][0-9]{2})([0-9]{4})/)
		.allow(''),
	primaryContactPerson: personSchemaJoi,
	services: buildPregnancyCenterSchema(Joi.boolean()),
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
	website: Joi.string().uri().allow(''),
})

module.exports = pregnancyCenterSchemaJoi
