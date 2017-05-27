'use strict'

const _ = require('lodash')
const bodyParser = require('body-parser')
const boom = require('express-boom')
const config = require('config')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const express = require('express')
const facebookTokenStrategy = require('passport-facebook-token')
const Joi = require('joi')
const Log = require('log')
const mongoose = require('mongoose')
const morgan = require('morgan')
const passport = require('passport')
const P = require('bluebird')
const session = require('express-session')

const PregnancyCenterHistoryModel = require('./pregnancy-center-history/schema/mongoose-schema')
const PregnancyCenterModel = require('./pregnancy-centers/schema/mongoose-schema')
const pregnancyCenterSchemaJoi = require('./pregnancy-centers/schema/joi-schema')
const UserModel = require('./users/schema/mongoose-schema')

const port = config.server.port
const server = express()
mongoose.Promise = require('bluebird')
const log = new Log('info')

server.use(boom())
server.use(express.static('public'))
server.use(cookieParser())
server.use(cors())
server.use(bodyParser.urlencoded())
server.use(bodyParser.json())
server.use(morgan('combined'))
server.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true
}))
server.use(passport.initialize())
server.use(passport.session())

passport.use(
	new facebookTokenStrategy({
		clientID: config.facebook.appId,
		clientSecret: config.facebook.appSecret,
		callbackURL: `${config.server.url}/auth/facebook/callback`
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
			if (err) { return done(err) }
			done(null, user)
		})
	}
))

passport.serializeUser((user, done) => {
	done(null, user._id)
})

passport.deserializeUser((objectId, done) => {
	UserModel.findOne({_id: objectId}, (err, user) => {
		done(err, user)
	})
})

// adapted from https://strongloop.com/strongblog/async-error-handling-expressjs-es7-promises-generators/
let handleRejectedPromise = fn => (...args) => fn(...args).catch((e) => {
	handleError(args[1], e)
})

// TODO: Error handling
const startDatabase = P.coroutine(function *startDatabase() {
	const connectionString = `mongodb://${config.server.hostname}/${config.database.name}`

	yield mongoose.connect(connectionString)

	log.info('Connected to database')
})

startDatabase()

/*
	Returns all pregnancy centers
	TODO: limits and paging, if necessary
 */
server.get('/api/pregnancy-centers', isLoggedInAPI, handleRejectedPromise(async (req, res) => {
	const allPregnancyCenters = await PregnancyCenterModel.find({})
	if (allPregnancyCenters) {
		res.status(200).json(allPregnancyCenters)
	}
}))

/*
	Takes in 'lng', 'lat', and 'miles' radius as query vars
	Returns pregnancy centers located within x miles radius of the circle centered at lng, lat
 */
server.get('/api/pregnancy-centers/near-me', isLoggedInAPI, handleRejectedPromise(async (req, res) => {
	const METERS_PER_MILE = 1609.34
	const lng = req.query.lng || -73.781332
	const lat = req.query.lat || 42.6721989
	const miles = req.query.miles || 5

	log.info({'lat': lat, 'lng': lng, 'miles': miles})

	const pregnancyCentersNearMe = await PregnancyCenterModel.find({
		'address.location': {
			$nearSphere: {
				$geometry: {
					type: 'Point',
					coordinates: [lng, lat]
				},
				$maxDistance: miles * METERS_PER_MILE
			}
		}
	})

	if (pregnancyCentersNearMe.length <= 0) {
		return res.boom.notFound(`No pregnancy centers found near lat ${lat}, lng ${lng}, miles ${miles}`)
	} else {
		res.status(200).json(pregnancyCentersNearMe)
	}
}))

/*
	Returns one pregnancy center that needs verification (currently defined as not having a verified address)
*/
server.get('/api/pregnancy-centers/verify', handleRejectedPromise(async (req, res) => {
	const pregnancyCenter = await PregnancyCenterModel.findOne({
		// 'verified.address': null,
	}).lean()

	if (!pregnancyCenter) {
		return res.boom.notFound('No pregnancy centers to verify')
	}

	// This adds in the primaryContact from a separate User Collection
	const primaryContactUserId = pregnancyCenter.primaryContactUserId

	if (primaryContactUserId) {
		const user = await UserModel.findOne({
			_id: primaryContactUserId,
		}).lean()

		if (!user) {
			return res.boom.notFound(`No user found by id: ${primaryContactUserId}`)
		}

		pregnancyCenter.primaryContactUser = {
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			phone: user.phone
		}
	}

	res.status(200).json(pregnancyCenter)
}))

server.post('/api/pregnancy-centers', isLoggedInAPI, handleRejectedPromise(async (req, res) => {
	const newPregnancyCenter = req.body

	const pregnancyCenterValidationObj = await Joi.validate(newPregnancyCenter, pregnancyCenterSchemaJoi, {
		abortEarly: false
	})

	// Joi.validate() returns an obj of form { error: null, value: validatedData}
	if (pregnancyCenterValidationObj.error) {
		return handleJoiValidationError(res, pregnancyCenterValidationObj.error)
	}

	const validatedPregnancyCenter = pregnancyCenterValidationObj.value
	try {
		const createdPregnancyCenter = new PregnancyCenterModel(validatedPregnancyCenter)
		await createdPregnancyCenter.save()

		res.status(201).json(createdPregnancyCenter)
	} catch (err) {
		return handleError(res, err)
	}
}))

/*
	Updates an existing pregnancy center, validates data first, adds 'updated' attribute and history model
	Returns the updated pregnancy center
 */
