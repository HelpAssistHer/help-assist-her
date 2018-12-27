'use strict'

const FQHCModel = require('../../fqhcs/schema/mongoose-schema')
const { validateDocument, findByIdAndUpdate } = require('../util')

const locationSchemaJoi = require('../locations/schema/joi-schema')

const { getFqhcObj, createFqhcHistory } = require('../fqhc-helpers')

const updateFqhcOutOfBusiness = async (userId, fqhcId, outOfBusinessObj) => {
	// validate outOfBusinessObj as true or false
	const validatedOutOfBusinessObj = await validateDocument(
		locationSchemaJoi.outOfBusinessSchemaJoi,
		outOfBusinessObj,
	)
	const newValue = validatedOutOfBusinessObj.outOfBusiness

	// get fqhc to get oldValue
	const oldFqhcObj = await getFqhcObj(fqhcId)
	const oldValue = oldFqhcObj.outOfBusiness

	// if no change, return early with the current fqhc obj
	if (oldValue === newValue) {
		return oldFqhcObj
	}

	const newFqhcObj = {
		outOfBusiness: newValue,
		updated: {
			outOfBusiness: {
				userId: userId,
				date: new Date().toISOString(),
			},
		},
	}

	// create separate history document
	await createFqhcHistory(fqhcId, 'outOfBusiness', newValue, oldValue, userId)

	// update
	return findByIdAndUpdate(FQHCModel, fqhcId, newFqhcObj)
}

module.exports = { updateFqhcOutOfBusiness }
