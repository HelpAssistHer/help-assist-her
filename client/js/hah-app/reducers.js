import _ from 'lodash'
import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import { UPDATE_LOGIN_STATE, GET_INITIAL_DATA } from './action-types'
import { GET_RESOURCE_TO_VERIFY } from '../verification-portal/action-types'

const authenticationReducer = (state = {}, action) => {
	switch (action.type) {
		case GET_INITIAL_DATA:
			return _.assign({}, state, action.initialData)

		case UPDATE_LOGIN_STATE:
			return _.assign({}, state, {
				isLoggedIn: action.isLoggedIn,
				userDisplayName: action.userDisplayName,
			})

		default:
			return state
	}
}

const resourceReducer = (state = {}, action) => {
	switch (action.type) {
		case GET_RESOURCE_TO_VERIFY:
			return _.assign({}, state, action.resource)
		default:
			return state
	}
}

const reducers = {
	initialData: authenticationReducer,
	resource: resourceReducer,
	form: formReducer,
}

const reducer = combineReducers(reducers)
// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
export default reducer
