'use strict'

const _ = require('lodash')
const Joi = require('joi')
const Log = require('log')
const P = require('bluebird')
const R = require('ramda')

const AppValidationError = require('../errors/app-validation-error')
const config = require('config')
const FQHCHistoryModel = require('../fqhc-history/schema/mongoose-schema')
const FQHCModel = require('../fqhcs/schema/mongoose-schema')
const fqhcSchemaJoi = require('../fqhcs/schema/joi-schema')
const log = new Log('info')
const locationSchemaJoi = require('../locations/schema/joi-schema')
const PregnancyCenterHistoryModel = require('../pregnancy-center-history/schema/mongoose-schema')
const PregnancyCenterModel = require('../pregnancy-centers/schema/mongoose-schema')
const PersonModel = require('../persons/schema/mongoose-schema')
const pregnancyCenterSchemaJoi = require('../pregnancy-centers/schema/joi-schema')
const personSchemaJoi = require('../persons/schema/joi-schema')

const googleMapsClient = require('@google/maps').createClient({
	key: config.googleMaps.key,
	Promise: P,
})

const keysToIgnore = ['_id', '__v', 'updated', 'updatedAt', 'inVerification']

function isEqualOmit(obj1, obj2, omitKeysList) {
	return _.isEqual(_.omit(obj1, omitKeysList), _.omit(obj2, omitKeysList))
}

const objRemovingMongoKeys = obj => _.omit(obj, keysToIgnore)

function createPregnancyCenterUpdateHistory(
	userId,
	oldPregnancyCenterObj,
	newPregnancyCenterObj,
) {
	return new P(async resolve => {
		// transfer over `updated` info from previous updates
		newPregnancyCenterObj.updated = _.get(oldPregnancyCenterObj, 'updated', {})

		// create updated object and history document
		_.forOwn(objRemovingMongoKeys(_.clone(newPregnancyCenterObj)), function(
			value,
			key,
		) {
			// check that the 'new' data isn't exactly the same as old
			// this prevents us from creating histories for an update with same exact data
			if (!isEqualOmit(oldPregnancyCenterObj[key], value, keysToIgnore)) {
				// `updated` object in PregnancyCenterModel
				newPregnancyCenterObj['updated'][key] = {
					userId: userId,
					date: new Date().toISOString(),
				}

				// make a separate history document
				const pregnancyCenterHistoryObj = new PregnancyCenterHistoryModel({
					pregnancyCenterId: oldPregnancyCenterObj._id,
					field: key,
					newValue: value,
					oldValue: oldPregnancyCenterObj[key],
					userId: userId,
				})
				pregnancyCenterHistoryObj.save()
			}
		})

		return resolve(newPregnancyCenterObj)
	})
}

function createFqhcUpdateHistory(userId, oldFqhcObj, newFqhcObj) {
	return new P(async resolve => {
		// transfer over `updated` info from previous updates
		newFqhcObj.updated = _.get(oldFqhcObj, 'updated', {})

		// create updated object and history document
		_.forOwn(objRemovingMongoKeys(_.clone(newFqhcObj)), function(value, key) {
			// check that the 'new' data isn't exactly the same as old
			// this prevents us from creating histories for an update with same exact data
			if (!isEqualOmit(oldFqhcObj[key], value)) {
				// `updated` object in PregnancyCenterModel
				newFqhcObj['updated'][key] = {
					userId: userId,
					date: new Date().toISOString(),
				}

				// make a separate history document
				const fqhcHistoryObj = new FQHCHistoryModel({
					fqhcId: oldFqhcObj._id,
					field: key,
					newValue: value,
					oldValue: oldFqhcObj[key],
					userId: userId,
				})
				fqhcHistoryObj.save()
			}
		})

		return resolve(newFqhcObj)
	})
}

function updateCreatePrimaryContactPerson(primaryContactPerson) {
	return new P(async (resolve, reject) => {
		// CASE 1: If the _id is undefined && there is no other data, then do nothing with Person
		if (!primaryContactPerson) {
			return resolve(null)
		}
		if (_.isEmpty(primaryContactPerson)) {
			return resolve(null)
		}
		if (
			primaryContactPerson.constructor === Object &&
			Object.keys(primaryContactPerson).length === 1 &&
			_.has(primaryContactPerson, '_id') &&
			_.isNil(primaryContactPerson._id)
		) {
			return resolve(null)
		}

		// Validate for both creating and updating
		const personValidationObj = await Joi.validate(
			primaryContactPerson,
			personSchemaJoi,
			{
				abortEarly: false,
			},
		)
		// Joi.validate() returns an obj of form { error: null, value: validatedData}
		if (personValidationObj.error) {
			return reject(personValidationObj.error)
		}
		const validatedPrimaryContactPerson = personValidationObj.value

		let createdPrimaryContactPerson

		// 2. If there is an _id, then update the existing Person record
		if (
			'_id' in primaryContactPerson &&
			typeof primaryContactPerson._id !== 'undefined'
		) {
			createdPrimaryContactPerson = await PersonModel.findByIdAndUpdate(
				validatedPrimaryContactPerson._id,
				{
					$set: primaryContactPerson,
				},
				{ new: true },
			)
		} else {
			// 3. If the _id is undefined && there is data in any of the fields, create a new Person
			try {
				createdPrimaryContactPerson = new PersonModel(primaryContactPerson)
				await createdPrimaryContactPerson.save()
			} catch (err) {
				return reject(err)
			}
		}

		return resolve(createdPrimaryContactPerson)
	})
}

