'use strict'

const moment = require('moment')
module.exports = {}
module.exports.createQueryableSeconds = function (moment_date) {
	return ((moment_date.get('hour') * 60 * 60) + moment_date.get('minutes') * 60)
}
module.exports.createReadableTime = function (secondsSinceStart) {
	const hours = secondsSinceStart / 3600  // needs to be an integer division
	const leaves = secondsSinceStart - hours * 3600
	const minutes = leaves / 60
	return moment({hour: hours, minute: minutes}).format('h:mmA')
}
module.exports.getHumanReadableHours = function (queryableHours) {
	let readableHours = {}
	const days = {
		1: 'mon',
		2: 'tue',
		3: 'wed',
		4: 'thurs',
		5: 'fri',
		6: 'sat',
		7: 'sun'
	}
	for (let day in queryableHours) {
		if (queryableHours.hasOwnProperty(day)) {
			let hours = queryableHours[day]
			let new_hours = []
			for (let hourspan of hours) {
				new_hours.push({
					'open': module.exports.createReadableTime(hourspan['open']),
					'close': module.exports.createReadableTime(hourspan['close'])
				})
			}
			readableHours[days[day]] = new_hours
		}
	}
	return readableHours
}

