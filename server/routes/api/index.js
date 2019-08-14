const router = require('express').Router()
const passport = require('passport')
const Log = require('log')
const config = require('config')

const { releaseDocuments } = require('../../util/actions')

const log = new Log('info')

// split up route handling
router.use('/pregnancy-centers', require('./pregnancy-centers'))
router.use('/fqhcs', require('./fqhcs'))

router.get('/auth/facebook/token', (req, res, next) => {
	passport.authenticate('facebook-token', (error, user) => {
		if (error || !user) {
			log.error(error)
			return res.boom.unauthorized('User is not logged in.')
		}

		if (req.sessionID && user) {
			req.logIn(user, () => {
				return res.status(200).json({ status: 'success' })
			})
		}
	})(req, res, next)
})

router.get('/login/check/', (req, res) => {
	if (req.sessionID && req.user) {
		return res.status(200).json({
			isLoggedIn: true,
			userDisplayName: req.user.displayName,
		})
	} else {
		return res.status(200).json({ isLoggedIn: false })
	}
})

router.get('/logout', async (req, res) => {
	await releaseDocuments(req.user._id)
	req.logout()
	res.send(200)
})

router.get('/initial-data', (req, res) => {
	return res.status(200).json({
		facebookAppId: config.facebook.appId,
		googleMapsApiKey: config.googleMaps.key,
	})
})

module.exports = router
