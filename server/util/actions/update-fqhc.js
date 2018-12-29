'use strict'
const R = require('ramda')
const fqhcSchemaJoi = require('../../fqhcs/schema/joi-schema')
const {
	validateAndFillDoc,
	geocode,
	checkIfOutOfBusiness,
	findByIdAndUpdate,
	createHistories,
	createUpdatedField,
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
	const createFqhcHistories = R.partial(createHistories, [
		FQHCHistoryModel,
		'fqhcId',
		userId,
		fqhcId,
		oldDoc,
	])

	const createFqhcUpdatedField = R.partial(createUpdatedField, [userId, oldDoc])

	const updateFqhc = R.partial(findByIdAndUpdate, [FQHCModel, fqhcId])

	const updateAndSaveFqhc = pipeP([
		validate,
		checkIfFqhcOutOfBusiness,
		geocode,
		createFqhcHistories, // side effect of saving history records to the database
		createFqhcUpdatedField,
		updateFqhc,
	])

	return updateAndSaveFqhc(fqhcObj)
}

module.exports = updateFqhc
