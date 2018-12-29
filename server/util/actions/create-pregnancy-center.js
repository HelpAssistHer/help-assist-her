const R = require('ramda')
const pregnancyCenterSchemaJoi = require('../../pregnancy-centers/schema/joi-schema')
const { validateAndFillDoc, geocode } = require('../util')
const assert = require('assert')

const { pipeP } = require('../ramda-util')

const PregnancyCenterModel = require('../../pregnancy-centers/schema/mongoose-schema.js')

const createPregnancyCenterAndPopulate = async obj => {
	const createdPregnancyCenter = new PregnancyCenterModel(obj)
	await createdPregnancyCenter.save()
	await PregnancyCenterModel.populate(
		createdPregnancyCenter,
		'primaryContactPerson',
	)
	return createdPregnancyCenter
}

const createPregnancyCenter = async (userId, pregnancyCenterObj) => {
	// validate throws an error if a property that doesn't fit the schema is added
	const validate = R.partial(validateAndFillDoc, [
		PregnancyCenterModel,
		pregnancyCenterSchemaJoi,
		userId,
	])

	const create = pipeP([validate, geocode, createPregnancyCenterAndPopulate])
	return create(pregnancyCenterObj)
}

module.exports = createPregnancyCenter
