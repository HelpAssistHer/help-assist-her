'use strict'

const _ = require('lodash')
const bodyParser = require('body-parser')
const boom = require('express-boom')
const config = require('config')
const cors = require('cors')
const express = require('express')
const facebookTokenStrategy = require('passport-facebook-token')
const Log = require('log')
const mongoose = require('mongoose')
const morgan = require('morgan')
const P = require('bluebird')
const passport = require('passport')
const path = require('path')
const session = require('express-session')

const FQHCModel = require('./fqhcs/schema/mongoose-schema')
const PregnancyCenterModel = require('./pregnancy-centers/schema/mongoose-schema')
const UserModel = require('./users/schema/mongoose-schema')

const databaseHelpers = require('./util/database-helpers')
const createPregnancyCenter = databaseHelpers.createPregnancyCenter
const releaseDocuments = databaseHelpers.releaseDocuments
const updateFqhc = databaseHelpers.updateFqhc
const updateFqhcDoNotList = databaseHelpers.updateFqhcDoNotList
const updateFqhcOutOfBusiness = databaseHelpers.updateFqhcOutOfBusiness
const updatePregnancyCenter = databaseHelpers.updatePregnancyCenter
const updatePregnancyCenterDoNotList =
	databaseHelpers.updatePregnancyCenterDoNotList
const updatePregnancyCenterOutOfBusiness =
	databaseHelpers.updatePregnancyCenterOutOfBusiness

const queries = require('./pregnancy-centers/queries')

const port = config.server.port
const server = express()
mongoose.Promise = require('bluebird')
const log = new Log('info')
const MongoStore = require('connect-mongo')(session)

if (process.env.NODE_ENV === 'localhost') {
	const whitelist = config.corsOriginWhitelist

	const corsOptions = {
		origin: (origin, callback) => {
			if (whitelist.indexOf(origin) !== -1) {
				callback(null, true)
			} else {
				const err = new Error(`${origin} is not allowed by CORS`)
				log.error(err)
				callback(err)
			}
		},
		credentials: true,
	}

	server.use(cors(corsOptions))
}

server.use(boom())
server.use(express.static('public'))
server.use(cors())
server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.urlencoded())
server.use(bodyParser.json())
server.use(morgan('combined'))
server.use(
	session({
		secret: config.session.secret,
		resave: false,
		saveUninitialized: false,
		name: 'sessionId',
		store: new MongoStore({ mongooseConnection: mongoose.connection }),
	}),
)
server.use(passport.initialize())
server.use(passport.session())

passport.use(
	new facebookTokenStrategy(
		{
			clientID: config.facebook.appId,
			clientSecret: config.facebook.appSecret,
			callbackURL: `${config.server.url}/auth/facebook/callback`,
		},
		(accessToken, refreshToken, profile, done) => {
			const query = { providerId: profile.id },
				update = {
					provider: profile.provider,
					providerId: profile.id,
					displayName: profile.displayName,
				},
				options = { upsert: true, new: true, setDefaultsOnInsert: true }

			UserModel.findOneAndUpdate(query, update, options, (err, user) => {
				if (err) {
					return done(err)
				}
				done(null, user)
			})
		},
	),
)

passport.serializeUser((user, done) => {
	done(null, user._id)
})

passport.deserializeUser((objectId, done) => {
	UserModel.findOne({ _id: objectId }, (err, user) => {
		done(err, user)
	})
})

// adapted from https://strongloop.com/strongblog/async-error-handling-expressjs-es7-promises-generators/
let handleRejectedPromise = fn => (...args) =>
	fn(...args).catch(e => {
		log.error(e)
		handleError(args[1], e)
	})

// TODO: Error handling
const startDatabase = P.coroutine(function* startDatabase() {
	yield mongoose.connect(config.mongo.connectionString)

	log.info('Connected to database')
})

startDatabase()

server.get('/verification', (req, res) => {
	res.sendFile(path.join(__dirname, '../public/index.html'))
})

server.get('/verification/*', (req, res) => {
	res.sendFile(path.join(__dirname, '../public/index.html'))
})

server.get('/api/initial-data', (req, res) => {
	return res.status(200).json({
		facebookAppId: config.facebook.appId,
	})
})

/*
	Returns all pregnancy centers
	TODO: limits and paging, if necessary
 */
