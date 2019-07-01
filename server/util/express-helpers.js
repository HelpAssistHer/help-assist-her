const isLoggedInAPI = (req, res, next) => {
	// if user is authenticated in the session, carry on
	if (req.isAuthenticated()) return next()

	// if they aren't, return an http error
	res.boom.unauthorized('User is not logged in.')
}

const handleError = (res, err) => {
	if (err.name === 'ValidationError' || err.name === 'AppValidationError') {
		return res.boom.badRequest(err.message)
	}
	return res.boom.badImplementation(err)
}

module.exports = {
	isLoggedInAPI,
	handleError,
}
