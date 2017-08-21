'use strict'

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

const PregnancyCenterModel = require('./pregnancy-centers/schema/mongoose-schema')
const UserModel = require('./users/schema/mongoose-schema')

const databaseHelpers = require('./util/database-helpers')
const checkPregnancyCenterId = databaseHelpers.checkPregnancyCenterId
const createPregnancyCenter = databaseHelpers.createPregnancyCenter
const updatePregnancyCenter = databaseHelpers.updatePregnancyCenter

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
server.use(session({
	secret: config.session.secret,
	resave: false,
	saveUninitialized: false,
	name: 'sessionId',
	store: new MongoStore({ mongooseConnection: mongoose.connection })
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
	yield mongoose.connect(config.mongo.connectionString)

	log.info('Connected to database')
})

startDatabase()

server.get('/verification', (req, res) => {
	res.sendFile(path.join(__dirname, '../public/index.html'))
})

server.get('/api/initial-data', (req, res) => {
	return res.status(200).json({
		'facebookAppId': config.facebook.appId,
	})
})

/*
	Returns all pregnancy centers
	TODO: limits and paging, if necessary
 */
server.get('/api/pregnancy-centers', isLoggedInAPI, handleRejectedPromise(async (req, res) => {
	const allPregnancyCenters = await PregnancyCenterModel.find({}).populate('primaryContactPerson').lean()
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
	}).populate('primaryContactPerson').lean()

	if (pregnancyCentersNearMe.length <= 0) {
		return res.boom.notFound(`No pregnancy centers found near lat ${lat}, lng ${lng}, miles ${miles}`)
	} else {
		res.status(200).json(pregnancyCentersNearMe)
	}
}))

/*
	Returns one pregnancy center that needs verification (currently defined as not having a verified address)
*/
server.get('/api/pregnancy-centers/verify', isLoggedInAPI, handleRejectedPromise(async (req, res) => {
	const pregnancyCenter = await PregnancyCenterModel.findOne({}).populate('primaryContactPerson').lean()

	if (!pregnancyCenter) {
		return res.boom.notFound('No pregnancy centers to verify')
	}

	res.status(200).json(pregnancyCenter)
}))

server.post('/api/pregnancy-centers', isLoggedInAPI, handleRejectedPromise(async (req, res) => {
	const newPregnancyCenter = req.body

	try {
		const createdPregnancyCenter = await createPregnancyCenter(newPregnancyCenter)
		res.status(201).json(createdPregnancyCenter)
	} catch (err) {
		return handleError(res, err)
	}
}))

/*
	Updates an existing pregnancy center, validates data first, adds 'updated' attribute and history model
	Returns the updated pregnancy center
 */
server.put('/api/pregnancy-centers/:pregnancyCenterId', isLoggedInAPI, checkPregnancyCenterId, handleRejectedPromise(async (req, res) => {
	const pregnancyCenterId = req.params.pregnancyCenterId

	try {
		const updatedPregnancyCenter = await updatePregnancyCenter(req.user._id, pregnancyCenterId, req.body)
		res.status(200).json(updatedPregnancyCenter)
	} catch (err) {
		return handleError(res, err)
	}
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

	query['hours.' + dayOfWeek + '.open'] = {
		$lte: time
	}
	query['hours.' + dayOfWeek + '.close'] = {
		$gte: time
	}
	
	const pregnancyCentersOpenNow = await PregnancyCenterModel.find(query).populate('primaryContactPerson').lean()
	if (pregnancyCentersOpenNow.length <= 0) {
		return res.boom.notFound(`No pregnancy centers open now ${dayOfWeek} ${time}`)
	}

	res.status(200).json(pregnancyCentersOpenNow)
}))

/*
	Returns the pregnancy center that matches the id
 */

server.get('/api/pregnancy-centers/:pregnancyCenterId', isLoggedInAPI, checkPregnancyCenterId, handleRejectedPromise(async (req, res) => {
	const pregnancyCenterId = req.params.pregnancyCenterId

	const pregnancyCenter = await PregnancyCenterModel.findById(pregnancyCenterId).populate('primaryContactPerson').lean()

	if (!pregnancyCenter) {
		return res.boom.notFound(`No pregnancy center found with id: ${pregnancyCenterId}`)
	}

	res.status(200).json(pregnancyCenter)
}))

server.listen(port, function () {
	log.info(`Help Assist Her server listening on port ${port}`)
})

function handleError(res, err) {
	log.error(err)
	return res.boom.badImplementation(err)
}

server.get(
	'/api/auth/facebook/token',
	(req, res, next) => {
		passport.authenticate('facebook-token', (error, user) => {
			if (error || !user) {
				res.boom.unauthorized('User is not logged in.')
			}
			if (req.sessionID && user) {
				req.logIn(user, () => {
					res.status(200).json({ 'status': 'success'})
				})
			}
			next()
		})(req, res, next)
	}
)

server.get('/api/login/check/', (req, res) =>{
	if (req.sessionID && req.user) {
		return res.status(200).json({ 'isLoggedIn': true})
	} else {
		return res.status(200).json({ 'isLoggedIn': false})
	}
})

server.get('/api/logout', (req, res) => {
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
