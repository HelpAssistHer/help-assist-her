'use strict'

const Joi = require('joi')
const phoneValidator = require('joi-phone-validator')

const pointSchemaJoi = Joi.object().keys({
	_id: Joi.string(),
	type: Joi.string().valid('Point').required(),
	coordinates: Joi.array().ordered(
		Joi.number().max(-66).min(-128).required(), // general continental US longitude parameters
		Joi.number().min(23).max(50).required() // general continental US latitude parameters, to keep from accidently switching lat, lng
	).min(2).max(2)
})

const addressSchemaJoi = Joi.object().keys({
	_id: Joi.string(),
	city: Joi.string(),
	googlePlaceId: Joi.string(), // we can store the google place ID according to TOS
	line1: Joi.string(),
	line2: Joi.string(),
	location: pointSchemaJoi,
	state: Joi.string(),
	zip: Joi.string(),
})

const queryableDayHoursSchemaJoi = Joi.object().keys({
	open: Joi.number().min(0).max(60 * 60 * 24), // number of seconds since 00:00:00
	close: Joi.number().min(0).max(60 * 60 * 24) // number of seconds since 00:00:00
})

const queryableHoursSchemaJoi = Joi.object().keys({ // ISO day of the week with 1 being Monday and 7 being Sunday.
	1: Joi.array().items(queryableDayHoursSchemaJoi),
	2: Joi.array().items(queryableDayHoursSchemaJoi),
	3: Joi.array().items(queryableDayHoursSchemaJoi),
	4: Joi.array().items(queryableDayHoursSchemaJoi),
	5: Joi.array().items(queryableDayHoursSchemaJoi),
	6: Joi.array().items(queryableDayHoursSchemaJoi),
	7: Joi.array().items(queryableDayHoursSchemaJoi)
})

const readableDayHoursSchemaJoi = Joi.object().keys({
	open: Joi.string(),
	close: Joi.string()
})

const readableHoursSchemaJoi = Joi.object().keys({
	mon: Joi.array().items(readableDayHoursSchemaJoi),
	tue: Joi.array().items(readableDayHoursSchemaJoi),
	wed: Joi.array().items(readableDayHoursSchemaJoi),
	thurs: Joi.array().items(readableDayHoursSchemaJoi),
	fri: Joi.array().items(readableDayHoursSchemaJoi),
	sat: Joi.array().items(readableDayHoursSchemaJoi),
	sun: Joi.array().items(readableDayHoursSchemaJoi)
})

const dateUserActionSchemaJoi = Joi.object().keys({
	date: Joi.date().iso(),
	userId: Joi.string()
})

const pregnancyCenterSchemaJoi = Joi.object().keys({
	__v: Joi.number().min(0),
	_id: Joi.string(),
	address: addressSchemaJoi,
	createdAt: Joi.date().iso(),
	dateCreated: Joi.date().iso(),
	email: Joi.string().email(),
	hours: readableHoursSchemaJoi,
	name: Joi.string(), // change to PRC name
	notes: Joi.string(),
	phone: phoneValidator.phone().validate(),
	primaryContact: Joi.string(),
	services: Joi.array().items(Joi.string().valid(
		'PREGNANCY_TEST',
		'ULTRASOUND',
		'MATERIAL_ASSISTANCE',
		'POST_ABORTION_HEALING',
		'PARENTING_CLASSES',
		'STD_TESTING',
		'COUNSELING'
	)),
	queryableHours: queryableHoursSchemaJoi,
	verified: {
		address: dateUserActionSchemaJoi,
		email: dateUserActionSchemaJoi,
		hours: dateUserActionSchemaJoi,
		name: dateUserActionSchemaJoi,
		notes: dateUserActionSchemaJoi,
		phone: dateUserActionSchemaJoi,
		primaryContact: dateUserActionSchemaJoi,
		resources: dateUserActionSchemaJoi,
		website: dateUserActionSchemaJoi
	},
	updated: {
		address: dateUserActionSchemaJoi,
		email: dateUserActionSchemaJoi,
		hours: dateUserActionSchemaJoi,
		name: dateUserActionSchemaJoi,
		notes: dateUserActionSchemaJoi,
		phone: dateUserActionSchemaJoi,
		primaryContact: dateUserActionSchemaJoi,
		resources: dateUserActionSchemaJoi,
		website: dateUserActionSchemaJoi
	},
	updatedAt: Joi.date().iso(),
	website: Joi.string()
})

module.exports = pregnancyCenterSchemaJoi

