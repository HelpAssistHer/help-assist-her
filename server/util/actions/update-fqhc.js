'use strict'
const R = require('ramda')
const fqhcSchemaJoi = require('../../fqhcs/schema/joi-schema')
const { validateAndFillDoc, geocode, checkIfOutOfBusiness } = require('../util')

const FQHCModel = require('../../fqhcs/schema/mongoose-schema')

const {
	getFqhcObj,
	createFqhcUpdateHistory,
	fqhcFindByIdAndUpdate,
} = require('../fqhc-helpers')

const updateFqhc = async (userId, fqhcId, fqhcObj) => {
	const validate = R.partial(validateAndFillDoc, [
		FQHCModel,
		fqhcSchemaJoi,
		userId,
	])
	const checkIfFqhcOutOfBusiness = R.partial(checkIfOutOfBusiness, [
		getFqhcObj,
		fqhcId,
	])
	const createUpdateHistory = R.partial(createFqhcUpdateHistory, [
		userId,
		getFqhcObj(fqhcId),
	])
	const updateFqhc = R.partial(fqhcFindByIdAndUpdate, [fqhcId])

	const updateAndSaveFqhc = R.pipeP(
		validate,
		checkIfFqhcOutOfBusiness,
		geocode,
		createUpdateHistory, // side effect of saving update records to the database
		updateFqhc,
	)

	return updateAndSaveFqhc(fqhcObj)
}

module.exports = updateFqhc
