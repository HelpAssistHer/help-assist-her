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

		resolve(pregnancyCenterRawObjWithStamps)

	})
}

function updateCreatePrimaryContactPerson(primaryContactPerson) {
	return new P( async (resolve, reject) => {
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
		resolve(createdPrimaryContactPerson)
	})
}

module.exports = {

	createPregnancyCenter: (pregnancyCenter) => {

		return new P(async(resolve, reject) => {
			const pregnancyCenterValidationObj = await Joi.validate(pregnancyCenter, pregnancyCenterSchemaJoi, {
				abortEarly: false
			})

			// Joi.validate() returns an obj of form { error: null, value: validatedData}
			if (pregnancyCenterValidationObj.error) {
				reject(pregnancyCenterValidationObj.error)
			}

			const validatedPregnancyCenter = pregnancyCenterValidationObj.value

			const primaryContactPerson = validatedPregnancyCenter.primaryContactPerson
			delete validatedPregnancyCenter.primaryContactPerson
			let createdPregnancyCenter

			if (primaryContactPerson) {
				try {
					createdPregnancyCenter = new PregnancyCenterModel(validatedPregnancyCenter)
					createdPregnancyCenter.primaryContactPerson = await updateCreatePrimaryContactPerson(primaryContactPerson)
				} catch (err) {
					reject(err)
				}
			}

			try {
				await createdPregnancyCenter.save()
				await PregnancyCenterModel.populate(createdPregnancyCenter, 'primaryContactPerson')
				resolve(createdPregnancyCenter)
			} catch (err) {
				reject(err)
			}
		})
	},
	updatePregnancyCenter: (userId, pregnancyCenterId, pregnancyCenter) => {
		return new P(async(resolve, reject) => {

			const pregnancyCenterValidationObj = await Joi.validate(pregnancyCenter, pregnancyCenterSchemaJoi, {
				abortEarly: false
			})

			// await Joi.validate() returns an obj of form { error: null, value: validatedData}
			if (pregnancyCenterValidationObj.error) {
				log.error(pregnancyCenterValidationObj.error)
				reject(pregnancyCenterValidationObj.error)
			}
			const validatedPregnancyCenter = pregnancyCenterValidationObj.value

			const primaryContactPerson = validatedPregnancyCenter.primaryContactPerson
			delete validatedPregnancyCenter.primaryContactPerson

			let oldPregnancyCenterObj = await PregnancyCenterModel.findById(pregnancyCenterId)
				.populate('primaryContactPerson')
			if (!oldPregnancyCenterObj) {
				reject()
			}

			oldPregnancyCenterObj = oldPregnancyCenterObj.toObject()

			if (primaryContactPerson) {
				try {
					validatedPregnancyCenter.primaryContactPerson = await updateCreatePrimaryContactPerson(primaryContactPerson)
				} catch (err) {
					reject(err)
				}
			}

			const tempPregnancyCenter = new PregnancyCenterModel(validatedPregnancyCenter)
			tempPregnancyCenter.populate('primaryContactPerson')
			const validatedDataWithUpdatedHistory = await createUpdateHistory(userId, oldPregnancyCenterObj, tempPregnancyCenter.toObject())
			if (primaryContactPerson) {
				validatedDataWithUpdatedHistory.primaryContactPerson = validatedDataWithUpdatedHistory.primaryContactPerson._id
			}
			const updatedPregnancyCenter = await PregnancyCenterModel.findByIdAndUpdate(pregnancyCenterId, {
				$set: validatedDataWithUpdatedHistory
			}, {new: true})

			if (!updatedPregnancyCenter) {
				reject()
			}
			await PregnancyCenterModel.populate(updatedPregnancyCenter, 'primaryContactPerson')
			resolve(updatedPregnancyCenter)
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
