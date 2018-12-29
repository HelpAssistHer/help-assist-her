'use strict'
const R = require('ramda')
const fqhcSchemaJoi = require('../../fqhcs/schema/joi-schema')
const {
	validateAndFillDoc,
	geocode,
	checkIfOutOfBusiness,
	findByIdAndUpdate,
	createHistories,
} = require('../util')

const FQHCModel = require('../../fqhcs/schema/mongoose-schema')
const FQHCHistoryModel = require('../../fqhc-history/schema/mongoose-schema')
const getFqhcObj = fqhcId => FQHCModel.findById(fqhcId)

const { pipeP } = require('../ramda-util')

const updateFqhc = async (userId, fqhcId, fqhcObj) => {
	const oldDoc = await getFqhcObj(fqhcId)
	const validate = R.partial(validateAndFillDoc, [
		FQHCModel,
		fqhcSchemaJoi,
		userId,
	])
	const checkIfFqhcOutOfBusiness = R.partial(checkIfOutOfBusiness, [
		getFqhcObj,
		fqhcId,
		oldDoc,
	])
	const createUpdateHistory = R.partial(createHistories, [
		FQHCHistoryModel,
		'fqhcId',
		userId,
		fqhcId,
		oldDoc,
	])
	const updateFqhc = R.partial(findByIdAndUpdate, [FQHCModel, fqhcId])

	const updateAndSaveFqhc = pipeP([
		validate,
		checkIfFqhcOutOfBusiness,
		geocode,
		createUpdateHistory, // side effect of saving update records to the database
		updateFqhc,
	])

	return updateAndSaveFqhc(fqhcObj)
}

module.exports = updateFqhc
