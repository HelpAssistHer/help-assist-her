'use strict'
const mongoose = require('mongoose')

const isObjectId = (value, helpers) => {
	if (!mongoose.Types.ObjectId.isValid(value)) {
		return helpers.error('any.invalid')
	}
	return value
}

module.exports = isObjectId
