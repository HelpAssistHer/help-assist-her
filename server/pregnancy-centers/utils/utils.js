'use strict'

function pad(str, max) {
	str = str.toString()
	return str.length < max ? pad('0' + str, max) : str
}

module.exports.getGoogleFormatTime = function (moment_date) {
	return parseInt('' + moment_date.get('hour') + pad(moment_date.get('minutes'), 2))
}
