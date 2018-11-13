import { change } from 'redux-form'

import { store } from './../../hah-app/index'
import { chcFormFields } from './chc-form-fields'
import { SUBMIT_CHC_FORM } from './action-types'
const clearField = inputField => {
	if (!inputField.name) return inputField.forEach(field => clearField(field))
	store.dispatch(change('chcForm', inputField.verify, ''))
	return store.dispatch(change('chcForm', inputField.name, ''))
}

const submit = values => {
	return {
		type: SUBMIT_CHC_FORM,
		chcFormData: values,
	}
}

export const submitForm = values => {
	store.dispatch(submit(values))
	store.dispatch({ type: 'CLEAR_CHC_STATE' })
	return clearField(chcFormFields)
}
