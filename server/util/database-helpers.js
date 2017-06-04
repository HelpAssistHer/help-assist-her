const Joi = require('joi')
const P = require('bluebird')

const PregnancyCenterModel = require('./pregnancy-centers/schema/mongoose-schema')
const pregnancyCenterSchemaJoi = require('./pregnancy-centers/schema/joi-schema')

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

			try {
				const createdPregnancyCenter = new PregnancyCenterModel(pregnancyCenterValidationObj.value)
				await createdPregnancyCenter.save()
				resolve(createdPregnancyCenter)
			} catch (err) {
				reject(err)
			}
		})
	}
}
