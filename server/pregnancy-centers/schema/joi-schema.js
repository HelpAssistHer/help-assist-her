'use strict'

const Joi = require('joi')
const phoneValidator = require('joi-phone-validator')

const personSchemaJoi = require('../../persons/schema/joi-schema')

const pointSchemaJoi = Joi.object().keys({
	_id: Joi.string(),
	type: Joi.string().valid('Point').required(),
	coordinates: Joi.array().ordered(
		Joi.number().max(-66).min(-128).required(), // general continental US longitude parameters
		Joi.number().min(23).max(50).required() 	// general continental US latitude parameters, to keep
													// from accidentally switching lat, lng
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

const dayHoursSchemaJoi = Joi.object().keys({
	open: Joi.number().min(0).max(2359), // corresponds to 00:00 to 23:59 24-hour hhmm format.
	close: Joi.number().min(0).max(2359) // corresponds to 00:00 to 23:59 24-hour hhmm format.
})

// key: a number from 0–6, corresponding to the days of the week, starting on Sunday. For example, 2 means Tuesday.
// values: an object with 'open' and 'close' keys with values of a time of day in 24-hour hhmm format.
// Values are in the range 0000–2359. The time will be reported in the place’s time zone
// as much as possible, we are matching Google's Business hours https://developers.google.com/places/web-service/details

const hoursSchemaJoi = Joi.object().keys({ // day of the week with 0 being Sunday.
	0: Joi.array().items(dayHoursSchemaJoi),
	1: Joi.array().items(dayHoursSchemaJoi),
	2: Joi.array().items(dayHoursSchemaJoi),
	3: Joi.array().items(dayHoursSchemaJoi),
	4: Joi.array().items(dayHoursSchemaJoi),
	5: Joi.array().items(dayHoursSchemaJoi),
	6: Joi.array().items(dayHoursSchemaJoi)
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
	email: Joi.string().email(),
	hours: hoursSchemaJoi,
	prcName: Joi.string(),
	notes: Joi.string(),
	phone: phoneValidator.phone().validate(),
	primaryContactPerson: personSchemaJoi,
	services: {
		pregnancyTest: Joi.boolean(),
		ultrasound: Joi.boolean(),
		materialAssistance: Joi.boolean(),
		postAbortionHealing: Joi.boolean(),
		parentingClasses: Joi.boolean(),
		stdTesting: Joi.boolean(),
		professionalCounseling: Joi.boolean(),
		other: Joi.boolean()
	},
	verified: {
		address: dateUserActionSchemaJoi,
		email: dateUserActionSchemaJoi,
		hours: dateUserActionSchemaJoi,
		prcName: dateUserActionSchemaJoi,
		phone: dateUserActionSchemaJoi,
		primaryContact: dateUserActionSchemaJoi,
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
		primaryContact: dateUserActionSchemaJoi,
		services: dateUserActionSchemaJoi,
		website: dateUserActionSchemaJoi
	},
	updatedAt: Joi.date().iso(),
	website: Joi.string()
})

module.exports = pregnancyCenterSchemaJoi

