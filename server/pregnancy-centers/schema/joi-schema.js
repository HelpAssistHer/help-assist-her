'use strict'

const Joi = require('joi')
const phoneValidator = require('joi-phone-validator')
const objectIdValidator = require('../../util/object-id-validator.js')

const helpers = require('./helpers')
const personSchemaJoi = require('../../persons/schema/joi-schema')
const {
	addressSchemaJoi,
	hoursSchemaJoi, 
	dateUserActionSchemaJoi } = require('../../locations/schema/joi-schema')

const pregnancyCenterSchemaJoi = Joi.object().keys({
	__v: Joi.number().min(0),
	_id: objectIdValidator.objectId().isValid().allow(null),
	address: addressSchemaJoi,
	outOfBusiness: Joi.boolean(),
	createdAt: Joi.date().iso(),
	email: Joi.string().email(),
	hours: hoursSchemaJoi,
	inVerification: objectIdValidator.objectId().isValid().allow(null),
	prcName: Joi.string(),
	notes: Joi.string(),
	otherServices: Joi.string(),
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
		website: dateUserActionSchemaJoi
	},
	updated: {
		address: dateUserActionSchemaJoi,
		outOfBusiness: dateUserActionSchemaJoi,
		email: dateUserActionSchemaJoi,
		hours: dateUserActionSchemaJoi,
		prcName: dateUserActionSchemaJoi,
		notes: dateUserActionSchemaJoi,
		phone: dateUserActionSchemaJoi,
		primaryContactPerson: dateUserActionSchemaJoi,
		services: dateUserActionSchemaJoi,
		website: dateUserActionSchemaJoi
	},
	updatedAt: Joi.date().iso(),
	website: Joi.string()
})

module.exports = pregnancyCenterSchemaJoi
