'use strict'

module.exports = {
	neverVerified: {
		verifiedData: {},
	},
	prcVerificationNotComplete: {
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
	chcVerificationNotComplete: {
		$or: [
			{ 'verifiedData.address': { $exists: false } },
			{ 'verifiedData.email': { $exists: false } },
			{ 'verifiedData.hours': { $exists: false } },
			{ 'verifiedData.chcName': { $exists: false } },
			{ 'verifiedData.phone': { $exists: false } },
			{ 'verifiedData.services': { $exists: false } },
			{ 'verifiedData.website': { $exists: false } },
		],
	},
	anything: {},
	prcVerificationBeforeDateOrNone: {
		$or: [
			{
				'verifiedData.prcName.date': {
					$lt: new Date('2019-12-01'),
				},
			},
			{
				'verifiedData.prcName.date': {
					$exists: false,
				},
			},
		],
	},
	chcVerificationBeforeDateOrNone: {
		$or: [
			{
				'verifiedData.chcName.date': {
					$lt: new Date('2019-12-01'),
				},
			},
			{
				'verifiedData.chcName.date': {
					$exists: false,
				},
			},
		],
	},
	prcVerifiedAfterDate: {
		'verifiedData.prcName.date': {
			$gte: new Date('2019-12-01'),
		},
	},
	chcVerifiedAfterDate: {
		'verifiedData.chcName.date': {
			$gte: new Date('2019-12-01'),
		},
	},
	prcFullyVerified: {
		'verifiedData.prcName.verified': true,
		'verifiedData.address.verified': true,
		'verifiedData.phone.verified': true,
		'verifiedData.website.verified': true,
	},
	chcFullyVerified: {
		'verifiedData.chcName.verified': true,
		'verifiedData.address.verified': true,
		'verifiedData.phone.verified': true,
		'verifiedData.website.verified': true,
	},
}
