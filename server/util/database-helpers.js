'use strict'

const _ = require('lodash')
const Joi = require('joi')
const Log = require('log')
const mongoose = require('mongoose')
const P = require('bluebird')

const PregnancyCenterHistoryModel = require('../pregnancy-center-history/schema/mongoose-schema')
const PregnancyCenterModel = require('../pregnancy-centers/schema/mongoose-schema')
const PersonModel = require('../persons/schema/mongoose-schema')
const pregnancyCenterSchemaJoi = require('../pregnancy-centers/schema/joi-schema')
const personSchemaJoi = require('../persons/schema/joi-schema')

const log = new Log('info')

const keysToIgnore = ['_id', '__v', 'updated', 'updatedAt']

function removeMongooseKeys(obj) {
	for (const key in obj) {
		if (keysToIgnore.includes(key)) {
			delete obj[key]
		} else if (typeof obj[key] == 'object' && obj.hasOwnProperty(key)) {
			removeMongooseKeys(obj[key])
		}
	}
	return obj
}

function isEqualMongoose(a, b){
	return _.isEqual(removeMongooseKeys(a), removeMongooseKeys(b))
}

function createUpdateHistory(userId, oldPregnancyCenterObj, pregnancyCenterRawObj) {

	return new P( async (resolve) => {
		const pregnancyCenterRawObjWithStamps = removeMongooseKeys(_.clone(pregnancyCenterRawObj))

		if (oldPregnancyCenterObj.hasOwnProperty('updated')) {
			pregnancyCenterRawObjWithStamps['updated'] = oldPregnancyCenterObj['updated']
		} else {
			pregnancyCenterRawObjWithStamps['updated'] = {}
		}

		_.forOwn(pregnancyCenterRawObj, (value, key) => {

			// check that the 'new' data isn't exactly the same as old
			// this prevents us from creating histories for an update with same exact data
			if (!keysToIgnore.includes(key) && !isEqualMongoose(oldPregnancyCenterObj[key],value)) {
				pregnancyCenterRawObjWithStamps['updated'][key] = {
					userId: userId,
					date: new Date().toISOString()
				}

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

		resolve(pregnancyCenterRawObjWithStamps['updated'])

	})
}

function updateCreatePrimaryContactPerson(primaryContactPerson) {
	return new P( async (resolve, reject) => {
		if (!primaryContactPerson) {
			resolve(null)
		}
		
		let createdPrimaryContactPerson

		const personValidationObj = await Joi.validate(primaryContactPerson, personSchemaJoi, {
			abortEarly: false
		})

		// Joi.validate() returns an obj of form { error: null, value: validatedData}
		if (personValidationObj.error) {
			reject(personValidationObj.error)
		}

		const validatedPrimaryContactPerson = personValidationObj.value
		
		if (primaryContactPerson && '_id' in primaryContactPerson) {
			createdPrimaryContactPerson = await PersonModel.findByIdAndUpdate(validatedPrimaryContactPerson._id, {
				$set: primaryContactPerson
			}, {new: true})
		} else {
			try {
				createdPrimaryContactPerson = new PersonModel(primaryContactPerson)
				await createdPrimaryContactPerson.save()
			} catch (err) {
				reject(err)
			}
		}
		log.info('createdPrimaryContactPerson', createdPrimaryContactPerson)
		resolve(createdPrimaryContactPerson)
	})
}

function getVerifiedDateUserId(verifiedData, userId) {
	return new P( async (resolve) => {
		const verifiedDataWithDateUserId = {}
		_.forOwn(verifiedData, (value, key) => {
			verifiedDataWithDateUserId[key] = {
				verified: verifiedData[key]['verified'],
				userId: userId,
				date: new Date().toISOString(),
			}
		})
		resolve(verifiedDataWithDateUserId)
	})
}

function validatePregnancyCenter(pregnancyCenterObj) {
	return new P( async (resolve, reject) => {
		const pregnancyCenterValidationObj = await Joi.validate(pregnancyCenterObj, pregnancyCenterSchemaJoi, {
			abortEarly: false
		})
		// await Joi.validate() returns an obj of form { error: null, value: validatedData}
		if (pregnancyCenterValidationObj.error) {
			log.error(pregnancyCenterValidationObj.error)
			reject(pregnancyCenterValidationObj.error)
		}
		resolve(pregnancyCenterValidationObj.value)
	})
}

function validateAndFillPregnancyCenter(userId, pregnancyCenterObj) {
	return new P( async (resolve, reject) => {
		let validatedPregnancyCenterObj
		try {
			// validate the incoming data
			validatedPregnancyCenterObj = await validatePregnancyCenter(pregnancyCenterObj)
		} catch (err) {
			reject(err)
		}
		
		try {

			// fill out the `verifiedData` object with the userId and current date
			validatedPregnancyCenterObj.verifiedData = await getVerifiedDateUserId(
				validatedPregnancyCenterObj.verifiedData,
				userId
			)
			// handle the primaryContactPerson
			validatedPregnancyCenterObj.primaryContactPerson = await updateCreatePrimaryContactPerson(validatedPregnancyCenterObj.primaryContactPerson)
			
			resolve(validatedPregnancyCenterObj)
		} catch (err) {
			reject(err)
		}
	})
}

function getOldPregnancyCenter(pregnancyCenterId) {
	return new P( async (resolve, reject) => {
		// get the current version of the pregnancy center, in order to compare to the new
		const oldPregnancyCenter = await PregnancyCenterModel.findById(pregnancyCenterId)
			.populate('primaryContactPerson')
		if (!oldPregnancyCenter) {
			reject()
		}
		resolve(oldPregnancyCenter)
	})
}

module.exports = {

	createPregnancyCenter: (userId, pregnancyCenterObj) => {
		return new P(async(resolve, reject) => {
			try {
				const validatedPregnancyCenterObj = await validateAndFillPregnancyCenter(userId, pregnancyCenterObj)
				const createdPregnancyCenter = PregnancyCenterModel(validatedPregnancyCenterObj)
				await createdPregnancyCenter.save()
				await PregnancyCenterModel.populate(createdPregnancyCenter, 'primaryContactPerson')
				resolve(createdPregnancyCenter)
			} catch (err) {
				reject(err)
			}
		})
	},
	updatePregnancyCenter: (userId, pregnancyCenterId, pregnancyCenterObj) => {
		return new P(async(resolve, reject) => {
			try {
				const validatedPregnancyCenterObj = await validateAndFillPregnancyCenter(userId, pregnancyCenterObj)
				const oldPregnancyCenter = await getOldPregnancyCenter(pregnancyCenterId) // primaryContactPerson is populated

				// compare the old object to the new object and create PregnancyCenterHistory documents and `updated` objects
				const validatedPregnancyCenter = new PregnancyCenterModel(validatedPregnancyCenterObj)
				validatedPregnancyCenter.populate('primaryContactPerson')
				validatedPregnancyCenterObj.updated = await createUpdateHistory(userId, oldPregnancyCenter.toObject(), validatedPregnancyCenter.toObject())
				
				// finally, save the new pregnancy center and return it
				const updatedPregnancyCenter = await PregnancyCenterModel.findByIdAndUpdate(pregnancyCenterId, {
					$set: validatedPregnancyCenterObj
				}, {new: true})
				if (!updatedPregnancyCenter) {
					reject()
				}
				await PregnancyCenterModel.populate(updatedPregnancyCenter, 'primaryContactPerson')
				resolve(updatedPregnancyCenter)
			} catch (err) {
				reject(err)
			}
		})
	},
	checkPregnancyCenterId : (req, res, next) => {
		const pregnancyCenterId = req.params.pregnancyCenterId

		if (!mongoose.Types.ObjectId.isValid(pregnancyCenterId)) {
			return res.boom.badRequest(`Invalid pregnancyCenterId ${pregnancyCenterId}`)
		}
		next()
	}
}
