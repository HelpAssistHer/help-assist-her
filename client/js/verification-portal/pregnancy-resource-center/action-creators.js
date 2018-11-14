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

const convertTimeToNumber = timeString => {
	if (!timeString) {
		return null
	}
	const hours = parseInt(timeString.slice(0, 2))
	const hoursIn24HourFormat =
		timeString.slice(5, timeString.length) === 'pm'
			? hours + 12
			: (hours < 10 ? '0' : '') + hours
	const minutes = parseInt(timeString.slice(2, 5))
	const minutesInTwoDesigt = (minutes < 10 ? '0' : '') + minutes
	return Number(`${hoursIn24HourFormat}${minutesInTwoDesigt}`)
}

export async function updateResource(updatedResource) {
	const convertedHours = _.mapValues(updatedResource.hours, dayOfWeek => {
		return _.omitBy(
			{
				open: convertTimeToNumber(_.get(dayOfWeek, 'open')),
				close: convertTimeToNumber(_.get(dayOfWeek, 'close')),
				closedAllDay: _.get(dayOfWeek, 'closedAllDay'),
			},
			_.isNull || _.isUndefined,
		)
	})

	const transformedResource = {
		...updatedResource,
		hours: convertedHours,
		services: _.mapValues(updatedResource.services, value => !!value),
	}
	// 5-12-18, I am commenting this out for now, as we want to keep the
	// data verification simple for now. We will eventually add this back.
	// primaryContactPerson: {
	// 	_id: _.get(store.getState().resource, 'primaryContactPerson._id'),
	// 	...updatedResource.primaryContactPerson
	// },

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
