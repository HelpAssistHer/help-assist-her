'use strict'

module.exports = {
	facebook: {
		appId: process.env.VERIFICATION_PORTAL_FACEBOOK_APP_ID,
		appSecret: process.env.VERIFICATION_PORTAL_FACEBOOK_APP_SECRET,
	},
	googleMaps: {
		key: process.env.VERIFICATION_PORTAL_GOOGLE_MAPS_KEY,
	},
	mongo: {
		connectionString: process.env.MONGO_DB_CONNECTION,
	},
	session: {
		secret:  process.env.SESSION_SECRET,
	},
}
