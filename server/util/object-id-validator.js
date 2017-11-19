'use strict'

const Joi = require('joi')
const mongoose = require('mongoose')

const objectIdJoi = Joi.extend({
	base: Joi.string(),
	name: 'objectId',
	language: {
		isValid: 'needs to be a valid MongoDB ObjectId'
	},
	rules: [
		{
			name: 'isValid',
			validate(params, value, state, options) {

				if (!mongoose.Types.ObjectId.isValid(value)) {
					return this.createError('objectId.isValid', { v: value }, state, options)
				}

				return value 
			}
		}
	]
})

module.exports = objectIdJoi
