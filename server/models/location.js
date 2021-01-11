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
	if (!this.address) return ''
	const getProperty = (property) => this.address?.[property]

	return [
		getProperty('line1'),
		getProperty('line2'),
		getProperty('city'),
		getProperty('state'),
		getProperty('zip'),
	]
		.filter(Boolean)
		.join(' ')
}

module.exports = { pointSchema, addressSchema, userDateSchema, getFullAddress }
