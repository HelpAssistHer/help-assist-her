'use strict'

module.exports = {
	neverVerified: {
		verifiedData: {},
	},
	verificationNotComplete: {
		$or: [
			{ 'verifiedData.address': { $exists: false } },
			{ 'verifiedData.email': { $exists: false } },
			{ 'verifiedData.hours': { $exists: false } },
			{ 'verifiedData.prcName': { $exists: false } },
			{ 'verifiedData.phone': { $exists: false } },
			{ 'verifiedData.services': { $exists: false } },
			{ 'verifiedData.website': { $exists: false } },
		],
	},
	anything: {},
	verificationBeforeOct31: {
		'verifiedData.prcName.date': {
			$lt: new Date('2018-10-31'),
		},
	},
}
