'use strict'

const config = require('config')
const cors = require('cors')
const express = require('express')
const Log = require('log')
const mongoose = require('mongoose')
const P = require('bluebird')
const bodyParser = require('body-parser')
const session = require('express-session')
const cookieParser = require('cookie-parser')

const server = express()
const port = config.server.port
const log = new Log('info')
const PregnancyCenterModel = require('../app/models/pregnancy-center')
const passport = require('passport')
	, FacebookStrategy = require('passport-facebook').Strategy
const UserModel = require('../app/models/user')

mongoose.Promise = require('bluebird')

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

		log.info(profile)

		const query = { providerId: profile.id },
			update = {
				provider: profile.provider,
				providerId: profile.id,
				displayName: profile.displayName,
			},
			options = { upsert: true, new: true, setDefaultsOnInsert: true };

		// Find the document
		UserModel.findOneAndUpdate(query, update, options, function (err, user) {
			if (err) { return done(err) }
			done(null, user)
		})

	}
))

passport.serializeUser(function(user, done) {
	done(null, user.providerId)
})

passport.deserializeUser(function(providerId, done) {
	log.info('inside deserializeUser, providerId: '+providerId)
	UserModel.find({providerId: providerId}, function(err, user) {
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

server.get('/api/pregnancy-centers', function (req, res) {
	PregnancyCenterModel.find({}, function (err, allPregnancyCenters) {
		if (err) {
			log.error(err)
		}
		res.send(allPregnancyCenters)
	})
})

// temporarily hardcoded for testing GeoJSON
// to test, navigate to /data and run "node data", then run the server and access this endpoint

server.get('/api/pregnancy-centers/near-me', function (req, res) {

	const METERS_PER_MILE = 1609.34

	PregnancyCenterModel.find({
		location: {
			$nearSphere: {
				$geometry: {
					type: 'Point',
					coordinates: [-73.781332, 42.6721989]
				},
				$maxDistance: 5 * METERS_PER_MILE
			}
		}
	}, function (err, pregnancyCentersNearMe) {
		if (err) {
			log.error(err)
		}
		res.status(200).json(pregnancyCentersNearMe)
	})
})

server.get('/api/pregnancy-centers/verify', function (req, res) {

	// We can change the search conditions in the future based on how recently the pregnancy center has been verified ...
	// and what attributes were verified

	log.info(req.user)

	PregnancyCenterModel.findOne({'verified.address': null}, function (err, pregnancyCenterToVerify) {
		if (err) {
			log.error(err)
		}
		res.status(200).json(pregnancyCenterToVerify)
	})
})

server.post('/api/pregnancy-centers', function (req, res) {
	PregnancyCenterModel.create(req.body, function (err, result) {
		if (err) {
			log.error(err)
		}
		res.status(204).json(result)
	})
})

server.put('/api/pregnancy-centers/:pregnancyCenterId', function (req, res) {
	PregnancyCenterModel.update({_id: req.params['pregnancyCenterId']}, req.body, function (err, pregnancyCenterUpdated) {
		if (err) {
			log.error(err)
		} else {
			res.status(200).json(pregnancyCenterUpdated)
		}
	})
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
	passport.authenticate('facebook', { successRedirect: '/',
		failureRedirect: '/login' }))