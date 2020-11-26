'use strict'

const R = require('ramda')
const pregnancyCenterSchemaJoi = require('../../schema/pregnancy-center')
const PregnancyCenterModel = require('../../models/pregnancy-center')
const PregnancyCenterHistoryModel = require('../../models/pregnancy-center-history')
const {
	validateAndFillDoc,
	geocode,
	checkIfOutOfBusiness,
	createHistories,
	createUpdatedField,
} = require('../util')

const { pipeP } = require('../ramda-util')

const {
	getPregnancyCenterObj,
	pregnancyCenterFindByIdAndUpdate,
	makeModelAndPopulate,
	populatePrimaryContact,
} = require('../pregnancy-center-helpers')

const updatePregnancyCenter = async (
	userId,
	pregnancyCenterId,
	pregnancyCenterObj,
) => {
	const oldDoc = await getPregnancyCenterObj(pregnancyCenterId)

	const validate = R.partial(validateAndFillDoc, [
		PregnancyCenterModel,
		pregnancyCenterSchemaJoi,
		userId,
	])

	const checkIfPCOutOfBusiness = R.partial(checkIfOutOfBusiness, [
		getPregnancyCenterObj,
		pregnancyCenterId,
		oldDoc,
	])
	const createPCHistories = R.partial(createHistories, [
		PregnancyCenterHistoryModel,
		'pregnancyCenterId',
		userId,
		pregnancyCenterId,
		oldDoc,
	])

	const createPCUpdatedField = R.partial(createUpdatedField, [userId, oldDoc])

	const updatePC = R.partial(pregnancyCenterFindByIdAndUpdate, [
		pregnancyCenterId,
	])

	return pipeP([
		validate,
		checkIfPCOutOfBusiness,
		geocode,
		makeModelAndPopulate,
		createPCHistories, // side effect of saving history records to the database
		createPCUpdatedField,
		updatePC,
		populatePrimaryContact,
	])(pregnancyCenterObj)
}

module.exports = updatePregnancyCenter
