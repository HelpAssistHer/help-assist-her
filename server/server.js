'use strict'

const config = require('config')
const cors = require('cors')
const express = require('express')
const Log = require('log')
const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')
const P = require('bluebird')
const bodyParser = require('body-parser')
const Joi = require('joi')
const boom = require('express-boom')
const session = require('express-session')
const cookieParser = require('cookie-parser')

const moment = require('moment')

const server = express()
server.use(boom())
const port = config.server.port
const log = new Log('info')
const PregnancyCenterModel = require('./pregnancy-centers/schema/mongoose-schema')
const PregnancyCenterHistoryModel = require('./pregnancy-center-history/schema/mongoose-schema')
const passport = require('passport')
	, FacebookStrategy = require('passport-facebook').Strategy
const UserModel = require('./users/schema/mongoose-schema')
const pregnancyCenterSchemaJoi = require('./pregnancy-centers/schema/joi-schema')
const hoursUtils = require('./pregnancy-centers/utils/utils')
const _ = require('lodash')

server.use(express.static('public'))
server.use(cookieParser())
server.use(cors())
server.use(bodyParser.urlencoded())
server.use(bodyParser.json())
server.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true
}))
server.use(passport.initialize())
server.use(passport.session())

passport.use(
	new FacebookStrategy({
		clientID: config.facebook.appId,
		clientSecret: config.facebook.appSecret,
		callbackURL: 'http://127.0.0.1:4000/auth/facebook/callback'
	},
	function(accessToken, refreshToken, profile, done) {

		const query = { providerId: profile.id },
			update = {
				provider: profile.provider,
				providerId: profile.id,
				displayName: profile.displayName,
			},
			options = { upsert: true, new: true, setDefaultsOnInsert: true }

		// Find the document
		UserModel.findOneAndUpdate(query, update, options, function (err, user) {
			if (err) { return done(err) }
			done(null, user)
		})
	}
))

passport.serializeUser(function(user, done) {
	done(null, user._id)
})

passport.deserializeUser(function(objectId, done) {
	UserModel.findOne({_id: objectId}, (err, user) => {
		done(err, user)
	})
})

// TODO: Error handling
const startDatabase = P.coroutine(function *startDatabase() {
	const connectionString = `mongodb://${config.server.hostname}/${config.database.name}`

	yield mongoose.connect(connectionString)

	log.info('Connected to database')

})

startDatabase()

server.get('/', function (req, res) {
	res.send('Hello World!')
})

/*
	Returns all pregnancy centers
	TODO: limits and paging, if necessary
 */

server.get('/api/pregnancy-centers', isLoggedInAPI, async (req, res) => {
	const allPregnancyCenters = await PregnancyCenterModel.find({})
	if (allPregnancyCenters) {
		res.status(200).json(allPregnancyCenters)
	}
})

/*
	Takes in 'lng', 'lat', and 'miles' radius as query vars
	Returns pregnancy centers located within x miles radius of the circle centered at lng, lat
 */

server.get('/api/pregnancy-centers/near-me', isLoggedInAPI, async (req, res) => {

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
	if (!pregnancyCentersNearMe) {
		return res.boom.notFound()
	} else {
		res.status(200).json(pregnancyCentersNearMe)
	}
})

/*
	Returns one pregnancy center that needs verification (currently defined as not having a verified address)
 */

server.get('/api/pregnancy-centers/verify', isLoggedInAPI, async (req, res) => {

	// Find a pregnancy center that does not have a verified address

	const pregnancyCenter = await PregnancyCenterModel.findOne({
		'verified.address': null,
	})
		.lean()

	if (!pregnancyCenter) {
		return res.boom.notFound() // we need a return here, otherwise the next line will be exec as well
	}

	// This adds in the primaryContact from a separate User Collection
	const primaryContact = pregnancyCenter.primaryContact

	if (primaryContact) {

		const user = await UserModel.findOne({
			_id: primaryContact,
		})
			.lean()

		if (user) { // we only want to try to reference the attributes if user exists
			pregnancyCenter.primaryContactUser = {
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
				phone: user.phone,
			}
		}
	}

	res.status(200).json(pregnancyCenter)

})

