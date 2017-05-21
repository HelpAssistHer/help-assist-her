import { GET_RESOURCE_TO_VERIFY } from './action-types'

async function getOneResource() {
	const response = await fetch('http://localhost:4000/api/pregnancy-centers/verify', {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
		},
	})
	const result = await response.json()
	console.log(result)
	return result
}

function getResource(resource) {
	return {
		type: 'GET_RESOURCE_TO_VERIFY',
		resource,
	}
}

export const getResourceToVerify = () => {
	return function(dispatch) {
		return getOneResource()
			.then(
				result => dispatch(getResource(result))
			)
	}
}
