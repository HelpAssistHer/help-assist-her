import { serverUrl } from 'clientConfig'

export async function authenticateUser(accessToken) {
	const response = await fetch(`${serverUrl}/auth/facebook/token?access_token=${accessToken}`, {
		method: 'GET',
		credentials: 'include',
		headers: {
			'Accept': 'application/json',
		},
	})

	return await response.json()
}

export async function logoutUser() {
	const response = await fetch(`${serverUrl}/logout`, {
		method: 'GET',
		credentials: 'include',
	})
}
