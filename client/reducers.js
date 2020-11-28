import _ from 'lodash'
import { combineReducers } from 'redux'

import { UPDATE_LOGIN_STATE, GET_INITIAL_DATA } from './action-types'
import reducers from './verification-portal/reducers'

const reducer = combineReducers({
	initialData: (state = {}, action) => {
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
	},
	...reducers,
})

export default reducer
