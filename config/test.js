'use strict'

module.exports = {
	facebook: {
		appId: process.env.VERIFICATION_PORTAL_FACEBOOK_APP_ID,
		appSecret: process.env.VERIFICATION_PORTAL_FACEBOOK_APP_SECRET,
	},
	mapbox: {
		accessToken: 'pk.eyJ1Ijoia2FyZW5tcm9zZSIsImEiOiJjaXd6bWoyeXowMGg2MnRvNnlncWE0azZsIn0.R61g_76oVqY3Jg7ob4kSsA',
	},
	mongo: {
		connectionString: process.env.MONGO_DB_CONNECTION,
	},
	server: {
		hostname: 'localhost',
		port: 4000,
		protocol: 'https',
		url: 'http://localhost:4000',
	},
}
