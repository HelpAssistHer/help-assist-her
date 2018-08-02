import { GET_PREGNANCY_RESOURCE_CENTERS } from './action-types'

function getPregnancyResourceCentersAction(pregnancyResourceCenters) {
	return {
		type: GET_PREGNANCY_RESOURCE_CENTERS,
		pregnancyResourceCenters,
	}
}

export const getPregnancyResourceCenters = () => {
	return function(dispatch) {
		return findPregnancyResourceCentersNearMe().then(result =>
			dispatch(getPregnancyResourceCentersAction(result)),
		)
	}
}

async function findPregnancyResourceCentersNearMe() {
	const lng = -73.6778994
	const lat = 41.4271604
	const miles = 50

	const queryString = `?lng=${lng}&lat=${lat}&miles=${miles}`
	const fullUrl = `/api/pregnancy-centers/near-me${queryString}`

	const response = await fetch(fullUrl, {
		method: 'GET',
	})

	return await response.json()
}
