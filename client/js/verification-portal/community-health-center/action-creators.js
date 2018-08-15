import { change } from 'redux-form'

import { store } from '../../hah-app/index'
import { SUBMIT_CHC_FORM } from './action-types'
import { chcInputResource } from './chcInputResource'

const clearField = inputField => {
	if (!inputField.name) return inputField.forEach(field => clearField(field))
	return change('CommunityHealtCenterForm', field.name, null)
}

export const submitForm = values => {
	console.log(' submit form values == ', values, props)
	return {
		type: 'SUBMIT_CHC_FORM',
		formData: values,
	}
	// chcInputResource.forEach(field => clearField(field))
}
