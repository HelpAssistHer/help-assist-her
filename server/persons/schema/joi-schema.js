'use strict'

const Joi = require('joi')
const phoneValidator = require('joi-phone-validator')

const personSchemaJoi = Joi.object().keys({
	__v: Joi.number().min(0),
	_id: Joi.string(),
	createdAt: Joi.date().iso(),
	email: Joi.string().email(),
	firstName: Joi.string(),
	lastName: Joi.string(),
	phone: phoneValidator.phone().validate(),
	updatedAt: Joi.date().iso()
})

module.exports = personSchemaJoi