server.put('/api/pregnancy-centers/:pregnancyCenterId', isLoggedInAPI, handleRejectedPromise(async (req, res) => {
	const pregnancyCenterId = req.params.pregnancyCenterId

	if (!mongoose.Types.ObjectId.isValid(pregnancyCenterId)) {
		return res.boom.badRequest(`Invalid pregnancyCenterId ${pregnancyCenterId}`)
	}

	const pregnancyCenterValidationObj = await Joi.validate(req.body, pregnancyCenterSchemaJoi, {
		abortEarly: false
	})

	// await Joi.validate() returns an obj of form { error: null, value: validatedData}
	if (pregnancyCenterValidationObj.error) {
		return handleJoiValidationError(res, pregnancyCenterValidationObj.error)
	}
	const validatedPregnancyCenter = pregnancyCenterValidationObj.value
	const validatedDataWithUpdatedHistory = await createUpdateHistory(req, validatedPregnancyCenter)
	const pregnancyCenter = await PregnancyCenterModel.findByIdAndUpdate(pregnancyCenterId, {
		$set: validatedDataWithUpdatedHistory
	}, { new: true })

	if (!pregnancyCenter) {
		return res.boom.notFound(`Pregnancy Center not found with id ${pregnancyCenterId}`)
	}

	res.status(200).json(pregnancyCenter)
}))

/*
	Takes in a query var time, which is in the format 'hhmm',
	and a query var day which is an integer where Monday is 1 and Sunday is 7
	Returns a list of pregnancy centers open now
 */
server.get('/api/pregnancy-centers/open-now', isLoggedInAPI, handleRejectedPromise(async (req, res) => {
	const time = parseInt(req.query.time)
	const dayOfWeek = parseInt(req.query.day)
	const query = {}

	query['hours.' + dayOfWeek] = {
		$elemMatch: {
			open: {$lte: time},
			close: {$gte: time}
		}
	}
	log.info(JSON.stringify(query))

	const pregnancyCentersOpenNow = await PregnancyCenterModel.find(query)
	if (pregnancyCentersOpenNow.length <= 0) {
		return res.boom.notFound(`No pregnancy centers open now ${dayOfWeek} ${time}`)
	}

	res.status(200).json(pregnancyCentersOpenNow)
}))

/*
	Returns the pregnancy center that matches the id
 */

server.get('/api/pregnancy-centers/:pregnancyCenterId', isLoggedInAPI, handleRejectedPromise(async (req, res) => {
	const pregnancyCenterId = req.params.pregnancyCenterId

	if (!mongoose.Types.ObjectId.isValid(pregnancyCenterId)) {
		return res.boom.badRequest(`Invalid pregnancyCenterId: ${pregnancyCenterId}`)
	}

	const pregnancyCenter = await PregnancyCenterModel.findById(pregnancyCenterId)

	if (!pregnancyCenter) {
		return res.boom.notFound(`No pregnancy center found with id: ${pregnancyCenterId}`)
	}

	res.status(200).json(pregnancyCenter)
}))

server.listen(port, function () {
	log.info(`Help Assist Her server listening on port ${port}`)
})

function handleJoiValidationError(res, err) {
	log.error(err)
	const data = _.clone( err['_object'])
	delete err['_object']
	return res.boom.badRequest(err, data)
}

function handleError(res, err) {
	log.error(err)
	return res.boom.badImplementation()
}

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

function createUpdateHistory(req, pregnancyCenterRawObj) {

	return new P( async (resolve, reject) => {
		const pregnancyCenterId = req.params['pregnancyCenterId']
		const pregnancyCenterRawObjWithStamps = removeMongooseKeys(_.clone(pregnancyCenterRawObj))

		let oldPregnancyCenterObj = await PregnancyCenterModel.findById(pregnancyCenterId)
		if (!oldPregnancyCenterObj) {
			reject()
		}

		oldPregnancyCenterObj = oldPregnancyCenterObj.toObject()

		_.forOwn(pregnancyCenterRawObj, (value, key) => {

			// check that the 'new' data isn't exactly the same as old
			// this prevents us from creating histories for an update with same exact data
			if (!keysToIgnore.includes(key) && !isEqualMongoose(oldPregnancyCenterObj[key],value)) {
				if (oldPregnancyCenterObj.hasOwnProperty('updated')) {
					pregnancyCenterRawObjWithStamps['updated'] = oldPregnancyCenterObj['updated']
				} else {
					pregnancyCenterRawObjWithStamps['updated'] = {}
				}
				pregnancyCenterRawObjWithStamps['updated'][key] = {
					userId: req.user._id,
					date: new Date().toISOString()
				}

				const pregnancyCenterHistoryObj = new PregnancyCenterHistoryModel({
					pregnancyCenterId: pregnancyCenterId,
					field: key,
					newValue: value,
					oldValue: oldPregnancyCenterObj[key],
					userId: req.user._id,
				})
				pregnancyCenterHistoryObj.save()
			}
		})

		resolve(pregnancyCenterRawObjWithStamps)

	})
}

server.get('/auth/facebook/token', passport.authenticate('facebook-token'), (req, res) => {
	if (req.user) {
		res.status(200).json('Authentication successful.')
	} else {
		res.boom.unauthorized('User is not logged in.')
	}
})

server.get('/logout', (req, res) => {
	req.logout()
	res.send(200)
})

function isLoggedInAPI(req, res, next) {
	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next()

	// if they aren't, return an http error
	res.boom.unauthorized('User is not logged in.')
}

module.exports = server
