'use strict'
const _ = require('lodash')
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
const omitKeys = R.partial(_.omit, [keysToIgnore])

const isEqualOmit = (obj1, obj2) => _.isEqual(omitKeys(obj1), omitKeys(obj2))

const createHistories = async (
	historyModel,
	idName,
	userId,
	oldDocObj,
	newDocObj,
) => {
	const createHistory = (key, value) => {
		const historyObj = new historyModel({
			[idName]: oldDocObj._id,
			field: key,
			newValue: value,
			oldValue: oldDocObj[key],
			userId: userId,
		})
		return historyObj.save() // a promise
	}

	// doc object is changed
	const addUpdateData = key => {
		newDocObj['updated'][key] = {
			userId: userId,
			date: new Date().toISOString(),
		}
	}

	const processKeys = (value, key) => {
		// check that the 'new' data isn't exactly the same as old
		// this prevents us from creating histories for an update with same exact data
		if (isEqualOmit(oldDocObj[key], value)) return null
		addUpdateData(key)
		return createHistory(key, value) // a promise
	}

	// transfer over `updated` info from previous updates
	newDocObj.updated = _.get(oldDocObj, 'updated', {})

	// iterate over keys and values and create 'updated' data and histories
	await Promise.all(_.map(omitKeys(newDocObj), processKeys))
	return newDocObj
}

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
			R.isNil(primaryContactPerson) ||
			R.isEmpty(primaryContactPerson) ||
			R.isNil(primaryContactPerson._id)
		) {
			return null
		}
	} catch (err) {
		return null
	}

	// Validate for both creating and updating
	const { error, validatedPrimaryContactPerson } = await Joi.validate(
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
			validatedPrimaryContactPerson._id,
			{ $set: primaryContactPerson },
			{ new: true },
		)
	} else {
		// 3. If the _id is undefined && there is data in any of the fields, create a new Person
		const createdPrimaryContactPerson = new PersonModel(primaryContactPerson)
		return createdPrimaryContactPerson.save()
	}
}

const handlePrimaryContactPerson = async validatedPregnancyCenter => {
	// handle the primaryContactPerson
	const primaryContactPerson = await updateCreatePrimaryContactPerson(
		validatedPregnancyCenter.primaryContactPerson,
	)
	if (primaryContactPerson) {
		validatedPregnancyCenter.primaryContactPerson = primaryContactPerson
	} else {
		delete validatedPregnancyCenter.primaryContactPerson
	}
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

const checkIfOutOfBusiness = async (getDocFunction, id, newDoc) => {
	// if the original document is outOfBusiness, do not allow updates unless outOfBusiness is being set to false
	const oldDoc = await getDocFunction(id)
	log.info('oldDoc', oldDoc)
	log.info('newDoc', newDoc)

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

const createHistory = async (
	historyModel,
	idName,
	_id,
	field,
	newValue,
	oldValue,
	userId,
) => {
	// make a separate history document
	const historyObj = new historyModel({
		[idName]: _id,
		field: field,
		newValue: newValue,
		oldValue: oldValue,
		userId: userId,
	})
	await historyObj.save()
}

module.exports = {
	validateDocument,
	validateAndFillDoc,
	geocode,
	createHistories,
	findByIdAndUpdate,
	checkIfOutOfBusiness,
	createHistory,
}
