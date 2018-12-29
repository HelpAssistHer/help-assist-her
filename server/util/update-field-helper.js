'use strict'

const PregnancyCenterModel = require('../pregnancy-centers/schema/mongoose-schema')
const { validateDocument, findByIdAndUpdate, createHistory } = require('./util')
const { populatePrimaryContact } = require('./pregnancy-center-helpers')

const updateFieldHelper = async (
	field,
	joiSchema,
	model,
	historyModel,
	idName,
	getDocFunction,
	userId,
	id,
	fieldObj,
) => {
	// validate fieldObj as true or false
	const validatedFieldObj = await validateDocument(joiSchema, fieldObj)
	const newValue = validatedFieldObj[field]

	// get oldDoc to get oldValue
	const oldDoc = await getDocFunction(id)
	const oldValue = oldDoc[field]

	// if no change, return early with the oldDoc
	if (oldValue === newValue) {
		if (model === PregnancyCenterModel) {
			return await populatePrimaryContact(oldDoc)
		}
		return oldDoc
	}

	const newObj = {
		[field]: newValue,
		updated: {
			[field]: {
				userId: userId,
				date: new Date().toISOString(),
			},
		},
	}

	// create separate history document
	await createHistory(
		historyModel,
		idName,
		userId,
		id,
		field,
		newValue,
		oldValue,
	)

	// update
	const newMongooseObj = await findByIdAndUpdate(model, id, newObj)
	if (model === PregnancyCenterModel) {
		return await populatePrimaryContact(newMongooseObj)
	}
	return newMongooseObj
}

module.exports = updateFieldHelper
