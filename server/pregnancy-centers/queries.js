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
	verificationBeforeOct31orNone: {
		$or: [
			{
				'verifiedData.prcName.date': {
					$lt: new Date('2018-10-31'),
				},
			},
			{
				'verifiedData.prcName.date': {
					$exists: false,
				},
			},
		],
	},
	verifiedAfterOct31: {
		'verifiedData.prcName.date': {
			$gte: new Date('2018-10-31'),
		},
	},
	fullyVerified: {
		'verifiedData.prcName.verified': true,
		'verifiedData.address.verified': true,
		'verifiedData.phone.verified': true,
		'verifiedData.website.verified': true,
	},
}
