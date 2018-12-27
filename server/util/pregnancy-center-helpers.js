'use strict'

const _ = require('lodash')
const R = require('ramda')
const PregnancyCenterModel = require('../../pregnancy-centers/schema/mongoose-schema')
const PregnancyCenterHistoryModel = require('../../pregnancy-center-history/schema/mongoose-schema')
const { createHistories, findByIdAndUpdate } = require('util')

const makeModelAndPopulate = obj => {
	_.omit(
		new PregnancyCenterModel(obj).populate('primaryContactPerson').toObject(),
		['_id'],
	)
}
const populatePrimaryContact = pregnancyCenterMongooseObj => {
	return PregnancyCenterModel.populate(
		pregnancyCenterMongooseObj,
		'primaryContactPerson',
	)
}

const getPregnancyCenterObj = id => PregnancyCenterModel.findById(id)

const createPregnancyCenterUpdateHistory = userId =>
	R.partial(createHistories, [
		userId,
		PregnancyCenterHistoryModel,
		'pregnancyCenterId',
	])

const pregnancyCenterFindByIdAndUpdate = R.partial(findByIdAndUpdate, [
	PregnancyCenterModel,
])

module.exports = {
	makeModelAndPopulate,
	populatePrimaryContact,
	getPregnancyCenterObj,
	createPregnancyCenterUpdateHistory,
	pregnancyCenterFindByIdAndUpdate,
}
