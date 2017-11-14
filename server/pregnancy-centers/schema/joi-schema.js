'use strict'

const Joi = require('joi')
const phoneValidator = require('joi-phone-validator')

const helpers = require('./helpers')
const personSchemaJoi = require('../../persons/schema/joi-schema')
const {
	addressSchemaJoi,
	hoursSchemaJoi, 
	dateUserActionSchemaJoi } = require('../../locations/schema/joi-schema')

const pregnancyCenterSchemaJoi = Joi.object().keys({
	__v: Joi.number().min(0),
	_id: Joi.string(),
	address: addressSchemaJoi,
	createdAt: Joi.date().iso(),
	email: Joi.string().email(),
	hours: hoursSchemaJoi,
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
