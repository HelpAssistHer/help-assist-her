'use strict'

const FQHCModel = require('../fqhcs/schema/mongoose-schema')
const R = require('ramda')
const FQHCHistoryModel = require('../fqhc-history/schema/mongoose-schema')

const { createHistories, findByIdAndUpdate } = require('./util')

const getFqhcObj = fqhcId => FQHCModel.findById(fqhcId)

const createFqhcUpdateHistory = userId =>
	R.partial(createHistories, [userId, FQHCHistoryModel, 'fqhcId'])

const fqhcFindByIdAndUpdate = R.partial(findByIdAndUpdate, [FQHCModel])

module.exports = {
	getFqhcObj,
	createFqhcUpdateHistory,
	fqhcFindByIdAndUpdate,
}
