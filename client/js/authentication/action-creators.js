export async function authenticateUser(accessToken) {
	const response = await fetch(`http://localhost:4000/auth/facebook/token?access_token=${accessToken}`, {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
		},
	})
	console.log('AUTHENTICATE RESPONSE', response)

	return await response.json()
}
