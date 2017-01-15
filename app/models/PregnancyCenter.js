'use strict'

const mongoose = require('mongoose');

const pregnancyCenterSchema = mongoose.Schema({
    name: String,
    address: String,
    phone: String,
    website: String
})

// create model using the schema
const PregnancyCenterModel = mongoose.model('PregnancyCenters', pregnancyCenterSchema)

// make available
module.exports = PregnancyCenterModel

