import P from 'bluebird'
import { GET_PREGNANCY_RESOURCE_CENTERS } from './action-types'

const googleMapsClient = require('@google/maps').createClient({
	Promise: P,
})

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
	const miles = 50

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
	const response = await googleMapsClient.geocode({ address }).asPromise()

	return response.json.results[0].geometry.location
}
