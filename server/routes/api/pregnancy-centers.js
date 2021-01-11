const router = require('express').Router()
const _ = require('lodash')

const PregnancyCenterModel = require('../../models/pregnancy-center')
const {
	createPregnancyCenter,
	updatePregnancyCenter,
	updatePregnancyCenterDoNotList,
	updatePregnancyCenterOutOfBusiness,
} = require('../../util/actions')
const queries = require('../../queries/pregnancy-center')
const { isLoggedInAPI, handleError } = require('../../util/express-helpers')

/*
	Returns all pregnancy centers
	TODO: limits and paging, if necessary
 */
router.get('/', isLoggedInAPI, async (req, res) => {
	try {
		const allPregnancyCenters = await PregnancyCenterModel.find({
			outOfBusiness: { $in: [null, false] },
		})
			.populate('primaryContactPerson')
			.lean()
		if (allPregnancyCenters) {
			res.status(200).json(allPregnancyCenters)
		}
	} catch (err) {
		return handleError(res, err)
	}
})

/*
	Takes in 'lng', 'lat', and 'miles' radius as query vars
	Returns pregnancy centers located within x miles radius of the circle centered at lng, lat
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
			queries.fullyVerified,
			queries.verifiedAfterDate,
		)

		const pregnancyCentersNearMe = await PregnancyCenterModel.find(
			fullQuery,
		).lean()
		res.status(200).json(pregnancyCentersNearMe)
	} catch (err) {
		return handleError(res, err)
	}
})

/*
	Returns one pregnancy center that needs verification
*/
router.get('/verify', isLoggedInAPI, async (req, res) => {
	try {
		const notInVerification = { inVerification: { $in: [false, null] } }

		// an array of javascript objects
		const pregnancyCenters = await PregnancyCenterModel.aggregate([
			{
				$match: _.merge(
					queries.verificationBeforeDateOrNone,
					notInVerification,
				),
			},
			{ $sample: { size: 1 } },
		])

		if (pregnancyCenters.length === 0 || !pregnancyCenters[0]) {
			return res.boom.notFound('No pregnancy centers to verify')
		}

		// a second lookup is necessary to get a mongoose object to populate
		const pregnancyCenterId = pregnancyCenters[0]._id
		const update = { inVerification: req.user._id }
		const options = { new: true } // returns updated object back
		const pregnancyCenter = await PregnancyCenterModel.findOneAndUpdate(
			{
				_id: pregnancyCenterId,
			},
			update,
			options,
		)
			.populate('primaryContactPerson')
			.lean()

		res.status(200).json(pregnancyCenter)
	} catch (err) {
		return handleError(res, err)
	}
})

router.post('/', isLoggedInAPI, async (req, res) => {
	try {
		const newPregnancyCenter = req.body
		const createdPregnancyCenter = await createPregnancyCenter(
			req.user._id,
			newPregnancyCenter,
		)
		res.status(201).json(createdPregnancyCenter)
	} catch (err) {
		return handleError(res, err)
	}
})

/*
	Updates an existing pregnancy center, validates data first, adds 'updated' attribute and history model
	Returns the updated pregnancy center
 */
router.put('/:pregnancyCenterId', isLoggedInAPI, async (req, res) => {
	try {
		const pregnancyCenterId = req.params.pregnancyCenterId
		const pregnancyCenterData = req.body
		pregnancyCenterData['inVerification'] = null
		const updatedPregnancyCenter = await updatePregnancyCenter(
			req.user._id,
			pregnancyCenterId,
			pregnancyCenterData,
		)
		res.status(200).json(updatedPregnancyCenter)
	} catch (err) {
		return handleError(res, err)
	}
})

/*
	Updates an existing pregnancy center's out-of-business boolean, adds 'updated' attribute and history model
	Returns the updated pregnancy center
 */
router.put(
	'/:pregnancyCenterId/out-of-business',
	isLoggedInAPI,
	async (req, res) => {
		try {
			const pregnancyCenterId = req.params.pregnancyCenterId
			// expected: req.body = { outOfBusiness: true | false }
			const outOfBusinessObj = req.body
			const updatedPregnancyCenter = await updatePregnancyCenterOutOfBusiness(
				req.user._id,
				pregnancyCenterId,
				outOfBusinessObj,
			)
			res.status(200).json(updatedPregnancyCenter)
		} catch (err) {
			return handleError(res, err)
		}
	},
)

/*
	Updates an existing pregnancy center's do-not-list boolean, adds 'updated' attribute and history model
	Returns the updated pregnancy center
 */
router.put(
	'/:pregnancyCenterId/do-not-list',
	isLoggedInAPI,
	async (req, res) => {
		try {
			const pregnancyCenterId = req.params.pregnancyCenterId
			// expected: req.body = { doNotList: true | false }
			const doNotListObj = req.body

			const updatedPregnancyCenter = await updatePregnancyCenterDoNotList(
				req.user._id,
				pregnancyCenterId,
				doNotListObj,
			)
			res.status(200).json(updatedPregnancyCenter)
		} catch (err) {
			return handleError(res, err)
		}
	},
)

/*
	Takes in a query var time, which is in the format 'hhmm',
	and a query var day which is an integer where Monday is 1 and Sunday is 7
	Returns a list of pregnancy centers open now
 */
router.get('/open-now', isLoggedInAPI, async (req, res) => {
	try {
		const time = parseInt(req.query.time)
		const dayOfWeek = parseInt(req.query.day)
		const query = { outOfBusiness: { $in: [null, false] } }

		query['hours.' + dayOfWeek + '.open'] = {
			$lte: time,
		}
		query['hours.' + dayOfWeek + '.close'] = {
			$gte: time,
		}

		const pregnancyCentersOpenNow = await PregnancyCenterModel.find(query)
			.populate('primaryContactPerson')
			.lean()
		if (pregnancyCentersOpenNow.length <= 0) {
			return res.boom.notFound(
				`No pregnancy centers open now ${dayOfWeek} ${time}`,
			)
		}

		res.status(200).json(pregnancyCentersOpenNow)
	} catch (err) {
		return handleError(res, err)
	}
})

/*
	Returns the pregnancy center that matches the id
 */

router.get('/:pregnancyCenterId', isLoggedInAPI, async (req, res) => {
	try {
		const pregnancyCenterId = req.params.pregnancyCenterId

		const pregnancyCenter = await PregnancyCenterModel.findById(
			pregnancyCenterId,
		)
			.populate('primaryContactPerson')
			.lean()

		if (!pregnancyCenter) {
			return res.boom.notFound(
				`No pregnancy center found with id: ${pregnancyCenterId}`,
			)
		}

		res.status(200).json(pregnancyCenter)
	} catch (err) {
		return handleError(res, err)
	}
})

module.exports = router
