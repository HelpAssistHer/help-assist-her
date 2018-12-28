'use strict'

const FQHCModel = require('../../fqhcs/schema/mongoose-schema')
const { validateDocument, findByIdAndUpdate } = require('../util')

const locationSchemaJoi = require('../../locations/schema/joi-schema')

const { getFqhcObj, createFqhcHistory } = require('../fqhc-helpers')

const updateFqhcDoNotList = async (userId, fqhcId, doNotListObj) => {
	// validate doNotListObj as true or false
	const validatedDoNotListObj = await validateDocument(
		locationSchemaJoi.doNotListSchemaJoi,
		doNotListObj,
	)
	const newValue = validatedDoNotListObj.doNotList

	// get fqhc to get oldValue
	const oldFqhcObj = await getFqhcObj(fqhcId)
	const oldValue = oldFqhcObj.doNotList

	// if no change, return early with the current fqhc obj
	if (oldValue === newValue) {
		return oldFqhcObj
	}

	const newFqhcObj = {
		doNotList: newValue,
		updated: {
			doNotList: {
				userId: userId,
				date: new Date().toISOString(),
			},
		},
	}

	// create separate history document
	await createFqhcHistory(fqhcId, 'doNotList', newValue, oldValue, userId)

	// update
	return findByIdAndUpdate(FQHCModel, fqhcId, newFqhcObj)
}

module.export = updateFqhcDoNotList
