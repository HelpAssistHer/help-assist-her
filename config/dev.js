'use strict'

module.exports = {
	corsOriginWhitelist: ['https://hah-dev.herokuapp.com'],
	facebook: {
		appId: process.env.VERIFICATION_PORTAL_FACEBOOK_APP_ID,
		appSecret: process.env.VERIFICATION_PORTAL_FACEBOOK_APP_SECRET,
	},
	mongo: {
		connectionString: process.env.MONGO_DB_CONNECTION,
	},
	server: {
		hostname: 'hah-dev.herokuapp.com',
		port: process.env.PORT,
		protocol: 'https',
		url: 'https://hah-dev.herokuapp.com',
	},
	session: {
		secret:  process.env.SESSION_SECRET,
	},
}
