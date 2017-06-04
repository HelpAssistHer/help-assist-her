'use strict'

module.exports = {
	corsOriginWhitelist: ['http://localhost:8080', undefined],
	facebook: {
		appId: '1601964419836286',
		appSecret: 'bea155559b6f1ded719805047d0989d7',
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
