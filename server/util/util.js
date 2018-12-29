'use strict'
const _ = require('lodash')
const omit = require('lodash/fp/omit')
const Joi = require('joi')
const R = require('ramda')
const PersonModel = require('../persons/schema/mongoose-schema')
const personSchemaJoi = require('../persons/schema/joi-schema')
const PregnancyCenterModel = require('../pregnancy-centers/schema/mongoose-schema')
const AppValidationError = require('../errors/app-validation-error')
const Log = require('log')
const log = new Log('info')

const {
	getGoogleGeocode,
	getLocation,
	addLocation,
	getSafeFullAddress,
} = require('../util/geocode-helpers')

const { safePipeP } = require('../util/ramda-util')
const keysToIgnore = ['_id', '__v', 'updated', 'updatedAt', 'inVerification']
const omitKeys = R.partial(omit, [keysToIgnore])

const isEqualOmit = (obj1, obj2) => {
	if (typeof obj1 === Object && typeof obj2 === Object) {
		return _.isEqual(omitKeys(obj1), omitKeys(obj2))
	} else {
		return _.isEqual(obj1, obj2)
	}
}

const createHistory = (
	historyModel,
	idName,
	userId,
	_id,
	field,
	newValue,
	oldValue,
) => {
	// don't create a history if no change
	if (isEqualOmit(newValue, oldValue)) {
		return null
	}
	// make a separate history document
	const historyObj = new historyModel({
		[idName]: _id,
		field: field,
		newValue: newValue,
		oldValue: oldValue,
		userId: userId,
	})
	return historyObj.save() // a promise
}

const createHistories = async (
	historyModel,
	idName,
	userId,
	_id,
	oldDocObj,
	newDocObj,
) => {
	const createHistoryFilled = R.partial(createHistory, [
		historyModel,
		idName,
		userId,
		_id,
	])
	const savedP = _.map(omitKeys(newDocObj), (value, key) => {
		createHistoryFilled(key, value, oldDocObj[key])
	})

	// iterate over keys and values and create histories
	await Promise.all(savedP)
	return newDocObj
}

const createUpdatedField = (userId, oldDocObj, newDocObj) => {
	const updated = _.transform(
		omitKeys(newDocObj),
		(result, value, key) => {
			if (!isEqualOmit(oldDocObj[key], value)) {
				result[key] = {
					userId: userId,
					date: new Date().toISOString(),
				}
			}
		},
		{},
	)

	newDocObj.updated = _.assign({}, _.get(oldDocObj, 'updated'), updated)
	return newDocObj
}

// this overwrites the date - is that what we want?
const getVerifiedDateUserId = (verifiedData, userId) => {
	const verifiedDataWithDateUserId = {}
	_.forOwn(verifiedData, (value, key) => {
		if (verifiedData[key]) {
			verifiedDataWithDateUserId[key] = {
				verified: verifiedData[key]['verified'],
				userId: userId,
				date: new Date().toISOString(),
			}
		}
	})
	return verifiedDataWithDateUserId
}

const updateCreatePrimaryContactPerson = async primaryContactPerson => {
	// CASE 1: If the _id is undefined && there is no other data, then do nothing with Person

	try {
		if (
			R.isNil(primaryContactPerson) || // undefined or null
			R.isEmpty(primaryContactPerson) || // empty object
			(R.isNil(primaryContactPerson._id) &&
				R.isEmpty(_.omit(primaryContactPerson, '_id'))) // id undefined and nothing else
		) {
			return null
		}
	} catch (err) {
		return null
	}

	// Validate for both creating and updating
	const { error, value } = await Joi.validate(
		primaryContactPerson,
		personSchemaJoi,
		{
			abortEarly: false,
		},
	)
	if (error) {
		throw error
	}

	// 2. If there is an _id, then update the existing Person record
	if (!R.isNil(primaryContactPerson._id)) {
		return PersonModel.findByIdAndUpdate(
			value._id,
			{ $set: primaryContactPerson },
			{ new: true },
		)
	} else {
		// 3. If the _id is undefined && there is data in any of the fields, create a new Person
		const createdPrimaryContactPerson = new PersonModel(primaryContactPerson)
		return createdPrimaryContactPerson.save()
	}
}

const handlePrimaryContactPerson = async pregnancyCenter => {
	// handle the primaryContactPerson
	const primaryContactPerson = await updateCreatePrimaryContactPerson(
		pregnancyCenter.primaryContactPerson,
	)
	if (primaryContactPerson) {
		pregnancyCenter.primaryContactPerson = primaryContactPerson
	} else {
		delete pregnancyCenter.primaryContactPerson
	}
	return pregnancyCenter
}

const validateDocument = async (joiSchema, documentObj) => {
	const { error, value } = await Joi.validate(documentObj, joiSchema, {
		abortEarly: false,
	})
	// await Joi.validate() returns an obj of form { error: null, value: validatedData}
	if (error) {
		throw error
	}
	return value
}

const validateAndFillDoc = async (model, joiSchema, userId, docObj) => {
	// validate the incoming data
	const validatedObj = await validateDocument(joiSchema, docObj)
	// fill out the `verifiedData` object with the userId and current date
	validatedObj.verifiedData = getVerifiedDateUserId(
		validatedObj.verifiedData,
		userId,
	)
	if (model === PregnancyCenterModel) {
		handlePrimaryContactPerson(validatedObj)
	}
	log.info(validatedObj)
	return validatedObj
}

const geocode = doc => {
	try {
		return safePipeP([
			getSafeFullAddress,
			getGoogleGeocode,
			getLocation,
			R.partial(addLocation, [doc]),
		])(doc)
	} catch (err) {
		log.error(err)
	}
}

const findByIdAndUpdate = (model, id, obj) => {
	return model.findByIdAndUpdate(id, { $set: obj }, { new: true })
}

const checkIfOutOfBusiness = (getDocFunction, id, oldDoc, newDoc) => {
	// if the original document is outOfBusiness, do not allow updates unless outOfBusiness is being set to false
	if (
		_.get(oldDoc, 'outOfBusiness') &&
		(!_.has(newDoc.outOfBusiness) || newDoc.outOfBusiness)
	) {
		throw new AppValidationError(
			'Cannot edit an outOfBusiness FQHC or PregnancyCenter',
		)
	}
	return newDoc
}

module.exports = {
	validateDocument,
	validateAndFillDoc,
	geocode,
	createHistories,
	findByIdAndUpdate,
	checkIfOutOfBusiness,
	createHistory,
	createUpdatedField,
}