function getVerifiedDateUserId(verifiedData, userId) {
	return new P(async resolve => {
		const verifiedDataWithDateUserId = {}
		_.forOwn(verifiedData, (value, key) => {
			verifiedDataWithDateUserId[key] = {
				verified: verifiedData[key]['verified'],
				userId: userId,
				date: new Date().toISOString(),
			}
		})
		return resolve(verifiedDataWithDateUserId)
	})
}

function validateDocument(joiSchema, documentObj) {
	return new P(async (resolve, reject) => {
		const validationObj = await Joi.validate(documentObj, joiSchema, {
			abortEarly: false,
		})
		// await Joi.validate() returns an obj of form { error: null, value: validatedData}
		if (validationObj.error) {
			return reject(validationObj.error)
		}
		return resolve(validationObj.value)
	})
}

function validateAndFillPregnancyCenter(userId, pregnancyCenterObj) {
	return new P(async (resolve, reject) => {
		try {
			// validate the incoming data
			const validatedPregnancyCenterObj = await validateDocument(
				pregnancyCenterSchemaJoi,
				pregnancyCenterObj,
			)

			// fill out the `verifiedData` object with the userId and current date
			validatedPregnancyCenterObj.verifiedData = await getVerifiedDateUserId(
				validatedPregnancyCenterObj.verifiedData,
				userId,
			)
			// handle the primaryContactPerson
			const primaryContactPerson = await updateCreatePrimaryContactPerson(
				validatedPregnancyCenterObj.primaryContactPerson,
			)
			if (primaryContactPerson) {
				validatedPregnancyCenterObj.primaryContactPerson = primaryContactPerson
			} else {
				delete validatedPregnancyCenterObj.primaryContactPerson
			}
			return resolve(validatedPregnancyCenterObj)
		} catch (err) {
			return reject(err)
		}
	})
}

function validateAndFillFqhc(userId, fqhcObj) {
	return new P(async (resolve, reject) => {
		try {
			// validate the incoming data
			const validatedFqhcObj = await validateDocument(fqhcSchemaJoi, fqhcObj)

			// fill out the `verifiedData` object with the userId and current date
			validatedFqhcObj.verifiedData = await getVerifiedDateUserId(
				validatedFqhcObj.verifiedData,
				userId,
			)
			return resolve(validatedFqhcObj)
		} catch (err) {
			return reject(err)
		}
	})
}

function checkIfPregnancyCenterOutOfBusiness(
	pregnancyCenterId,
	newPregnancyCenterObj,
) {
	return new P(async (resolve, reject) => {
		try {
			// if the original document is outOfBusiness, do not allow updates unless outOfBusiness is being set to false
			const oldPregnancyCenter = await getPregnancyCenterObj(pregnancyCenterId)

			if (
				_.get(oldPregnancyCenter, 'outOfBusiness') && // if the original is outOfBusiness
				(!_.has(newPregnancyCenterObj.outOfBusiness) ||
					newPregnancyCenterObj.outOfBusiness)
			) {
				// and new is not reopening
				return reject(
					new AppValidationError(
						'Cannot edit a outOfBusiness Pregnancy Center',
					),
				)
			}
			return resolve(newPregnancyCenterObj)
		} catch (err) {
			return reject(err)
		}
	})
}

function checkIfFqhcOutOfBusiness(fqhcId, newFqhcObj) {
	return new P(async (resolve, reject) => {
		try {
			// if the original document is outOfBusiness, do not allow updates unless outOfBusiness is being set to false
			const oldFqhc = await getFqhcObj(fqhcId)

			if (
				_.get(oldFqhc, 'outOfBusiness') &&
				(!_.has(newFqhcObj.outOfBusiness) || newFqhcObj.outOfBusiness)
			) {
				return reject(
					new AppValidationError('Cannot edit a outOfBusiness FQHC'),
				)
			}
			return resolve(newFqhcObj)
		} catch (err) {
			return reject(err)
		}
	})
}

