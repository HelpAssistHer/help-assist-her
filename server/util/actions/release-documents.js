'use strict'

const PregnancyCenterModel = require('../../models/pregnancy-center')

const releaseDocuments = (userId) => {
	const query = { inVerification: userId }
	const update = { inVerification: null }
	return PregnancyCenterModel.update(query, update, {
		multi: true,
	}) // a promise
}

module.exports = releaseDocuments
