'use strict'
const locationSchemaJoi = require('../../locations/schema/joi-schema')
const PregnancyCenterModel = require('../../pregnancy-centers/schema/mongoose-schema')

const {
	validateDocument,
	findByIdAndUpdate,
	populatePrimaryContact,
} = require('../util')

const {
	getPregnancyCenterObj,
	createPregnancyCenterHistory,
} = require('../pregnancy-center-helpers')

const updatePregnancyCenterOutOfBusiness = async (
	userId,
	model,
	id,
	outOfBusinessObj,
) => {
	// validate outOfBusinessObj as true or false
	const validatedOutOfBusinessObj = await validateDocument(
		locationSchemaJoi.outOfBusinessSchemaJoi,
		outOfBusinessObj,
	)
	const newValue = validatedOutOfBusinessObj.outOfBusiness

	// get pregnancyCenter to get oldValue
	const oldPregnancyCenterObj = await getPregnancyCenterObj(id)
	const oldValue = oldPregnancyCenterObj.outOfBusiness

	// if no change, return early with the current pregnancyCenter obj
	if (oldValue === newValue) {
		return oldPregnancyCenterObj
	}

	const newPregnancyCenterObj = {
		outOfBusiness: newValue,
		updated: {
			outOfBusiness: {
				userId: userId,
				date: new Date().toISOString(),
			},
		},
	}

	// create separate history document
	await createPregnancyCenterHistory(
		id,
		'outOfBusiness',
		newValue,
		oldValue,
		userId,
	)

	// update
	const newPregnancyCenterMongooseObj = await findByIdAndUpdate(
		PregnancyCenterModel,
		id,
		newPregnancyCenterObj,
	)
	return populatePrimaryContact(newPregnancyCenterMongooseObj)
}

module.exports = updatePregnancyCenterOutOfBusiness
