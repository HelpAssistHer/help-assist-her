import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import moment from 'moment'
import 'moment-duration-format'

import { getResourceToVerify } from './action-creators'
import Button from '../components/button'
import Spacer from '../components/spacer'
import { store } from '../hah-app/index'

const convertNumberToTimeFormat = number => {
	const result = moment.duration(number, 'minutes').format('hh:mm')
	return number ? result : null
}

const updateForm = ({ changeFieldValue, resource }) => {
	let {
		prcName,
		email,
		address,
		hours,
		notes,
		phone,
		primaryContactUser,
		services,
		verified,
		website
	} = resource

	changeFieldValue('prcName', prcName)
	changeFieldValue('verified.prcName', _.get(verified, 'prcName'))

	changeFieldValue('address.line1', _.get(address, 'line1'))
	changeFieldValue('address.line2', _.get(address, 'line2'))
	changeFieldValue('address.city', _.get(address, 'city'))
	changeFieldValue('address.state', _.get(address, 'state'))
	changeFieldValue('address.zip', _.get(address, 'zip'))
	changeFieldValue('verified.address', _.get(verified, 'address'))

	changeFieldValue('phone', phone)
	changeFieldValue('verified.phone', _.get(verified, 'phone'))

	changeFieldValue('email', email)
	changeFieldValue('verified.email', _.get(verified, 'email'))

	changeFieldValue('website', website)
	changeFieldValue('verified.website', _.get(verified, 'website'))

	changeFieldValue('primaryContact.firstName', _.get(primaryContactUser, 'firstName'))
	changeFieldValue('primaryContact.lastName', _.get(primaryContactUser, 'lastName'))
	changeFieldValue('primaryContact.phone', _.get(primaryContactUser, 'phone'))
	changeFieldValue('primaryContact.email', _.get(primaryContactUser, 'email'))
	changeFieldValue('verified.primaryContact', _.get(verified, 'primaryContact'))

	_.forEach(services, (value, key) => {
		changeFieldValue(`services.${key}`, 1)
	})
	changeFieldValue('verified.services', _.get(verified, 'services'))

	changeFieldValue('hours.sunday.open', convertNumberToTimeFormat(_.get(hours, 'sunday.open')))
	changeFieldValue('hours.sunday.close', convertNumberToTimeFormat(_.get(hours, 'sunday.close')))
	changeFieldValue('hours.monday.open', convertNumberToTimeFormat(_.get(hours, 'monday.open')))
	changeFieldValue('hours.monday.close', convertNumberToTimeFormat(_.get(hours, 'monday.close')))
	changeFieldValue('hours.tuesday.open', convertNumberToTimeFormat(_.get(hours, 'tuesday.open')))
	changeFieldValue('hours.tuesday.close', convertNumberToTimeFormat(_.get(hours, 'tuesday.close')))
	changeFieldValue('hours.wednesday.open', convertNumberToTimeFormat(_.get(hours, 'wednesday.open')))
	changeFieldValue('hours.wednesday.close', convertNumberToTimeFormat(_.get(hours, 'wednesday.close')))
	changeFieldValue('hours.thursday.open', convertNumberToTimeFormat(_.get(hours, 'thursday.open')))
	changeFieldValue('hours.thursday.close', convertNumberToTimeFormat(_.get(hours, 'thursday.close')))
	changeFieldValue('hours.friday.open', convertNumberToTimeFormat(_.get(hours, 'friday.open')))
	changeFieldValue('hours.friday.close', convertNumberToTimeFormat(_.get(hours, 'friday.close')))
	changeFieldValue('hours.saturday.open', convertNumberToTimeFormat(_.get(hours, 'saturday.open')))
	changeFieldValue('hours.saturday.close', convertNumberToTimeFormat(_.get(hours, 'saturday.close')))
	changeFieldValue('verified.hours', _.get(verified, 'hours'))

	changeFieldValue('notes', notes)
}

const GetResourceToVerifyButton = ({ dispatch, changeFieldValue }) => {
	return (
		<div>
			<Button
				buttonText='Get One Resource'
				onClick={() => {
					dispatch(getResourceToVerify())
						.then(() => {
							updateForm({
								changeFieldValue,
								resource: store.getState().resource,
							})
						})
				}}
			/>
			<Spacer height='20px' />
		</div>
	)
}

export default connect()(GetResourceToVerifyButton)
