import _ from 'lodash'

import { store } from '../hah-app/index'
import { GET_RESOURCE_TO_VERIFY } from './action-types'

async function getOneResource() {
	const response = await fetch(`/api/pregnancy-centers/verify`, {
		method: 'GET',
		credentials: 'include',
		headers: {
			'Accept': 'application/json',
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

export const getResourceToVerify = () => {
	return function(dispatch) {
		return getOneResource()
			.then(
				result => dispatch(getResource(result))
			)
	}
}

const convertTimeToNumber = timeString => {
	if (!timeString) {
		return null
	}

	return Number(timeString.replace(/:/, ''))
}

export async function updateResource(updatedResource) {
	const convertedHours = _.mapValues(updatedResource.hours, dayOfWeek => {
		return {
			open: convertTimeToNumber(dayOfWeek.open),
			close: convertTimeToNumber(dayOfWeek.close),
			closedAllDay: dayOfWeek.closedAllDay,
		}
	})

	const transformedResource = {
		...updatedResource,
		hours: convertedHours,
		services: _.mapValues(updatedResource.services, value => !!value),
	}

	try {
		const response = await fetch(`/api/pregnancy-centers/${store.getState().resource._id}`, {
			method: 'PUT',
			credentials: 'include',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(transformedResource),
		})

		const result = await response.json()

		if (result.statusCode >= 400) {
			const alertMessage = 'There was an error saving this resource. Please take a screenshot ' +
				'of this message and attach using the Help button in the lower right corner.' +
				`\n\nError: ${result.error} \nMessage: ${JSON.stringify(result.message)}`
			alert(alertMessage)
		} else {
			alert('Updates saved successfully!')
		}

		return result
	} catch (error) {
		const alertMessage = 'There was an unexpected error saving this resource. Please take a screenshot ' +
			'of this message and attach using the Help button in the lower right corner.' +
			`\n\nError: ${error}`
		alert(alertMessage)
	}
}
