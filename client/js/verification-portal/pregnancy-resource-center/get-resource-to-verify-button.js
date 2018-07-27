import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import { getResourceToVerify } from './action-creators'
import Button from '../../components/button'
import { store } from '../../hah-app/index'
import { updateOutOfBusinessActionCreator } from '../out-of-business/action-creators'
import { updateDoNotListActionCreator } from '../do-not-list/action-creators'
import { pregnancyCenterServices } from '../../../../server/pregnancy-centers/pregnancy-center-services'

const convertNumberToTimeFormat = timeNumber => {
	if (!timeNumber) {
		return null
	}
	const timeString = String(timeNumber).padStart(4, '0')
	const hours = parseInt(`${timeString.slice(0, 2)}`)
	let am = ''
	am = hours > 12 ? 'pm' : 'am'
	return `${hours > 12 ? hours - 12 : hours}:${timeString.slice(2, 4)} ${am}`
}

const populateForm = ({ changeFieldValue, resource }) => {
	let {
		prcName,
		email,
		address,
		hours,
		notes,
		otherServices,
		phone,
		services,
		primaryContactPerson,
		verifiedData,
		website,
	} = resource

	changeFieldValue('prcName', prcName)
	changeFieldValue(
		'verifiedData.prcName.verified',
		_.get(verifiedData, 'prcName.verified'),
	)

	changeFieldValue('address.line1', _.get(address, 'line1'))
	changeFieldValue('address.line2', _.get(address, 'line2'))
	changeFieldValue('address.city', _.get(address, 'city'))
	changeFieldValue('address.state', _.get(address, 'state'))
	changeFieldValue('address.zip', _.get(address, 'zip'))
	changeFieldValue(
		'verifiedData.address.verified',
		_.get(verifiedData, 'address.verified'),
	)

	changeFieldValue('phone', phone)
	changeFieldValue(
		'verifiedData.phone.verified',
		_.get(verifiedData, 'phone.verified'),
	)

	changeFieldValue('email', email)
	changeFieldValue(
		'verifiedData.email.verified',
		_.get(verifiedData, 'email.verified'),
	)

	changeFieldValue('website', website)
	changeFieldValue(
		'verifiedData.website.verified',
		_.get(verifiedData, 'website.verified'),
	)

	changeFieldValue(
		'primaryContactPerson.firstName',
		_.get(primaryContactPerson, 'firstName'),
	)
	changeFieldValue(
		'primaryContactPerson.lastName',
		_.get(primaryContactPerson, 'lastName'),
	)
	changeFieldValue(
		'primaryContactPerson.phone',
		_.get(primaryContactPerson, 'phone'),
	)
	changeFieldValue(
		'primaryContactPerson.email',
		_.get(primaryContactPerson, 'email'),
	)
	changeFieldValue(
		'verifiedData.primaryContactPerson.verified',
		_.get(verifiedData, 'primaryContactPerson.verified'),
	)

	_.forEach(pregnancyCenterServices, service => {
		services[service.id]
			? changeFieldValue(`services.${service.id}`, true)
			: changeFieldValue(`services.${service.id}`, false)
	})
	changeFieldValue('otherServices', otherServices)
	changeFieldValue(
		'verifiedData.services.verified',
		_.get(verifiedData, 'services.verified'),
	)
	_.forEach(hours, (hour, i) => {
		if (!_.get(hours, `[${i}]`) && hours) hours[i] = {}
		changeFieldValue(
			`hours[${i}].open`,
			convertNumberToTimeFormat(_.get(hours, `[${i}].open`)),
		)
		changeFieldValue(
			`hours[${i}].close`,
			convertNumberToTimeFormat(_.get(hours, `[${i}].close`)),
		)
	})
	changeFieldValue(
		'verifiedData.hours.verified',
		_.get(verifiedData, 'hours.verified'),
	)

	changeFieldValue('notes', notes)
}

const GetResourceToVerifyButton = ({ dispatch, changeFieldValue }) => {
	return (
		<div>
			<Button
				size="large"
				buttonText="Verify Next Resource"
				onClick={() => {
					dispatch(getResourceToVerify()).then(result => {
						dispatch(
							updateOutOfBusinessActionCreator(!!result.resource.outOfBusiness),
						)
						dispatch(updateDoNotListActionCreator(result.resource.doNotList))
						populateForm({
							changeFieldValue,
							resource: store.getState().resource,
						})
					})
				}}
			/>
		</div>
	)
}

export default connect()(GetResourceToVerifyButton)
