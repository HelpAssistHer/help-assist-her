const R = require('ramda')

const hahSoftwareEngineers = ['Karen Rose', 'Kate Sills', 'Bhavya Bharti']

export const shouldShowFeature = userDisplayName => {
	return R.contains(userDisplayName, hahSoftwareEngineers)
}
