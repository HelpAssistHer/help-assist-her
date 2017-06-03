export async function authenticateUser(accessToken) {
	const response = await fetch(`http://localhost:4000/auth/facebook/token?access_token=${accessToken}`, {
		method: 'GET',
		credentials: 'include',
		headers: {
			'Accept': 'application/json',
		},
	})

	return await response.json()
}

export async function logoutUser() {
	const response = await fetch('http://localhost:4000/logout', {
		method: 'GET',
		credentials: 'include',
	})
}