function getPregnancyCenterObj(pregnancyCenterId) {
	return new P(async (resolve, reject) => {
		const pregnancyCenter = await PregnancyCenterModel.findById(
			pregnancyCenterId,
		).populate('primaryContactPerson')
		return pregnancyCenter ? resolve(pregnancyCenter.toObject()) : reject()
	})
}

function getFqhcObj(fqhcId) {
	return new P(async (resolve, reject) => {
		const fqhc = await FQHCModel.findById(fqhcId)
		return fqhc ? resolve(fqhc) : reject()
	})
}

const findByIdAndUpdate = (model, id, obj) => {
	return new P(async (resolve, reject) => {
		try {
			const updatedDoc = await model.findByIdAndUpdate(
				id,
				{ $set: obj },
				{ new: true },
			)
			return updatedDoc ? resolve(updatedDoc) : reject()
		} catch (err) {
			log.error(err)
			return reject(err)
		}
	})
}

const pregnancyCenterFindByIdAndUpdate = R.partial(findByIdAndUpdate, [
	PregnancyCenterModel,
])
const fqhcFindByIdAndUpdate = R.partial(findByIdAndUpdate, [FQHCModel])

const makeModelAndPopulate = obj => {
	return new P(async (resolve, reject) => {
		try {
			return resolve(
				_.omit(
					new PregnancyCenterModel(obj)
						.populate('primaryContactPerson')
						.toObject(),
					['_id'],
				),
			)
		} catch (err) {
			log.error(err)
			return reject(err)
		}
	})
}

const populatePrimaryContact = pregnancyCenterMongooseObj => {
	return new P(async (resolve, reject) => {
		try {
			return resolve(
				await PregnancyCenterModel.populate(
					pregnancyCenterMongooseObj,
					'primaryContactPerson',
				),
			)
		} catch (err) {
			log.error(err)
			return reject(err)
		}
	})
}
const createPregnancyCenterAndPopulate = obj => {
	return new P(async (resolve, reject) => {
		try {
			const createdPregnancyCenter = new PregnancyCenterModel(obj)
			await createdPregnancyCenter.save()
			await PregnancyCenterModel.populate(
				createdPregnancyCenter,
				'primaryContactPerson',
			)
			return resolve(createdPregnancyCenter)
		} catch (err) {
			log.error(err)
			return reject(err)
		}
	})
}

const createPregnancyCenterHistory = async (
	_id,
	field,
	newValue,
	oldValue,
	userId,
) => {
	// make a separate history document
	const pregnancyCenterHistoryObj = new PregnancyCenterHistoryModel({
		pregnancyCenterId: _id,
		field: field,
		newValue: newValue,
		oldValue: oldValue,
		userId: userId,
	})
	await pregnancyCenterHistoryObj.save()
}

const createFqhcHistory = async (_id, field, newValue, oldValue, userId) => {
	// make a separate history document
	const fqhcHistoryObj = new FQHCHistoryModel({
		fqhcId: _id,
		field: field,
		newValue: newValue,
		oldValue: oldValue,
		userId: userId,
	})
	await fqhcHistoryObj.save()
}

const getFullAddress = location => {
	return (
		_.get(location, 'address.line1', '') +
		' ' +
		_.get(location, 'address.line2', '') +
		' ' +
		_.get(location, 'address.city', '') +
		' ' +
		_.get(location, 'address.state', '') +
		' ' +
		_.get(location, 'address.zip', '')
	)
}

const geocodeLocation = rawObj => {
	return new P(async resolve => {
		try {
			const address = getFullAddress(rawObj)
			const response = await googleMapsClient
				.geocode({ address: address })
				.asPromise()
			const location = response.json.results[0].geometry.location

			rawObj.address.location = {
				type: 'Point',
				coordinates: [location.lng, location.lat],
			}
			return resolve(rawObj)
		} catch (err) {
			log.error(err)
			return resolve(rawObj)
		}
	})
}

