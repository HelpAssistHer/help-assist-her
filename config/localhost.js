'use strict'

module.exports = {
	corsOriginWhitelist: ['http://localhost:8080'],
	facebook: {
		appId: '1312011635554544',
		appSecret: '2e89815b8b92f022100a2d8c65e877b2',
	},
	mapbox: {
		accessToken: 'pk.eyJ1Ijoia2FyZW5tcm9zZSIsImEiOiJjaXd6bWoyeXowMGg2MnRvNnlncWE0azZsIn0.R61g_76oVqY3Jg7ob4kSsA',
	},
	mongo: {
		connectionString: 'mongodb://localhost/hah-dev',
	},
	server: {
		hostname: 'localhost',
		port: 4000,
		protocol: 'https',
		url: 'http://localhost:4000'
	},
	session: {
		secret: 'rjH(GrYYgPNuMyvP8K6N^gnwAiefksRFWkxbLcznqVvpFmVnGP7QLE)WFuymjZ',
	},
}
