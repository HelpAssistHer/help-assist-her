'use strict'

const Joi = require('@hapi/joi')
const isObjectId = require('../util/is-object-id')

const pointSchemaJoi = Joi.object().keys({
	_id: Joi.any().custom(isObjectId).allow(null),
	type: Joi.string().valid('Point').required(),
	coordinates: Joi.array()
		.ordered(
			Joi.number().max(-66).min(-128).required(), // general continental US longitude parameters
			Joi.number().min(23).max(50).required(), // general continental US latitude parameters, to keep
			// from accidentally switching lat, lng
		)
		.min(2)
		.max(2),
})

const addressSchemaJoi = Joi.object().keys({
	_id: Joi.any().custom(isObjectId).allow(null),
	city: Joi.string(),
	googlePlaceId: Joi.string(), // we can store the google place ID according to TOS
	line1: Joi.string(),
	line2: Joi.string().allow(''),
	location: pointSchemaJoi,
	state: Joi.string(),
	zip: Joi.string(),
})

const dayHoursSchemaJoi = Joi.object().keys({
	open: Joi.number().min(0).max(2359).allow(null), // corresponds to 00:00 to 23:59 24-hour hhmm format.
	close: Joi.number().min(0).max(2359).allow(null), // corresponds to 00:00 to 23:59 24-hour hhmm format.
	closedAllDay: Joi.boolean().allow(null),
})

// key: a number from 0–6, corresponding to the days of the week, starting on Sunday. For example, 2 means Tuesday.
// values: an object with 'open' and 'close' keys with values of a time of day in 24-hour hhmm format.
// Values are in the range 0000–2359. The time will be reported in the place’s time zone
// as much as possible, we are matching Google's Business hours https://developers.google.com/places/web-service/details

const hoursSchemaJoi = Joi.object().keys({
	// day of the week with 0 being Sunday.
	0: dayHoursSchemaJoi,
	1: dayHoursSchemaJoi,
	2: dayHoursSchemaJoi,
	3: dayHoursSchemaJoi,
	4: dayHoursSchemaJoi,
	5: dayHoursSchemaJoi,
	6: dayHoursSchemaJoi,
})

const dateUserActionSchemaJoi = Joi.object().keys({
	_id: Joi.any().custom(isObjectId).allow(null),
	date: Joi.date().iso(),
	userId: Joi.any().custom(isObjectId).allow(null),
	verified: Joi.boolean().default(false),
})

const outOfBusinessSchemaJoi = Joi.object().keys({
	outOfBusiness: Joi.boolean(),
})

const doNotListSchemaJoi = Joi.object().keys({
	doNotList: Joi.boolean(),
})

module.exports = {
	pointSchemaJoi,
	addressSchemaJoi,
	dayHoursSchemaJoi,
	hoursSchemaJoi,
	dateUserActionSchemaJoi,
	outOfBusinessSchemaJoi,
	doNotListSchemaJoi,
}
