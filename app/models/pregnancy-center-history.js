'use strict'

const mongoose = require('mongoose')

const pregnancyCenterHistorySchema = mongoose.Schema({
    pregnancyCenterId: mongoose.Schema.Types.ObjectId,
    dateCreated: Date,
    changes: mongoose.Schema.Types.Mixed,
    userId: mongoose.Schema.Types.ObjectId,
})

// create model using the schema
const PregnancyCenterHistoryModel = mongoose.model('PregnancyCenterHistory', pregnancyCenterHistorySchema)

// make available
module.exports = PregnancyCenterHistoryModel
