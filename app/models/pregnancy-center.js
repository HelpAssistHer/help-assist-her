'use strict'

const mongoose = require('mongoose');
const PregnancyCenterHistoryModel = require('./pregnancy-center-history');

const pregnancyCenterSchema = mongoose.Schema({
    name: String,
    address: String,
    hours: String,
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
    location: {  // naming scheme matches MongoDB GeoJSON Point examples
        coordinates: [Number, Number], // lng, lat
        type: String, // type should always be 'Point'
    },
    dateLocationUpdated: Date,
    google_place_id: String, // we can store the google place ID according to TOS
})

pregnancyCenterSchema.post('update', function(next) {
    let changes = this._update.$set
    console.log('post update')
    console.log(changes)
    PregnancyCenterHistoryModel.create({ pregnancyCenterId: this._conditions._id, dateCreated : new Date(), changes: changes}, function (err, hist) {
        if (err) console.log(err)
        // saved!
    })
    // userId TODO
});


// create model using the schema
const PregnancyCenterModel = mongoose.model('PregnancyCenters', pregnancyCenterSchema)

// make available
module.exports = PregnancyCenterModel

