'use strict'

module.exports = {
	facebook: {
		appId: process.env.VERIFICATION_PORTAL_FACEBOOK_APP_ID,
		appSecret: process.env.VERIFICATION_PORTAL_FACEBOOK_APP_SECRET,
	},
	mongo: {
		connectionString: process.env.MONGO_DB_CONNECTION,
	},
	server: {
		hostname: 'hah-stage.herokuapp.com',
		port: process.env.PORT,
		protocol: 'https',
		url: 'https://hah-stage.herokuapp.com',
	},
	session: {
		secret:  process.env.SESSION_SECRET,
	},
}
