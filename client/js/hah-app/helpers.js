const R = require('ramda')

const hahSoftwareEngineers = [
	'Karen Rose',
	'Kate Sills',
	'Bhavya Bharti',
	'Valery Zajkov',
]

export const shouldShowFeature = userDisplayName => {
	return R.contains(userDisplayName, hahSoftwareEngineers)
}
