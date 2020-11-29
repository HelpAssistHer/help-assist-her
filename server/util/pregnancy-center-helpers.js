'use strict'
const _ = require('lodash')
const R = require('ramda')
const PregnancyCenterModel = require('../pregnancy-centers/schema/mongoose-schema')
const PregnancyCenterHistoryModel = require('../pregnancy-center-history/schema/mongoose-schema')
const { createHistories, findByIdAndUpdate } = require('./util')

const makeModelAndPopulate = (obj) => {
	return _.omit(
		new PregnancyCenterModel(obj).populate('primaryContactPerson').toObject(),
		['_id'],
	)
}
const populatePrimaryContact = (pregnancyCenterMongooseObj) => {
	return PregnancyCenterModel.populate(pregnancyCenterMongooseObj, {
		path: 'primaryContactPerson',
	})
}

const getPregnancyCenterObj = async (id) => {
	const pregnancyCenter = await PregnancyCenterModel.findById(id)
	return pregnancyCenter.toObject()
}

const createPregnancyCenterUpdateHistory = R.partial(createHistories, [
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
