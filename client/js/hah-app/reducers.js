import _ from 'lodash'
import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import { UPDATE_LOGIN_STATE, GET_INITIAL_DATA } from './action-types'
import {
	GET_RESOURCE_TO_VERIFY,
	FORM_SUCCESSFULLY_SUBMITTED,
} from '../verification-portal/pregnancy-resource-center/action-types'
import { OUT_OF_BUSINESS } from '../verification-portal/out-of-business/action-types'
import { DO_NOT_LIST } from '../verification-portal/do-not-list/action-types'
import { GET_PREGNANCY_RESOURCE_CENTERS } from '../mini-app/data/action-types'

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
		case OUT_OF_BUSINESS:
			return {
				...state,
				outOfBusiness: action.outOfBusiness,
			}
		case DO_NOT_LIST:
			return {
				...state,
				doNotList: action.doNotList,
			}
		default:
			return state
	}
}

const miniAppReducer = (state = {}, action) => {
	switch (action.type) {
		case GET_PREGNANCY_RESOURCE_CENTERS:
			return {
				...state,
				pregnancyResourceCenters: action.pregnancyResourceCenters,
			}
		default:
			return state
	}
}

const localStateReducer = (state = {}, action) => {
	switch (action.type) {
		case FORM_SUCCESSFULLY_SUBMITTED:
			return {
				...state,
				verificationPortalFormStatus: action.formStatus,
			}
		default:
			return state
	}
}

const reducers = {
	initialData: authenticationReducer,
	resource: resourceReducer,
	miniApp: miniAppReducer,
	form: formReducer,
	localState: localStateReducer,
}

const reducer = combineReducers(reducers)
// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
export default reducer
