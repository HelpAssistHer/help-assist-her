'use strict'
const Log = require('log')
const log = new Log('info')
const _ = require('lodash')
const R = require('ramda')
const PregnancyCenterModel = require('../pregnancy-centers/schema/mongoose-schema')
const PregnancyCenterHistoryModel = require('../pregnancy-center-history/schema/mongoose-schema')
const { createHistories, findByIdAndUpdate } = require('./util')

const makeModelAndPopulate = obj => {
	return _.omit(
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

const createPregnancyCenterUpdateHistory = R.partial(createHistories, [
	PregnancyCenterHistoryModel,
	'pregnancyCenterId',
])

log.info(typeof findByIdAndUpdate)

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
