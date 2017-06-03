'use strict'

module.exports = {
	database: {
		name: 'hah-test'
	},
	facebook: {
		appId: process.env.VERIFICATION_PORTAL_FACEBOOK_APP_ID,
		appSecret: process.env.VERIFICATION_PORTAL_FACEBOOK_APP_SECRET,
	},
	mapbox: {
		accessToken: 'pk.eyJ1Ijoia2FyZW5tcm9zZSIsImEiOiJjaXd6bWoyeXowMGg2MnRvNnlncWE0azZsIn0.R61g_76oVqY3Jg7ob4kSsA',
	},
	server: {
		hostname: 'localhost',
		port: 4000,
		protocol: 'https',
		url: 'http://localhost:4000',
		originWhitelist: ['http://localhost:8080']
	},
	session: {
		secret:  process.env.SESSION_SECRET,
	},
}
