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
	const miles = 50

	const coordinates = await geocodeAddress(
		'45 Lansing St San Francisco CA 94105',
	)
	const { lat, lng } = coordinates
	console.log('AFTER GEOCODE', coordinates)

	const queryString = `?lng=${lng}&lat=${lat}&miles=${miles}`
	const fullUrl = `/api/pregnancy-centers/near-me${queryString}`

	const response = await fetch(fullUrl, {
		method: 'GET',
	})

	return await response.json()
}

const P = require('bluebird')

const googleMapsClient = require('@google/maps').createClient({
	Promise: P,
})

async function geocodeAddress(address) {
	const response = await googleMapsClient.geocode({ address }).asPromise()

	return response.json.results[0].geometry.location
}
