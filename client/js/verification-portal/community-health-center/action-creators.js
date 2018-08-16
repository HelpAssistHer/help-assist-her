import { change } from 'redux-form'

import { store } from './../../hah-app/index'
import { chcInputResource } from './chcInputResource'

const clearField = inputField => {
	if (!inputField.name) return inputField.forEach(field => clearField(field))
	return change('chcForm', inputField.name, '')
}

const submit = values => {
	return {
		type: 'SUBMIT_CHC_FORM',
		chcFormData: values,
	}
}

export const submitForm = values => {
	console.log(' submit form values action == ', values)
	chcInputResource.forEach(field => clearField(field))
	// return dispatch => dispatch(submit(values))
}
console.log('store == ', store) // store is undefined ?????
