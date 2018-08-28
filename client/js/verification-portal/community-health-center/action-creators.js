import { change } from 'redux-form'

import { store } from './../../hah-app/index'
import { chcInputResource } from './chc-input-resource'

const clearField = inputField => {
	if (!inputField.name) return inputField.forEach(field => clearField(field))
	store.dispatch(change('chcForm', inputField.verify, ''))
	return store.dispatch(change('chcForm', inputField.name, ''))
}

const submit = values => {
	return {
		type: 'SUBMIT_CHC_FORM',
		chcFormData: values,
	}
}

export const submitForm = values => {
	store.dispatch(submit(values))
	store.dispatch({ type: 'CLEAR_CHC_STATE' })
	return clearField(chcInputResource)
}
