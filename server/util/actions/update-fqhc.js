'use strict'
const R = require('ramda')
const fqhcSchemaJoi = require('../../schema/fqhc')
const {
	validateAndFillDoc,
	geocode,
	checkIfOutOfBusiness,
	findByIdAndUpdate,
	createHistories,
	createUpdatedField,
} = require('../util')

const FQHCModel = require('../../models/fqhc')
const FQHCHistoryModel = require('../../models/fqhc-history')
const getFqhcObj = async (fqhcId) => {
	const doc = await FQHCModel.findById(fqhcId)
	return doc.toObject()
}

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
