import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import { GET_RESOURCE_TO_VERIFY } from '../verification-portal/action-types'

const verificationPortalReducer = (state = {}, action) => {
	switch (action.type) {
		case GET_RESOURCE_TO_VERIFY:
			return {
				resource: 'all the data objects',
			}
		default:
			return state
	}
}

const reducers = {
	verificationPortal: verificationPortalReducer,
	form: formReducer,
}

const reducer = combineReducers(reducers)
// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
export default reducer
