import { GET_PREGNANCY_RESOURCE_CENTERS } from './action-types'

import { store } from '../../hah-app'

function getPregnancyResourceCentersAction(pregnancyResourceCenters) {
	return {
		type: GET_PREGNANCY_RESOURCE_CENTERS,
		pregnancyResourceCenters,
	}
}

export const getPregnancyResourceCenters = address => {
	return function(dispatch) {
		return findPregnancyResourceCentersNearMe(address).then(result =>
			dispatch(getPregnancyResourceCentersAction(result)),
		)
	}
}

async function findPregnancyResourceCentersNearMe(address) {
	const miles = 25

	const coordinates = await geocodeAddress(address)
	const { lat, lng } = coordinates

	const queryString = `?lng=${lng}&lat=${lat}&miles=${miles}`
	const fullUrl = `/api/pregnancy-centers/near-me${queryString}`

	const response = await fetch(fullUrl, {
		method: 'GET',
	})

	return await response.json()
}

async function geocodeAddress(address) {
	const geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key= ${
		store.getState().initialData.googleMapsApiKey
	}`
	const response = await fetch(geocodeURL, {
		method: 'GET',
	})

	const json = await response.json()
	return json.results[0].geometry.location
}
