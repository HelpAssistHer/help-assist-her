export async function findPregnancyCentersNearMe() {
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
