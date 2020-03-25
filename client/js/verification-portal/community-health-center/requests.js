export async function addNewCommunityHealthCenter(values) {
	const response = await fetch(`/api/fqhcs`, {
		method: 'POST',
		credentials: 'include',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(values),
	})
	return await response.json()
}
