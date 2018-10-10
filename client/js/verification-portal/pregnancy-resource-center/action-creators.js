import _ from 'lodash'

import { store } from '../../hah-app/index'
import { GET_RESOURCE_TO_VERIFY } from './action-types'

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
	return { type: 'CLEAR_RESOURCE' }
}
export const getResourceToVerify = () => {
	return function(dispatch) {
		dispatch(clearResource())
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

	try {
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

		if (result.statusCode >= 400) {
			const alertMessage =
				'There was an error saving this resource. Please take a screenshot ' +
				'of this message and attach using the Help button in the lower right corner.' +
				`\n\nError: ${result.error} \nMessage: ${JSON.stringify(
					result.message,
				)}`
			alert(alertMessage)
		} else {
			alert('Updates saved successfully!')
		}

		return result
	} catch (error) {
		const alertMessage =
			'There was an unexpected error saving this resource. Please take a screenshot ' +
			'of this message and attach using the Help button in the lower right corner.' +
			`\n\nError: ${error}`
		alert(alertMessage)
	}
}