module.exports = {
	createPregnancyCenter: (userId, pregnancyCenterObj) => {
		return new P(async (resolve, reject) => {
			try {
				const validate = R.partial(validateAndFillPregnancyCenter, [userId])
				const create = R.pipeP(
					validate,
					geocodeLocation,
					createPregnancyCenterAndPopulate,
				)
				return resolve(create(pregnancyCenterObj))
			} catch (err) {
				log.error(err)
				return reject(err)
			}
		})
	},
	updatePregnancyCenter: (userId, pregnancyCenterId, pregnancyCenterObj) => {
		return new P(async (resolve, reject) => {
			try {
				const validate = R.partial(validateAndFillPregnancyCenter, [userId])
				const checkIfOutOfBusiness = R.partial(
					checkIfPregnancyCenterOutOfBusiness,
					[pregnancyCenterId],
				)
				const createUpdateHistory = R.partial(
					createPregnancyCenterUpdateHistory,
					[userId, await getPregnancyCenterObj(pregnancyCenterId)],
				)
				const updatePregnancyCenter = R.partial(
					pregnancyCenterFindByIdAndUpdate,
					[pregnancyCenterId],
				)

				const updateAndSavePregnancyCenter = R.pipeP(
					validate,
					checkIfOutOfBusiness,
					geocodeLocation,
					makeModelAndPopulate,
					createUpdateHistory, // side effect of saving history records to the database
					updatePregnancyCenter,
					populatePrimaryContact,
				)

				return resolve(updateAndSavePregnancyCenter(pregnancyCenterObj))
			} catch (err) {
				log.error(err)
				return reject(err)
			}
		})
	},
	updatePregnancyCenterOutOfBusiness: async (
		userId,
		pregnancyCenterId,
		outOfBusinessObj,
	) => {
		// validate outOfBusinessObj as true or false
		const validatedOutOfBusinessObj = await validateDocument(
			locationSchemaJoi.outOfBusinessSchemaJoi,
			outOfBusinessObj,
		)
		const newValue = validatedOutOfBusinessObj.outOfBusiness

		// get pregnancyCenter to get oldValue
		const oldPregnancyCenterObj = await getPregnancyCenterObj(pregnancyCenterId)
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
			pregnancyCenterId,
			'outOfBusiness',
			newValue,
			oldValue,
			userId,
		)

		// update
		const newPregnancyCenterMongooseObj = await findByIdAndUpdate(
			PregnancyCenterModel,
			pregnancyCenterId,
			newPregnancyCenterObj,
		)
		return populatePrimaryContact(newPregnancyCenterMongooseObj)
	},
	updatePregnancyCenterDoNotList: async (
		userId,
		pregnancyCenterId,
		doNotListObj,
	) => {
		// validate doNotListObj as true or false
		const validatedDoNotListObj = await validateDocument(
			locationSchemaJoi.doNotListSchemaJoi,
			doNotListObj,
		)
		const newValue = validatedDoNotListObj.doNotList

		// get pregnancyCenter to get oldValue
		const oldPregnancyCenterObj = await getPregnancyCenterObj(pregnancyCenterId)
		const oldValue = oldPregnancyCenterObj.doNotList

		// if no change, return early with the current pregnancyCenter obj
		if (oldValue === newValue) {
			return oldPregnancyCenterObj
		}

		const newPregnancyCenterObj = {
			doNotList: newValue,
			updated: {
				doNotList: {
					userId: userId,
					date: new Date().toISOString(),
				},
			},
		}

		// create separate history document
		await createPregnancyCenterHistory(
			pregnancyCenterId,
			'doNotList',
			newValue,
			oldValue,
			userId,
		)

		// update
		const newPregnancyCenterMongooseObj = await findByIdAndUpdate(
			PregnancyCenterModel,
			pregnancyCenterId,
			newPregnancyCenterObj,
		)
		return populatePrimaryContact(newPregnancyCenterMongooseObj)
	},
	updateFqhc: (userId, fqhcId, fqhcObj) => {
		return new P(async (resolve, reject) => {
			try {
				const validate = R.partial(validateAndFillFqhc, [userId])
				const checkIfOutOfBusiness = R.partial(checkIfFqhcOutOfBusiness, [
					fqhcId,
				])
				const createUpdateHistory = R.partial(createFqhcUpdateHistory, [
					userId,
					await getFqhcObj(fqhcId),
				])
				const updateFqhc = R.partial(fqhcFindByIdAndUpdate, [fqhcId])

				const updateAndSaveFqhc = R.pipeP(
					validate,
					checkIfOutOfBusiness,
					geocodeLocation,
					createUpdateHistory, // side effect of saving update records to the database
					updateFqhc,
				)

				return resolve(updateAndSaveFqhc(fqhcObj))
			} catch (err) {
				return reject(err)
			}
		})
	},
	updateFqhcOutOfBusiness: async (userId, fqhcId, outOfBusinessObj) => {
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
	},
	updateFqhcDoNotList: async (userId, fqhcId, doNotListObj) => {
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
	},
	releaseDocuments: userId => {
		return new P(async (resolve, reject) => {
			const query = { inVerification: userId }
			const update = { inVerification: null }
			try {
				const result = await PregnancyCenterModel.update(query, update, {
					multi: true,
				})
				return resolve(result)
			} catch (err) {
				return reject(err)
			}
		})
	},
}
