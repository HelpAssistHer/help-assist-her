export async function authenticateUser(accessToken) {
	const response = await fetch(`/auth/facebook/token?access_token=${accessToken}`, {
		method: 'GET',
		credentials: 'include',
		headers: {
			'Accept': 'application/json',
		},
	})

	return await response.json()
}

export async function logoutUser() {
	await fetch('/logout', {
		method: 'GET',
		credentials: 'include',
	})
}
