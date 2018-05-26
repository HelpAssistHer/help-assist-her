import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import { getResourceToVerify } from './action-creators'
import Button from '../components/button'
import Spacer from '../components/spacer'
import { store } from '../hah-app/index'

const convertNumberToTimeFormat = timeNumber => {
	if (!timeNumber) {
		return null
	}

	const timeString = String(timeNumber).padStart(4, '0')

	return `${timeString.slice(0, 2)}:${timeString.slice(2, 4)}`
}

const updateForm = ({ changeFieldValue, resource }) => {
	let {
		prcName,
		email,
		address,
		hours,
		notes,
		otherServices,
		phone,
		primaryContactPerson,
		services,
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

	_.forEach(services, (value, key) => {
		changeFieldValue(`services.${key}`, 1)
	})
	changeFieldValue('otherServices', otherServices)
	changeFieldValue(
		'verifiedData.services.verified',
		_.get(verifiedData, 'services.verified'),
	)

	changeFieldValue(
		'hours[0].open',
		convertNumberToTimeFormat(_.get(hours, '[0].open')),
	)
	changeFieldValue(
		'hours[0].close',
		convertNumberToTimeFormat(_.get(hours, '[0].close')),
	)
	changeFieldValue(
		'hours[1].open',
		convertNumberToTimeFormat(_.get(hours, '[1].open')),
	)
	changeFieldValue(
		'hours[1].close',
		convertNumberToTimeFormat(_.get(hours, '[1].close')),
	)
	changeFieldValue(
		'hours[2].open',
		convertNumberToTimeFormat(_.get(hours, '[2].open')),
	)
	changeFieldValue(
		'hours[2].close',
		convertNumberToTimeFormat(_.get(hours, '[2].close')),
	)
	changeFieldValue(
		'hours[3].open',
		convertNumberToTimeFormat(_.get(hours, '[3].open')),
	)
	changeFieldValue(
		'hours[3].close',
		convertNumberToTimeFormat(_.get(hours, '[3].close')),
	)
	changeFieldValue(
		'hours[4].open',
		convertNumberToTimeFormat(_.get(hours, '[4].open')),
	)
	changeFieldValue(
		'hours[4].close',
		convertNumberToTimeFormat(_.get(hours, '[4].close')),
	)
	changeFieldValue(
		'hours[5].open',
		convertNumberToTimeFormat(_.get(hours, '[5].open')),
	)
	changeFieldValue(
		'hours[5].close',
		convertNumberToTimeFormat(_.get(hours, '[5].close')),
	)
	changeFieldValue(
		'hours[6].open',
		convertNumberToTimeFormat(_.get(hours, '[6].open')),
	)
	changeFieldValue(
		'hours[6].close',
		convertNumberToTimeFormat(_.get(hours, '[6].close')),
	)
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
					dispatch(getResourceToVerify()).then(() => {
						updateForm({
							changeFieldValue,
							resource: store.getState().resource,
						})
					})
				}}
			/>
			<Spacer height="20px" />
		</div>
	)
}

export default connect()(GetResourceToVerifyButton)
