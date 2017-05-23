import _ from 'lodash'
import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import { GET_RESOURCE_TO_VERIFY } from '../verification-portal/action-types'

const resourceReducer = (state = {}, action) => {
	// console.log('ACTION', action)
	// console.log('STATE b4', state)
	switch (action.type) {
		case GET_RESOURCE_TO_VERIFY:
			return _.assign({}, state, action.resource)
		default:
			return state
	}
	console.log('STATE', state)
}

const reducers = {
	resource: resourceReducer,
	form: formReducer,
}

const reducer = combineReducers(reducers)
// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
export default reducer
