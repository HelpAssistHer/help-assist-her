import { GET_INITIAL_DATA } from './action-types'

async function getInitialData() {
	const response = await fetch('/api/initial-data', {
		method: 'GET',
	})
	return await response.json()
}

function createInitialDataAction(initialData) {
	return {
		type: GET_INITIAL_DATA,
		initialData,
	}
}

export const getInitialAppData = () => {
	return function(dispatch) {
		return getInitialData()
			.then(
				result => dispatch(createInitialDataAction(result))
			)
	}
}
