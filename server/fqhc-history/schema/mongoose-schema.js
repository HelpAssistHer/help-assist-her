'use strict'

const mongoose = require('mongoose')

const fqhcHistorySchema = mongoose.Schema({
	fqhcId: mongoose.Schema.Types.ObjectId,
	field: String,
	newValue: mongoose.Schema.Types.Mixed,
	oldValue: mongoose.Schema.Types.Mixed,
	userId: mongoose.Schema.Types.ObjectId,
}, {
	timestamps: true, // createdAt and updatedAt are automatically added
})

// create model using the schema
const FQHCHistoryModel = mongoose.model('FQHCHistory', fqhcHistorySchema)

// make available
module.exports = FQHCHistoryModel
