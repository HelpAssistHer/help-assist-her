import { store } from '..'

export async function findPregnancyResourceCentersNearMe(address) {
	const miles = 25

	const coordinates = await geocodeAddress(address)
	const { lat, lng } = coordinates

	const queryString = `?lng=${lng}&lat=${lat}&miles=${miles}`
	const fullUrl = `/api/pregnancy-centers/near-me${queryString}`

	return fetch(fullUrl, {
		method: 'GET',
	})
}

export async function findChcsNearMe(address) {
	const miles = 25

	const coordinates = await geocodeAddress(address)
	const { lat, lng } = coordinates

	const queryString = `?lng=${lng}&lat=${lat}&miles=${miles}`
	const fullUrl = `/api/fqhcs/near-me${queryString}`

	return fetch(fullUrl, {
		method: 'GET',
	})
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
