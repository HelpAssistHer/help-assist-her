const R = require('ramda')
const pregnancyCenterSchemaJoi = require('../../pregnancy-centers/schema/joi-schema')
const { validateAndFillDoc, geocode } = require('../util')

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

const createPregnancyCenter = (userId, pregnancyCenterObj) => {
	const validate = R.partial(validateAndFillDoc, [
		PregnancyCenterModel,
		pregnancyCenterSchemaJoi,
		userId,
	])
	const create = R.pipeP(validate, geocode, createPregnancyCenterAndPopulate)
	return create(pregnancyCenterObj)
}

module.exports = createPregnancyCenter
