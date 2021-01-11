'use strict'

const mongoose = require('mongoose')

const pregnancyCenterHistorySchema = mongoose.Schema(
	{
		pregnancyCenterId: mongoose.Schema.Types.ObjectId,
		field: String,
		newValue: mongoose.Schema.Types.Mixed,
		oldValue: mongoose.Schema.Types.Mixed,
		userId: mongoose.Schema.Types.ObjectId,
	},
	{
		timestamps: true, // createdAt and updatedAt are automatically added
	},
)

// create model using the schema
const PregnancyCenterHistoryModel = mongoose.model(
	'PregnancyCenterHistory',
	pregnancyCenterHistorySchema,
)

// make available
module.exports = PregnancyCenterHistoryModel
