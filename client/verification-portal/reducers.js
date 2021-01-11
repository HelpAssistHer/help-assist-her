import { reducer as formReducer } from 'redux-form'

import {
	GET_RESOURCE_TO_VERIFY,
	FORM_SUCCESSFULLY_SUBMITTED,
	CLEAR_RESOURCE,
} from './pregnancy-resource-center/action-types'
import { OUT_OF_BUSINESS } from './out-of-business/action-types'
import { DO_NOT_LIST } from './do-not-list/action-types'

const resourceReducer = (state = {}, action) => {
	switch (action.type) {
		case GET_RESOURCE_TO_VERIFY:
			return { ...state, ...action.resource }
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
		case CLEAR_RESOURCE:
			return {}
		default:
			return state
	}
}

const chcResourceReducer = (state = {}, action) => {
	switch (action.type) {
		case 'SUBMIT_CHC_FORM':
			return {
				...state,
				chcFormData: action.chcFormData,
			}
		case 'CLEAR_CHC_STATE':
			return {
				...state,
				chcFormData: {},
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

export default {
	localState: localStateReducer,
	chcResource: chcResourceReducer,
	resource: resourceReducer,
	form: formReducer,
}
