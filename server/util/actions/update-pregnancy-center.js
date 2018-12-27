'use strict'
const Log = require('log')
const log = new Log('info')
const R = require('ramda')
const pregnancyCenterSchemaJoi = require('../../pregnancy-centers/schema/joi-schema')
const PregnancyCenterModel = require('../../pregnancy-centers/schema/mongoose-schema')
const { validateAndFillDoc, geocode, checkIfOutOfBusiness } = require('../util')

const { pipeP } = require('ramda-util')

const {
	createPregnancyCenterUpdateHistory,
	getPregnancyCenterObj,
	pregnancyCenterFindByIdAndUpdate,
	makeModelAndPopulate,
	populatePrimaryContact,
} = require('pregnancy-center-helpers')

const updatePregnancyCenter = async (
	userId,
	pregnancyCenterId,
	pregnancyCenterObj,
) => {
	const validate = R.partial(validateAndFillDoc, [
		PregnancyCenterModel,
		pregnancyCenterSchemaJoi,
		userId,
	])

	const checkIfPCOutOfBusiness = R.partial(checkIfOutOfBusiness, [
		pregnancyCenterId,
	])
	const createUpdateHistory = R.partial(createPregnancyCenterUpdateHistory, [
		userId,
		getPregnancyCenterObj(pregnancyCenterId),
	])
	const updatePregnancyCenter = R.partial(pregnancyCenterFindByIdAndUpdate, [
		pregnancyCenterId,
	])

	const updateAndSavePregnancyCenter = pipeP(
		validate,
		checkIfPCOutOfBusiness,
		geocode,
		makeModelAndPopulate,
		createUpdateHistory, // side effect of saving history records to the database
		updatePregnancyCenter,
		populatePrimaryContact,
	)

	return updateAndSavePregnancyCenter(pregnancyCenterObj)
}

module.exports = { updatePregnancyCenter }
