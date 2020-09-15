const router = require('express').Router()
const _ = require('lodash')

const FQHCModel = require('../../fqhcs/schema/mongoose-schema')

const {
	createFqhc,
	updateFqhc,
	updateFqhcDoNotList,
	updateFqhcOutOfBusiness,
} = require('../../util/actions')

const queries = require('../../pregnancy-centers/queries')

const { isLoggedInAPI, handleError } = require('../../util/express-helpers')

router.post('/', isLoggedInAPI, async (req, res) => {
	try {
		const newFqhc = req.body
		const createdFqhc = await createFqhc(req.user._id, newFqhc)
		res.status(201).json(createdFqhc)
	} catch (err) {
		return handleError(res, err)
	}
})

/*
	Takes in 'lng', 'lat', and 'miles' radius as query vars
	Returns chcs located within x miles radius of the circle centered at lng, lat
 */
router.get('/near-me', async (req, res) => {
	try {
		const METERS_PER_MILE = 1609.34
		const lng = req.query.lng || -73.781332
		const lat = req.query.lat || 42.6721989
		const miles = req.query.miles || 5

		const locationQuery = {
			'address.location': {
				$nearSphere: {
					$geometry: {
						type: 'Point',
						coordinates: [lng, lat],
					},
					$maxDistance: miles * METERS_PER_MILE,
				},
			},
		}

		const outOfBusinessQuery = {
			outOfBusiness: { $in: [null, false] },
		}

		const fullQuery = _.merge(
			locationQuery,
			outOfBusinessQuery,
			queries.chcFullyVerified,
			queries.chcVerifiedAfterDate,
		)

		const chcsNearMe = await FQHCModel.find(fullQuery).lean()

		if (chcsNearMe.length <= 0) {
			return res.boom.notFound(
				`No community health centers found near lat ${lat}, lng ${lng}, miles ${miles}`,
			)
		} else {
			res.status(200).json(chcsNearMe)
		}
	} catch (err) {
		return handleError(res, err)
	}
})

/*
 Returns one fqhc that needs verification
 */
router.get('/verify', isLoggedInAPI, async (req, res) => {
	try {
		// an array of javascript objects
		const fqhcs = await FQHCModel.aggregate([
			{ $match: queries.chcVerificationNotComplete },
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
