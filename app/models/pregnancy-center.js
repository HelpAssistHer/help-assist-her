'use strict'

const mongoose = require('mongoose')
const PregnancyCenterHistoryModel = require('./pregnancy-center-history')


const pointSchema = new mongoose.Schema({
    type: { type: String },
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


// Hours Example:
// hours : {
    // "mon": {
    //     "open": "9:00",
    //         "close": "18:00"
    // },
    // "tue": {
    //     "open": "9:00",
    //         "close": "17:30"
    // },
    // "wed": {
    //     "open": "9:00",
    //         "close": "18:00"
    // },
    // "thurs": [
    //     {
    //         "open": "9:00",
    //         "close": "12:00"
    //     },
    //     {
    //         "open": "13:00",
    //         "close": "18:00"
    //     }
    // ]
// },

const pregnancyCenterSchema = mongoose.Schema({
    address: addressSchema,
    dateCreated: Date,
    hours: Object,
    name: String, // change to PRC name
    notes: String,
    phone: String,
    primaryContact: {
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
    },
    resources: [String],
    verified: {
        address: {
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
})

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

