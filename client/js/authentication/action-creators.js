export async function authenticateUser(accessToken) {
	const response = await fetch(`/api/auth/facebook/token?access_token=${accessToken}`, {
		method: 'GET',
		credentials: 'include',
		headers: {
			'Accept': 'application/json',
		},
	})

	return await response.ok // if we received a 200, it was successful
}

export async function logoutUser() {
	const response = await fetch('/api/logout', {
		method: 'GET',
		credentials: 'include',
		headers: {
			'Accept': 'application/json',
		},
	})
	return await response.ok // if we received a 200, it was successful
}

export async function isAuthenticated() {
	let response
	try {
		response = await fetch('/api/login/check/', {
			method: 'GET',
			credentials: 'include',
			headers: {
				'Accept': 'application/json',
			},
		})
	} catch (err) {
		return false // we want to always default to not being authenticated even if the server fails, isn't up yet
	}
	const ok = await response.ok
	if (!ok) {
		return false // return false if server error
	}
	const { isLoggedIn, userDisplayName } = await response.json()
	return {
		isLoggedIn,
		userDisplayName,
	}
}
