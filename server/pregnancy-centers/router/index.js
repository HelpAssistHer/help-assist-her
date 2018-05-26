'use strict'

const _ = require('lodash')
const router = require('express').Router()

const { isLoggedInAPI } = require('../../authentication')
const { handleRejectedPromise } = require('../../helpers')
const queries = require('../queries')
const PregnancyCenterModel = require('../schema/mongoose-schema')

/*
	Returns one pregnancy center that needs verification
*/
router.get(
	'/verify',
	isLoggedInAPI,
	handleRejectedPromise(async (req, res) => {
		const notInVerification = { inVerification: { $in: [false, null] } }

		const pregnancyCenters = await PregnancyCenterModel.aggregate([
			{ $match: _.merge(queries.verificationNotComplete, notInVerification) },
			{ $sample: { size: 1 } },
		])

		if (pregnancyCenters.length === 0 || !pregnancyCenters[0]) {
			return res.boom.notFound('No pregnancy centers to verify')
		}

		// a second lookup is necessary to get a mongoose object to populate
		const pregnancyCenterId = pregnancyCenters[0]._id
		// console.log('PREG CENTER ID', pregnancyCenterId)
		// const update = {inVerification: req.user._id}
		// const options = {new: true} // returns updated object back
		// const pregnancyCenter = await PregnancyCenterModel.findOneAndUpdate({
		// 	_id: pregnancyCenterId,
		// }, update, options).populate('primaryContactPerson').lean()
		// console.log('RESULT', pregnancyCenter)

		res.status(200).json(pregnancyCenters)
	}),
)

module.exports = router
