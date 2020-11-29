const R = require('ramda')
const fqhcSchemaJoi = require('../../fqhcs/schema/joi-schema')
const { validateAndFillDoc, geocode } = require('../util')

const { pipeP } = require('../ramda-util')

const FQHCModel = require('../../fqhcs/schema/mongoose-schema.js')

const createFqhcAndPopulate = async (obj) => {
	const createdFqhc = new FQHCModel(obj)
	await createdFqhc.save()
	await FQHCModel.populate(createdFqhc, 'primaryContactPerson')
	return createdFqhc
}

const createFqhc = async (userId, fqhcObj) => {
	// validate throws an error if a property that doesn't fit the schema is added
	const validate = R.partial(validateAndFillDoc, [
		FQHCModel,
		fqhcSchemaJoi,
		userId,
	])

	const create = pipeP([validate, geocode, createFqhcAndPopulate])
	return create(fqhcObj)
}

module.exports = createFqhc
