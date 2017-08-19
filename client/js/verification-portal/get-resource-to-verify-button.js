import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import { getResourceToVerify } from './action-creators'
import Button from '../components/button'
import Spacer from '../components/spacer'
import { store } from '../hah-app/index'

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

	hours = hours || []
	changeFieldValue('hours[0].open', _.get(hours[0], 'open'))
	changeFieldValue('hours[0].close', _.get(hours[0], 'close'))
	changeFieldValue('hours[1].open', _.get(hours[1], 'open'))
	changeFieldValue('hours[1].close', _.get(hours[1], 'close'))
	changeFieldValue('hours[2].open', _.get(hours[2], 'open'))
	changeFieldValue('hours[2].close', _.get(hours[2], 'close'))
	changeFieldValue('hours[3].open', _.get(hours[3], 'open'))
	changeFieldValue('hours[3].close', _.get(hours[3], 'close'))
	changeFieldValue('hours[4].open', _.get(hours[4], 'open'))
	changeFieldValue('hours[4].close', _.get(hours[4], 'close'))
	changeFieldValue('hours[5].open', _.get(hours[5], 'open'))
	changeFieldValue('hours[5].close', _.get(hours[5], 'close'))
	changeFieldValue('hours[6].open', _.get(hours[6], 'open'))
	changeFieldValue('hours[6].close', _.get(hours[6], 'close'))
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
