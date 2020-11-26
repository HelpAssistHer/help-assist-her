const R = require('ramda')
const pregnancyCenterSchemaJoi = require('../../schema/pregnancy-center')
const { validateAndFillDoc, geocode } = require('../util')

const { pipeP } = require('../ramda-util')

const PregnancyCenterModel = require('../../models/pregnancy-center.js')

const createPregnancyCenterAndPopulate = async (obj) => {
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