server.post('/api/pregnancy-centers', isLoggedInAPI, async (req, res) => {

	// Note: Anything instantiated in a try block and defined as const will only exist in that block!
	let createdPregnancyCenter

	// Validate the pregnancyCenter data - the entire req.body should be a pregnancy center

	const pregnancyCenterValidationObj = await Joi.validate(req.body, pregnancyCenterSchemaJoi, {
		abortEarly: false
	})

	// await Joi.validate() returns an obj of form { error: null, value: validatedData}
	if (pregnancyCenterValidationObj.error) {
		return handleJoiValidationError(res, pregnancyCenterValidationObj.error)
	}
	const validatedPregnancyCenter = pregnancyCenterValidationObj.value

	// if validated, create the pregnancy center instance
	try {
		createdPregnancyCenter = new PregnancyCenterModel(validatedPregnancyCenter)
		await createdPregnancyCenter.save()
	} catch (err) {
		return handleDatabaseError(res, err)
	}

	res.status(201).json(createdPregnancyCenter)
})

/*
	Updates an existing pregnancy center, validates data first, adds 'updated' attribute and history model
	Returns the updated pregnancy center
 */

server.put('/api/pregnancy-centers/:pregnancyCenterId', isLoggedInAPI, async (req, res) => {

	if (!mongoose.Types.ObjectId.isValid(req.params['pregnancyCenterId'])) {
		return res.boom.badRequest('Invalid pregnancyCenterId. Id must be a ObjectId.')
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
	const pregnancyCenter = await PregnancyCenterModel.findByIdAndUpdate(req.params['pregnancyCenterId'], { $set: validatedDataWithUpdatedHistory}, { new: true })

	if (!pregnancyCenter) {
		return res.boom.notFound()
	}

	res.status(200).json(pregnancyCenter)

})

/*
	Takes in an option query var 'date' or uses the current datetime
	Returns a list of pregnancy centers open now
 */
server.get('/api/pregnancy-centers/open-now', isLoggedInAPI, async (req, res) => {
	const today = moment(req.query.date) || moment()
	const dayOfWeek = today.day()
	const time = hoursUtils.getGoogleFormatTime(today)
	const query = {}

	query['hours.' + dayOfWeek] = {
		$elemMatch: {
			open: {$lte: time},
			close: {$gte: time}
		}
	}

	const pregnancyCentersOpenNow = await PregnancyCenterModel.find(query)
	if (!pregnancyCentersOpenNow) {
		return res.boom.notFound()
	}
	res.status(200).json(pregnancyCentersOpenNow)
})

/*
	Returns the pregnancy center that matches the id
 */

server.get('/api/pregnancy-centers/:pregnancyCenterId', isLoggedInAPI, async (req, res) => {
	if (!mongoose.Types.ObjectId.isValid(req.params['pregnancyCenterId'])) {
		return res.boom.badRequest('Invalid id. id must be a ObjectId.')
	}

	const pregnancyCenter = await PregnancyCenterModel.findById(req.params['pregnancyCenterId'])

	if (!pregnancyCenter) {
		return res.boom.notFound()
	}
	res.status(200).json(pregnancyCenter)
})

server.listen(port, function () {
	log.info(`Help Assist Her server listening on port ${port}`)
})

// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
server.get('/auth/facebook', passport.authenticate('facebook'))

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
server.get('/auth/facebook/callback',
	passport.authenticate('facebook', {
		successRedirect: 'http://localhost:8080/verification',
		failureRedirect: '/login'
	})
)

server.get('/logout', (req, res) => {
	req.logout()
	res.redirect('http://localhost:8080/')
})

function isLoggedInAPI(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next()

	// if they aren't, return an http error
	res.boom.unauthorized('User is not logged in.')
}

function handleJoiValidationError(res, err) {
	log.error(err)
	const data = _.clone( err['_object'])
	delete err['_object']
	return res.boom.badRequest(err, data)
}

function handleDatabaseError(res, err) {
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

module.exports = server
