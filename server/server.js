'use strict'

const _ = require('lodash')
const bodyParser = require('body-parser')
const boom = require('express-boom')
const compression = require('compression')
const config = require('config')
const cors = require('cors')
const express = require('express')
const facebookTokenStrategy = require('passport-facebook-token')
const Log = require('log')
const morgan = require('morgan')
const passport = require('passport')
const path = require('path')
const session = require('express-session')

const UserModel = require('./users/schema/mongoose-schema')

const port = config.server.port
const app = express()

const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')
mongoose.set('useNewUrlParser', true)
mongoose.set('useUnifiedTopology', true)
mongoose.set('useFindAndModify', false)

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

	app.use(cors(corsOptions))
}

app.use(compression())
app.use(boom())
app.use(express.static('public'))
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())
app.use(morgan('combined'))
app.use(
	session({
		secret: config.session.secret,
		resave: false,
		saveUninitialized: false,
		name: 'sessionId',
		store: new MongoStore({ mongooseConnection: mongoose.connection }),
	}),
)
app.use(passport.initialize())
app.use(passport.session())

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

const startDatabase = async () => {
	await mongoose.connect(config.mongo.connectionString, (err, client) => {
		if (err) {
			log.error('Unable to connect to mongo database', err)
		} else {
			log.info('Successfully connected to database', client.name)
		}
	})
}

startDatabase()

// anything beginning with "/api" will go into this
app.use('/api', require('./routes/api'))

app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, '../public/index.html'))
})

const server = app.listen(port, function() {
	log.info(`Help Assist Her server listening on port ${port}`)
})

module.exports = { server, app }
