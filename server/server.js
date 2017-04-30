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
P.promisifyAll(Joi)
P.promisifyAll(mongoose)
const boom = require('express-boom')
const session = require('express-session')
const cookieParser = require('cookie-parser')

const moment = require('moment')

const server = express()
server.use(boom())
const port = config.server.port
const log = new Log('info')
const PregnancyCenterModel = require('../app/models/pregnancy-center')
const PregnancyCenterHistoryModel = require('../app/models/pregnancy-center-history')
const passport = require('passport')
	, FacebookStrategy = require('passport-facebook').Strategy
const UserModel = require('../app/models/user')
const pregnancyCenterSchemaJoi = require('../app/schemas/pregnancy-center')
const hoursUtils = require('../utils/utils')
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
		clientID: process.env.V_FACEBOOK_APP_ID,
		clientSecret: process.env.V_FACEBOOK_APP_SECRET,
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

server.get('/api/pregnancy-centers', isLoggedInAPI, function (req, res) {
	PregnancyCenterModel.find({}, function (err, allPregnancyCenters) {
		if (err) {
			log.error(err)
			res.boom.badImplementation()
		} else {
			res.send(allPregnancyCenters)
		}

	})
})

server.get('/api/pregnancy-centers/near-me', isLoggedInAPI, function (req, res) {

	const METERS_PER_MILE = 1609.34

	const lng = req.query.lng || -73.781332
	const lat = req.query.lat || 42.6721989
	const miles = req.query.miles || 5

	PregnancyCenterModel.find({
		'address.location': {
			$nearSphere: {
				$geometry: {
					type: 'Point',
					coordinates: [lng, lat]
				},
				$maxDistance: miles * METERS_PER_MILE
			}
		}
	}, function (err, pregnancyCentersNearMe) {
		if (err) {
			log.error(err)
			res.boom.badImplementation()
		} else if (!pregnancyCentersNearMe) {
			res.boom.notFound()
		} else {
			res.status(200).json(pregnancyCentersNearMe)
		}
	})
})

server.get('/api/pregnancy-centers/verify', isLoggedInAPI, function (req, res) {

	// We can change the search conditions in the future based on how recently the pregnancy center
	// has been verified and what attributes were verified

	PregnancyCenterModel.findOneAsync({'verified.address': null})
		.then( (pregnancyCenterToVerify) => {
			if (!pregnancyCenterToVerify) {
				res.boom.notFound()
			} else {
				res.status(200).json(pregnancyCenterToVerify)
			}
		}).catch( (err) => handleDatabaseError(res, err))
})

server.post('/api/pregnancy-centers', isLoggedInAPI, function (req, res) {
	Joi.validate(req.body, pregnancyCenterSchemaJoi, {
		abortEarly: false
	}, function(err, result) {
		if (err) {
			handleJoiValidationError(res, err)
		} else {
			PregnancyCenterModel.create(result, function (err, result) {
				if (err) {
					log.error(err)
					res.boom.badImplementation()
				} else {
					res.status(201).json(result)
				}

			})
		}

	})

})

server.put('/api/pregnancy-centers/:pregnancyCenterId', isLoggedInAPI, (req, res) => {

	if (!mongoose.Types.ObjectId.isValid(req.params['pregnancyCenterId'])) {
		res.boom.badRequest('Invalid pregnancyCenterId. Id must be a ObjectId.')
	}

	Joi.validateAsync(req.body, pregnancyCenterSchemaJoi, {
		abortEarly: false
	})
		.catch((err) => handleJoiValidationError(res, err))
		.then( (validatedData) => createUpdateHistory(req, validatedData))
		.then( (updatedValidatedData) => {

			PregnancyCenterModel.updateAsync(
				{_id: req.params['pregnancyCenterId']},
				updatedValidatedData,
				{runValidators: true }
			).then( (updateInfoFromMongo) => {
				if (updateInfoFromMongo.nModified != 1) {
					handleDatabaseError(res, Error('Update was expected but failed or modified more than one.'))
				}
			}).then( () => {
				PregnancyCenterModel.findByIdAsync(req.params['pregnancyCenterId'])
					.then( (pregnancyCenterUpdated) => res.status(200).json(pregnancyCenterUpdated))
					.catch((err) => handleDatabaseError(res, err))
			}).catch((err) => handleDatabaseError(res, err))

		})
})

server.get('/api/pregnancy-centers/open-now', isLoggedInAPI, function (req, res) {
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
	PregnancyCenterModel.find(query, function (err, pregnancyCentersOpenNow) {
		if (err) {
			log.error(err)
			res.boom.badImplementation()
		} else if (!pregnancyCentersOpenNow) {
			res.boom.notFound()
		} else {
			res.status(200).json(pregnancyCentersOpenNow)
		}
	})
})

server.get('/api/pregnancy-centers/:pregnancyCenterId', isLoggedInAPI, function (req, res) {
	if (mongoose.Types.ObjectId.isValid(req.params['pregnancyCenterId'])) {
		PregnancyCenterModel.findById(req.params['pregnancyCenterId'], function (err, pregnancyCenter) {
			if (err) {
				log.error(err)
				res.boom.badImplementation()
			} else if (!pregnancyCenter) {
				res.boom.notFound()
			} else {
				res.status(200).json(pregnancyCenter)
			}
		})
	} else {
		res.boom.badRequest('Invalid id. id must be a ObjectId.')
	}
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

	return new P( (resolve, reject) => {
		const pregnancyCenterId = req.params['pregnancyCenterId']
		const pregnancyCenterRawObjWithStamps = removeMongooseKeys(_.clone(pregnancyCenterRawObj))

		PregnancyCenterModel.findByIdAsync(pregnancyCenterId)
			.catch( (err) => reject(err))
			.then( (oldObj) => {

				oldObj = oldObj.toObject()

				_.forOwn(pregnancyCenterRawObj, (value, key) => {

					// if the 'new' data doesn't match old
					// this prevents us from creating histories for an update with same exact data

					if (!keysToIgnore.includes(key) && !isEqualMongoose(oldObj[key],value)) {
						if (oldObj.hasOwnProperty('updated')) {
							pregnancyCenterRawObjWithStamps['updated'] = oldObj['updated']
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
							oldValue: oldObj[key],
							userId: req.user._id,
						})
						pregnancyCenterHistoryObj.save()
					}
				})

				resolve(pregnancyCenterRawObjWithStamps)
			})
	})
}

module.exports = server
