import { OUT_OF_BUSINESS, DO_NOT_LIST } from './action-types'
import { store } from '../../hah-app/index'

export async function updateBusinessListingState(
	businessListingState,
	bizState,
) {
	const bizApEndPoint =
		businessListingState == 'outOfBusiness' ? 'out-of-business' : 'do-not-list'
	const response = await fetch(
		`/api/pregnancy-centers/${store.getState().resource._id}/${bizApEndPoint}`,
		{
			method: 'PUT',
			credentials: 'include',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body:
				businessListingState == 'outOfBusiness'
					? JSON.stringify({ outOfBusiness: bizState })
					: JSON.stringify({ doNotList: bizState }),
		},
	)
	const jsonResponse = await response.json()

	store.dispatch(
		updateBusinessStateActionCreator(
			businessListingState,
			jsonResponse[bizState],
		),
	)

	return jsonResponse
}

export function updateBusinessStateActionCreator(
	businessListingState,
	bizState,
) {
	console.log('updateBusinessListingState == ', businessListingState, bizState)
	bizState = bizState ? bizState : false
	switch (businessListingState) {
		case 'outOfBusiness':
			return {
				type: 'OUT_OF_BUSINESS',
				bizState,
			}
		case 'doNotList':
			return {
				type: 'DO_NOT_LIST',
				bizState,
			}
		default:
			return {}
	}
}
