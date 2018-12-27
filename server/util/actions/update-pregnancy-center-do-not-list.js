'use strict'

const locationSchemaJoi = require('../locations/schema/joi-schema')
const PregnancyCenterModel = require('../pregnancy-centers/schema/mongoose-schema')

const {
	validateDocument,
	findByIdAndUpdate,
	populatePrimaryContact,
} = require('../util')

const {
	getPregnancyCenterObj,
	createPregnancyCenterHistory,
} = require('../pregnancy-center-helpers')

const updatePregnancyCenterDoNotList = async (
	userId,
	pregnancyCenterId,
	doNotListObj,
) => {
	// validate doNotListObj as true or false
	const validatedDoNotListObj = await validateDocument(
		locationSchemaJoi.doNotListSchemaJoi,
		doNotListObj,
	)
	const newValue = validatedDoNotListObj.doNotList

	// get pregnancyCenter to get oldValue
	const oldPregnancyCenterObj = await getPregnancyCenterObj(pregnancyCenterId)
	const oldValue = oldPregnancyCenterObj.doNotList

	// if no change, return early with the current pregnancyCenter obj
	if (oldValue === newValue) {
		return oldPregnancyCenterObj
	}

	const newPregnancyCenterObj = {
		doNotList: newValue,
		updated: {
			doNotList: {
				userId: userId,
				date: new Date().toISOString(),
			},
		},
	}

	// create separate history document
	await createPregnancyCenterHistory(
		pregnancyCenterId,
		'doNotList',
		newValue,
		oldValue,
		userId,
	)

	// update
	const newPregnancyCenterMongooseObj = await findByIdAndUpdate(
		PregnancyCenterModel,
		pregnancyCenterId,
		newPregnancyCenterObj,
	)
	return populatePrimaryContact(newPregnancyCenterMongooseObj)
}

module.exports = { updatePregnancyCenterDoNotList }
