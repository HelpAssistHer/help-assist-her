const router = require('express').Router()

const FQHCModel = require('../../fqhcs/schema/mongoose-schema')

const {
	updateFqhc,
	updateFqhcDoNotList,
	updateFqhcOutOfBusiness,
} = require('../../util/actions')

const queries = require('../../pregnancy-centers/queries')

const { isLoggedInAPI, handleError } = require('../../util/express-helpers')

/*
 Returns one fqhc that needs verification
 */
router.get('/verify', isLoggedInAPI, async (req, res) => {
	try {
		// an array of javascript objects
		const fqhcs = await FQHCModel.aggregate([
			{ $match: queries.verificationNotComplete },
			{ $sample: { size: 1 } },
		])

		if (fqhcs.length === 0 || !fqhcs[0]) {
			return res.boom.notFound(
				'No federally qualified health centers to verify',
			)
		}

		res.status(200).json(fqhcs[0])
	} catch (err) {
		return handleError(res, err)
	}
})

/*
 Updates an existing fqhc, validates data first, adds 'updated' attribute and history model
 Returns the updated fqhc
 */
router.put('/:fqhcId', isLoggedInAPI, async (req, res) => {
	try {
		const fqhcId = req.params.fqhcId
		const fqhcData = req.body
		fqhcData['inVerification'] = null
		const updatedFqhc = await updateFqhc(req.user._id, fqhcId, fqhcData)
		res.status(200).json(updatedFqhc)
	} catch (err) {
		return handleError(res, err)
	}
})

/*
	Updates an existing fqhc's out-of-business boolean, adds 'updated' attribute and history model
	Returns the updated fqhc
 */
router.put('/:fqhcId/out-of-business', isLoggedInAPI, async (req, res) => {
	try {
		const fqhcId = req.params.fqhcId
		// expected: req.body = { outOfBusiness: true | false }
		const outOfBusinessObj = req.body
		const updatedFqhc = await updateFqhcOutOfBusiness(
			req.user._id,
			fqhcId,
			outOfBusinessObj,
		)
		res.status(200).json(updatedFqhc)
	} catch (err) {
		return handleError(res, err)
	}
})

/*
	Updates an existing fqhc's do-not-list boolean, adds 'updated' attribute and history model
	Returns the updated fqhc
 */
router.put('/:fqhcId/do-not-list', isLoggedInAPI, async (req, res) => {
	try {
		const fqhcId = req.params.fqhcId
		// expected: req.body = { doNotList: true | false }
		const doNotListObj = req.body

		const updatedFqhc = await updateFqhcDoNotList(
			req.user._id,
			fqhcId,
			doNotListObj,
		)
		res.status(200).json(updatedFqhc)
	} catch (err) {
		return handleError(res, err)
	}
})

module.exports = router
