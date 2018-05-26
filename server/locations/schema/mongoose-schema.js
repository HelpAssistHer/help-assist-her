'use strict'

const _ = require('lodash')
const mongoose = require('mongoose')

const pointSchema = new mongoose.Schema({
	type: { type: String },
	coordinates: [Number],
})

const addressSchema = new mongoose.Schema({
	city: String,
	googlePlaceId: String, // we can store the google place ID according to TOS
	line1: String,
	line2: String,
	location: pointSchema,
	state: String,
	zip: String,
})

const userDateSchema = new mongoose.Schema({
	date: Date,
	userId: mongoose.Schema.Types.ObjectId,
	verified: Boolean,
})

function getFullAddress() {
	return (
		_.get(this, 'address.line1', '') +
		' ' +
		_.get(this, 'address.line2', '') +
		' ' +
		_.get(this, 'address.city', '') +
		' ' +
		_.get(this, 'address.state', '') +
		' ' +
		_.get(this, 'address.zip', '')
	)
}

module.exports = { pointSchema, addressSchema, userDateSchema, getFullAddress }
