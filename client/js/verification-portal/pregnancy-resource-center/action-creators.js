import _ from 'lodash'

import { GET_RESOURCE_TO_VERIFY } from './action-types'
import { FORM_SUCCESSFULLY_SUBMITTED } from './action-types'
import { CLEAR_RESOURCE } from './action-types'
import { store } from '../../hah-app/index'
import { change } from 'redux-form'

async function getOneResource() {
	const response = await fetch(`/api/pregnancy-centers/verify`, {
		method: 'GET',
		credentials: 'include',
		headers: {
			Accept: 'application/json',
		},
	})
	return await response.json()
}

function getResource(resource) {
	return {
		type: GET_RESOURCE_TO_VERIFY,
		resource,
	}
}

function clearResource() {
	return {
		type: CLEAR_RESOURCE,
	}
}

export function setFormStatus(status) {
	return {
		type: FORM_SUCCESSFULLY_SUBMITTED,
		formStatus: status,
	}
}

function resetFormAndResource(dispatch) {
	_.forEach(
		store.getState().form.verificationPortal.registeredFields,
		field => {
			dispatch(change('verificationPortal', field, null))
		},
	)
	dispatch(clearResource())
}
export const getResourceToVerify = () => {
	return function(dispatch) {
		resetFormAndResource(dispatch)
		return getOneResource().then(result => dispatch(getResource(result)))
	}
}

export async function updateResource(updatedResource) {
	const transformedResource = _.omitBy(
		{
			prcName: '',
			phone: '',
			hotlinePhoneNumber: '',
			email: '',
			website: '',
			notes: '',
			...updatedResource,
		},
		_.isNull || _.isUndefined,
	)

	// eslint-disable-next-line no-async-promise-executor
	return new Promise(async (resolve, reject) => {
		const response = await fetch(
			`/api/pregnancy-centers/${store.getState().resource._id}`,
			{
				method: 'PUT',
				credentials: 'include',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(transformedResource),
			},
		)

		const result = await response.json()

		if (response.status < 400) {
			store.dispatch(setFormStatus('Success'))
			resolve(result)
		} else {
			store.dispatch(setFormStatus('Failed'))
			reject(result.error)
		}
	})
}
