'use strict'

const mongoose = require('mongoose');

const pregnancyCenterSchema = mongoose.Schema({
    name: String,
    address: String,
    phone: String,
    website: String,
    location: { lat: Number, lng: Number },
    place_id: String,
    tmp_google: {
        name: String,
        types:  [String]
    }

})

// create model using the schema
const PregnancyCenterModel = mongoose.model('PregnancyCenters', pregnancyCenterSchema)

// make available
module.exports = PregnancyCenterModel