server.get(
	'/api/pregnancy-centers',
	isLoggedInAPI,
	handleRejectedPromise(async (req, res) => {
		const allPregnancyCenters = await PregnancyCenterModel.find({
			outOfBusiness: { $in: [null, false] },
		})
			.populate('primaryContactPerson')
			.lean()
		if (allPregnancyCenters) {
			res.status(200).json(allPregnancyCenters)
		}
	}),
)

/*
	Takes in 'lng', 'lat', and 'miles' radius as query vars
	Returns pregnancy centers located within x miles radius of the circle centered at lng, lat
 */
server.get(
	'/api/pregnancy-centers/near-me',
	isLoggedInAPI,
	handleRejectedPromise(async (req, res) => {
		const METERS_PER_MILE = 1609.34
		const lng = req.query.lng || -73.781332
		const lat = req.query.lat || 42.6721989
		const miles = req.query.miles || 5

		const pregnancyCentersNearMe = await PregnancyCenterModel.find({
			'address.location': {
				$nearSphere: {
					$geometry: {
						type: 'Point',
						coordinates: [lng, lat],
					},
					$maxDistance: miles * METERS_PER_MILE,
				},
			},
			outOfBusiness: { $in: [null, false] },
		})
			.populate('primaryContactPerson')
			.lean()

		if (pregnancyCentersNearMe.length <= 0) {
			return res.boom.notFound(
				`No pregnancy centers found near lat ${lat}, lng ${lng}, miles ${miles}`,
			)
		} else {
			res.status(200).json(pregnancyCentersNearMe)
		}
	}),
)

