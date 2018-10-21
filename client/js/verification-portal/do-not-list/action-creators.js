import { DO_NOT_LIST } from './action-types'
import { store } from '../../hah-app/index'

export async function updateDoNotList(doNotList) {
	const response = await fetch(
		`/api/pregnancy-centers/${store.getState().resource._id}/do-not-list`,
		{
			method: 'PUT',
			credentials: 'include',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ doNotList }),
		},
	)
	const jsonResponse = await response.json()

	store.dispatch(updateDoNotListActionCreator(jsonResponse.doNotList))

	return jsonResponse
}

export function updateDoNotListActionCreator(doNotList) {
	return {
		type: DO_NOT_LIST,
		doNotList: !!doNotList,
	}
}
