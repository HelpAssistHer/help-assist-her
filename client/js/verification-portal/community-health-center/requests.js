import { parsePhoneNumber } from '../util'

export async function addNewCommunityHealthCenter({
	chcName,
	addressLine1,
	addressLine2,
	city,
	state,
	zipCode,
	phoneNumber,
	email,
	website,
	notes,
	chcNameVerified,
	addressVerified,
	phoneVerified,
	emailVerified,
	websiteVerified,
}) {
	const newCommunityHealthCenter = {
		chcName,
		address: {
			line1: addressLine1,
			line2: addressLine2,
			city,
			state,
			zip: zipCode,
		},
		phone: parsePhoneNumber(phoneNumber),
		email,
		website,
		notes,
		verifiedData: {
			chcName: {
				verified: chcNameVerified,
			},
			address: {
				verified: addressVerified,
			},
			phone: {
				verified: phoneVerified,
			},
			email: {
				verified: emailVerified,
			},
			website: {
				verified: websiteVerified,
			},
		},
	}

	return await fetch(`/api/fqhcs`, {
		method: 'POST',
		credentials: 'include',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(newCommunityHealthCenter),
	})
}
