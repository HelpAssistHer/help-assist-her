import { OUT_OF_BUSINESS } from './action-types'
import { store } from '../../hah-app/index'

export async function updateOutOfBusiness(isOutOfBusiness) {
	const response = await fetch(
		`/api/pregnancy-centers/${store.getState().resource._id}/out-of-business`,
		{
			method: 'PUT',
			credentials: 'include',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ outOfBusiness: !!isOutOfBusiness }),
		},
	)
	return await response.json()
}
