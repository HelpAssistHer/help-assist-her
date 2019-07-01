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

const UserModel = require('./users/schema/mongoose-schema')

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
					providerPictureUrl: _.get(profile, 'photos[0].value'),
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

// TODO: Error handling
const startDatabase = P.coroutine(function* startDatabase() {
	yield mongoose.connect(config.mongo.connectionString)

	log.info('Connected to database')
})

startDatabase()

// anything beginning with "/api" will go into this
server.use('/api', require('./routes/api'))

server.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, '../public/index.html'))
})

server.listen(port, function() {
	log.info(`Help Assist Her server listening on port ${port}`)
})

module.exports = server
