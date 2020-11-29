'use strict'

const Joi = require('@hapi/joi')
const isObjectId = require('../../util/is-object-id')

const personSchemaJoi = Joi.object().keys({
	__v: Joi.number().min(0),
	_id: Joi.any().custom(isObjectId).allow(null),
	createdAt: Joi.date().iso(),
	email: Joi.string().email(),
	firstName: Joi.string(),
	lastName: Joi.string(),
	phone: Joi.string()
		.trim()
		.regex(/\+1([2-9][0-8][0-9])([2-9][0-9]{2})([0-9]{4})/),
	updatedAt: Joi.date().iso(),
})

module.exports = personSchemaJoi
