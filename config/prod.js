'use strict'

module.exports = {
	facebook: {
		appId: process.env.FACEBOOK_APP_ID,
		appSecret: process.env.FACEBOOK_APP_SECRET,
	},
	server: {
		hostname: 'hah-dev.herokuapp.com',
		port: process.env.PORT,
		protocol: 'https',
		url: 'https://hah-dev.herokuapp.com',
	},
}
