'use strict'

const Joi = require('joi')
const phoneValidator = require('joi-phone-validator')

const pointSchemaJoi = Joi.object().keys({
	type: Joi.string().valid('Point').required(),
	coordinates: Joi.array().ordered(
		Joi.number().max(-66).min(-128).required(), // general continental US longitude parameters
		Joi.number().min(23).max(50).required() // general continental US latitude parameters, to keep from accidently switching lat, lng
	).min(2).max(2)
})

const addressSchemaJoi = Joi.object().keys({
	city: Joi.string(),
	googlePlaceId: Joi.string(), // we can store the google place ID according to TOS
	line1: Joi.string(),
	line2: Joi.string(),
	location: pointSchemaJoi,
	state: Joi.string(),
	zip: Joi.string(),
})

const queryableDayHoursSchemaJoi = Joi.object().keys({
	open: Joi.number().min(0).max(86400), // number of seconds since 00:00:00
	close: Joi.number().min(0).max(86400) // number of seconds since 00:00:00
})

const queryableHoursSchemaJoi = Joi.object().keys({
	0: Joi.array().items(queryableDayHoursSchemaJoi),
	1: Joi.array().items(queryableDayHoursSchemaJoi),
	2: Joi.array().items(queryableDayHoursSchemaJoi),
	3: Joi.array().items(queryableDayHoursSchemaJoi),
	4: Joi.array().items(queryableDayHoursSchemaJoi),
	5: Joi.array().items(queryableDayHoursSchemaJoi),
	6: Joi.array().items(queryableDayHoursSchemaJoi)
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
	address: addressSchemaJoi,
	dateCreated: Joi.date().iso(),
	email: Joi.string().email(),
	hours: readableHoursSchemaJoi,
	queryableHours: queryableHoursSchemaJoi,
	name: Joi.string(), // change to PRC name
	notes: Joi.string(),
	phone: phoneValidator.phone().validate(),
	primaryContact: {
		firstName: Joi.string(),
		lastName: Joi.string(),
		email: Joi.string().email(),
		phone: phoneValidator.phone().validate(),
	},
	resources: Joi.array().items(Joi.string().valid(
		'Medical Quality Pregnancy Test',
		'Ultrasound',
		'Material Assistance',
		'Post-Abortion Healing',
		'Parenting Classes',
		'STD Testing',
		'Counseling'
	)),
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
	website: Joi.string()
})


module.exports = pregnancyCenterSchemaJoi