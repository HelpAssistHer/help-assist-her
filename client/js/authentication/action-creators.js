export async function authenticateUser(accessToken) {
	const response = await fetch(`/api/auth/facebook/token?access_token=${accessToken}`, {
		method: 'GET',
		credentials: 'include',
		headers: {
			'Accept': 'application/json',
		},
	})

	const loggedIn = await response.ok
	console.log('loggedIn ' + loggedIn)
	return loggedIn
}

export async function logoutUser() {
	const response = await fetch('/api/logout', {
		method: 'GET',
		credentials: 'include',
	})
	const logoutSuccessful = await response.ok
	return logoutSuccessful
}

export async function isAuthenticated() {
	let response
	try {
		response = await fetch('/api/login/check/', {
			method: 'GET',
			credentials: 'include'
		})
	} catch (err) {
		console.log(err)
		return false
	}
	const ok = await response.ok
	if (ok) {
		const text = await response.text()
		return text === 'true'
	} else {
		return false
	}
}