/*
	Returns one pregnancy center that needs verification
*/
server.get(
	'/api/pregnancy-centers/verify',
	isLoggedInAPI,
	handleRejectedPromise(async (req, res) => {
		const notInVerification = { inVerification: { $in: [false, null] } }

		// an array of javascript objects
		const pregnancyCenters = await PregnancyCenterModel.aggregate([
			{ $match: _.merge(queries.verificationNotComplete, notInVerification) },
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
	}),
)

server.post(
	'/api/pregnancy-centers',
	isLoggedInAPI,
	handleRejectedPromise(async (req, res) => {
		const newPregnancyCenter = req.body

		try {
			const createdPregnancyCenter = await createPregnancyCenter(
				req.user._id,
				newPregnancyCenter,
			)
			res.status(201).json(createdPregnancyCenter)
		} catch (err) {
			log.error(err)
			return handleError(res, err)
		}
	}),
)

/*
	Updates an existing pregnancy center, validates data first, adds 'updated' attribute and history model
	Returns the updated pregnancy center
 */
server.put(
	'/api/pregnancy-centers/:pregnancyCenterId',
	isLoggedInAPI,
	handleRejectedPromise(async (req, res) => {
		const pregnancyCenterId = req.params.pregnancyCenterId
		const pregnancyCenterData = req.body
		pregnancyCenterData['inVerification'] = null
		try {
			const updatedPregnancyCenter = await updatePregnancyCenter(
				req.user._id,
				pregnancyCenterId,
				pregnancyCenterData,
			)
			res.status(200).json(updatedPregnancyCenter)
		} catch (err) {
			return handleError(res, err)
		}
	}),
)

/*
	Updates an existing pregnancy center's out-of-business boolean, adds 'updated' attribute and history model
	Returns the updated pregnancy center
 */
server.put(
	'/api/pregnancy-centers/:pregnancyCenterId/out-of-business',
	isLoggedInAPI,
	handleRejectedPromise(async (req, res) => {
		const pregnancyCenterId = req.params.pregnancyCenterId
		// expected: req.body = { outOfBusiness: true | false }
		const outOfBusinessObj = req.body
		try {
			const updatedPregnancyCenter = await updatePregnancyCenterOutOfBusiness(
				req.user._id,
				pregnancyCenterId,
				outOfBusinessObj,
			)
			res.status(200).json(updatedPregnancyCenter)
		} catch (err) {
			return handleError(res, err)
		}
	}),
)

/*
	Updates an existing pregnancy center's do-not-list boolean, adds 'updated' attribute and history model
	Returns the updated pregnancy center
 */
server.put(
	'/api/pregnancy-centers/:pregnancyCenterId/do-not-list',
	isLoggedInAPI,
	handleRejectedPromise(async (req, res) => {
		const pregnancyCenterId = req.params.pregnancyCenterId
		// expected: req.body = { doNotList: true | false }
		const doNotListObj = req.body
		try {
			const updatedPregnancyCenter = await updatePregnancyCenterDoNotList(
				req.user._id,
				pregnancyCenterId,
				doNotListObj,
			)
			res.status(200).json(updatedPregnancyCenter)
		} catch (err) {
			return handleError(res, err)
		}
	}),
)

/*
	Takes in a query var time, which is in the format 'hhmm',
	and a query var day which is an integer where Monday is 1 and Sunday is 7
	Returns a list of pregnancy centers open now
 */
server.get(
	'/api/pregnancy-centers/open-now',
	isLoggedInAPI,
	handleRejectedPromise(async (req, res) => {
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
	}),
)

/*
	Returns the pregnancy center that matches the id
 */

server.get(
	'/api/pregnancy-centers/:pregnancyCenterId',
	isLoggedInAPI,
	handleRejectedPromise(async (req, res) => {
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
	}),
)

/*
 Returns one fqhc that needs verification
 */
server.get(
	'/api/fqhcs/verify',
	isLoggedInAPI,
	handleRejectedPromise(async (req, res) => {
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
	}),
)

/*
 Updates an existing fqhc, validates data first, adds 'updated' attribute and history model
 Returns the updated fqhc
 */
server.put(
	'/api/fqhcs/:fqhcId',
	isLoggedInAPI,
	handleRejectedPromise(async (req, res) => {
		const fqhcId = req.params.fqhcId
		const fqhcData = req.body
		fqhcData['inVerification'] = null
		try {
			const updatedFqhc = await updateFqhc(req.user._id, fqhcId, fqhcData)
			res.status(200).json(updatedFqhc)
		} catch (err) {
			return handleError(res, err)
		}
	}),
)

/*
	Updates an existing fqhc's out-of-business boolean, adds 'updated' attribute and history model
	Returns the updated fqhc
 */
server.put(
	'/api/fqhcs/:fqhcId/out-of-business',
	isLoggedInAPI,
	handleRejectedPromise(async (req, res) => {
		const fqhcId = req.params.fqhcId
		// expected: req.body = { outOfBusiness: true | false }
		const outOfBusinessObj = req.body
		try {
			const updatedFqhc = await updateFqhcOutOfBusiness(
				req.user._id,
				fqhcId,
				outOfBusinessObj,
			)
			res.status(200).json(updatedFqhc)
		} catch (err) {
			return handleError(res, err)
		}
	}),
)

/*
	Updates an existing fqhc's do-not-list boolean, adds 'updated' attribute and history model
	Returns the updated fqhc
 */
server.put(
	'/api/fqhcs/:fqhcId/do-not-list',
	isLoggedInAPI,
	handleRejectedPromise(async (req, res) => {
		const fqhcId = req.params.fqhcId
		// expected: req.body = { doNotList: true | false }
		const doNotListObj = req.body
		try {
			const updatedFqhc = await updateFqhcDoNotList(
				req.user._id,
				fqhcId,
				doNotListObj,
			)
			res.status(200).json(updatedFqhc)
		} catch (err) {
			return handleError(res, err)
		}
	}),
)

server.listen(port, function() {
	log.info(`Help Assist Her server listening on port ${port}`)
})

function handleError(res, err) {
	if (err.name === 'ValidationError' || err.name === 'AppValidationError') {
		return res.boom.badRequest(err.message)
	}
	return res.boom.badImplementation(err)
}

server.get('/api/auth/facebook/token', (req, res, next) => {
	passport.authenticate('facebook-token', (error, user) => {
		if (error || !user) {
			log.error(error)
			return res.boom.unauthorized('User is not logged in.')
		}

		if (req.sessionID && user) {
			req.logIn(user, () => {
				return res.status(200).json({ status: 'success' })
			})
		}
	})(req, res, next)
})

server.get('/api/login/check/', (req, res) => {
	if (req.sessionID && req.user) {
		return res.status(200).json({
			isLoggedIn: true,
			userDisplayName: req.user.displayName,
		})
	} else {
		return res.status(200).json({ isLoggedIn: false })
	}
})

server.get(
	'/api/logout',
	handleRejectedPromise(async (req, res) => {
		await releaseDocuments(req.user._id)
		req.logout()
		res.send(200)
	}),
)

function isLoggedInAPI(req, res, next) {
	// if user is authenticated in the session, carry on
	if (req.isAuthenticated()) return next()

	// if they aren't, return an http error
	res.boom.unauthorized('User is not logged in.')
}

module.exports = server
