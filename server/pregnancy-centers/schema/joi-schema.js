'use strict'

const Joi = require('joi')
const phoneValidator = require('joi-phone-validator')
const objectIdValidator = require('../../util/object-id-validator.js')

const helpers = require('./helpers')
const personSchemaJoi = require('../../persons/schema/joi-schema')
const {
	addressSchemaJoi,
	hoursSchemaJoi,
	dateUserActionSchemaJoi,
} = require('../../locations/schema/joi-schema')

const pregnancyCenterSchemaJoi = Joi.object().keys({
	__v: Joi.number().min(0),
	_id: objectIdValidator
		.objectId()
		.isValid()
		.allow(null),
	address: addressSchemaJoi,
	createdAt: Joi.date().iso(),
	doNotList: Joi.boolean(),
	email: Joi.string().email(),
	hotlinePhoneNumber: phoneValidator.phone().validate(),
	hours: hoursSchemaJoi,
	inVerification: objectIdValidator
		.objectId()
		.isValid()
		.allow(null),
	prcName: Joi.string(),
	notes: Joi.string(),
	otherServices: Joi.string(),
	outOfBusiness: Joi.boolean(),
	phone: phoneValidator.phone().validate(),
	primaryContactPerson: personSchemaJoi,
	services: helpers.getPregnancyCenterServicesSchema(Joi.boolean()),
	verifiedData: {
		address: dateUserActionSchemaJoi,
		email: dateUserActionSchemaJoi,
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
