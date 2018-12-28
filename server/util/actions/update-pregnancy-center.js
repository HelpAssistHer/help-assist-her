'use strict'

const Log = require('log')
const log = new Log('info')
const R = require('ramda')
const pregnancyCenterSchemaJoi = require('../../pregnancy-centers/schema/joi-schema')
const PregnancyCenterModel = require('../../pregnancy-centers/schema/mongoose-schema')
const PregnancyCenterHistoryModel = require('../../pregnancy-center-history/schema/mongoose-schema')
const {
	validateAndFillDoc,
	geocode,
	checkIfOutOfBusiness,
	createHistories,
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
	Object.freeze(pregnancyCenterObj)

	const validate = R.partial(validateAndFillDoc, [
		PregnancyCenterModel,
		pregnancyCenterSchemaJoi,
		userId,
	])

	const checkIfPCOutOfBusiness = R.partial(checkIfOutOfBusiness, [
		getPregnancyCenterObj,
		pregnancyCenterId,
	])
	const createUpdateHistory = R.partial(createHistories, [
		PregnancyCenterHistoryModel,
		'pregnancyCenterId',
		userId,
		getPregnancyCenterObj(pregnancyCenterId),
	])
	const updatePC = R.partial(pregnancyCenterFindByIdAndUpdate, [
		pregnancyCenterId,
	])

	const x = await validate(pregnancyCenterObj)
	log.info('validatedObj', x)
	const checked = await checkIfPCOutOfBusiness(x)
	log.info('checked', checked)
	const geocoded = await geocode(checked)
	log.info('geocoded', geocoded)
	const a = await makeModelAndPopulate(geocoded)
	log.info('a ', a)
	const b = await createUpdateHistory(a)
	log.info('b ', b)
	const c = await updatePC(b)
	log.info('c ', c)
	const d = await populatePrimaryContact(c)
	log.info('d ', d)
	return d

	// const updateAndSavePregnancyCenter = pipeP(
	// 	validate,
	// 	checkIfPCOutOfBusiness,
	// 	geocode,
	// 	makeModelAndPopulate,
	// 	createUpdateHistory, // side effect of saving history records to the database
	// 	updatePC,
	// 	populatePrimaryContact,
	// )

	// return updateAndSavePregnancyCenter(pregnancyCenterObj)
}

module.exports = updatePregnancyCenter
