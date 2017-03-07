'use strict'

const mongoose = require('mongoose')
const PregnancyCenterHistoryModel = require('./pregnancy-center-history')


const pointSchema = new mongoose.Schema({
    type: { type: String },
    coordinates: [Number]
});

const pregnancyCenterSchema = mongoose.Schema({
    name: String,
    address: String,
    hours: Object,
    phone: String,
    website: String,
    resources: [String],
    notes: String,
    dateNameUpdated: Date,
    dateAddressUpdated: Date,
    datePhoneUpdated: Date,
    dateWebsiteUpdated: Date,
    dateHoursUpdated: Date,
    dateCreated: Date,
    verifiedById: Number,
    dateVerified: Date,
    location: pointSchema,
    dateLocationUpdated: Date,
    googlePlaceId: String, // we can store the google place ID according to TOS
})

pregnancyCenterSchema.post('update', function(next) {
    let changes = this._update.$set
    console.log('post update')
    console.log(changes)
    PregnancyCenterHistoryModel.create({
            pregnancyCenterId: this._conditions._id,
            dateCreated : new Date(),
            changes: changes
    }, function (err, hist) {
        if (err) console.log(err)
        // saved!
    })
    // userId TODO
})

// create model using the schema
const PregnancyCenterModel = mongoose.model('PregnancyCenters', pregnancyCenterSchema)

// make available
module.exports = PregnancyCenterModel

