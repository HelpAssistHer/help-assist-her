'use strict'

const mongoose = require('mongoose')
const _ = require('lodash')

const pointSchema = new mongoose.Schema({
	type: {type: String},
	coordinates: [Number]
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

const pregnancyCenterSchema = mongoose.Schema({
	address: addressSchema,
	email: String,
	hours: Object,
	name: String, // change to PRC name
	notes: String,
	phone: String,
	primaryContact: mongoose.Schema.Types.ObjectId,  // a user
	queryableHours: Object,
	services: [{
		type:String,
		enum: [
			'PREGNANCY_TEST',
			'ULTRASOUND',
			'MATERIAL_ASSISTANCE',
			'POST_ABORTION_HEALING',
			'PARENTING_CLASSES',
			'STD_TESTING',
			'COUNSELING'
		]
	}],
	verified: {
		address: {
			date: Date,
			userId: mongoose.Schema.Types.ObjectId
		},
		email: {
			date: Date,
			userId: mongoose.Schema.Types.ObjectId
		},
		hours: {
			date: Date,
			userId: mongoose.Schema.Types.ObjectId
		},
		name: {
			date: Date,
			userId: mongoose.Schema.Types.ObjectId
		},
		notes: {
			date: Date,
			userId: mongoose.Schema.Types.ObjectId
		},
		phone: {
			date: Date,
			userId: mongoose.Schema.Types.ObjectId
		},
		primaryContact: {
			date: Date,
			userId: mongoose.Schema.Types.ObjectId
		},
		resources: {
			date: Date,
			userId: mongoose.Schema.Types.ObjectId
		},
		website: {
			date: Date,
			userId: mongoose.Schema.Types.ObjectId
		},
	},
	updated: {
		address: {
			date: Date,
			userId: mongoose.Schema.Types.ObjectId
		},
		email: {
			date: Date,
			userId: mongoose.Schema.Types.ObjectId
		},
		hours: {
			date: Date,
			userId: mongoose.Schema.Types.ObjectId
		},
		name: {
			date: Date,
			userId: mongoose.Schema.Types.ObjectId
		},
		notes: {
			date: Date,
			userId: mongoose.Schema.Types.ObjectId
		},
		phone: {
			date: Date,
			userId: mongoose.Schema.Types.ObjectId
		},
		primaryContact: {
			date: Date,
			userId: mongoose.Schema.Types.ObjectId
		},
		resources: {
			date: Date,
			userId: mongoose.Schema.Types.ObjectId
		},
		website: {
			date: Date,
			userId: mongoose.Schema.Types.ObjectId
		},
	},
	website: String,
}, {
	timestamps: true, // createdAt and updatedAt are automatically added
})

pregnancyCenterSchema.index({'address.location': '2dsphere'})

pregnancyCenterSchema.methods.getFullAddress = function getFullAddress() {
	return _.get(this, 'address.line1', '') + _.get(this, 'address.line2', '')
		+ _.get(this, 'address.city', '') + _.get(this, 'address.state', '')
		+ _.get(this, 'address.zip', '')
}

// Immediately after an update to a pregnancyCenter, this is triggered.
// It records the changes in a new PregnancyCenterHistory

// pregnancyCenterSchema.post('update', function(next) {
//     let changes = this._update.$set
//     PregnancyCenterHistoryModel.create({
//             pregnancyCenterId: this._conditions._id,
//             dateCreated : new Date(),
//             changes: changes
//     }, function (err, hist) {
//         if (err) console.log(err)
//         // saved!
//     })
//     // userId TODO
// })

// create model using the schema
const PregnancyCenterModel = mongoose.model('PregnancyCenters', pregnancyCenterSchema)

// make available
module.exports = PregnancyCenterModel
