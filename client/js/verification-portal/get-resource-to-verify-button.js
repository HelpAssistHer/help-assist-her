import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import { getResourceToVerify } from './action-creators'
import Button from '../components/button'
import Spacer from '../components/spacer'
import { store } from '../hah-app/index'

const updateForm = ({ changeFieldValue, resource }) => {
	const {
		name,
		address,
		hours,
		notes,
		phone,
		primaryContactUser,
		services,
		verified,
		website
	} = resource

	changeFieldValue('name', name)
	changeFieldValue('verified.name', verified.name)
	changeFieldValue('address.line1', address.line1)
	changeFieldValue('address.line2', address.line2)
	changeFieldValue('address.city', address.city)
	changeFieldValue('address.state', address.state)
	changeFieldValue('address.zip', address.zip)
	changeFieldValue('verified.address', verified.address)
	changeFieldValue('phone', phone)
	changeFieldValue('verified.phone', verified.phone)
	changeFieldValue('website', website)
	changeFieldValue('verified.website', verified.website)

	changeFieldValue('primaryContact.firstName', primaryContactUser.firstName)
	changeFieldValue('primaryContact.lastName', primaryContactUser.lastName)
	changeFieldValue('primaryContact.phone', primaryContactUser.phone)
	changeFieldValue('primaryContact.email', primaryContactUser.email)
	changeFieldValue('verified.primaryContact', verified.primaryContact)

	_.each(services, service => {
		changeFieldValue(`services.${service}`, 1)
	})
	changeFieldValue('verified.services', verified.services)

	changeFieldValue('hours[0].open', hours[0].open)
	changeFieldValue('hours[0].close', hours[0].close)
	changeFieldValue('hours[1].open', hours[1].open)
	changeFieldValue('hours[1].close', hours[1].close)
	changeFieldValue('hours[2].open', hours[2].open)
	changeFieldValue('hours[2].close', hours[2].close)
	changeFieldValue('hours[3].open', hours[3].open)
	changeFieldValue('hours[3].close', hours[3].close)
	changeFieldValue('hours[4].open', hours[4].open)
	changeFieldValue('hours[4].close', hours[4].close)
	changeFieldValue('hours[5].open', hours[5].open)
	changeFieldValue('hours[5].close', hours[5].close)
	changeFieldValue('hours[6].open', hours[6].open)
	changeFieldValue('hours[6].close', hours[6].close)
	changeFieldValue('verified.hours', verified.hours)

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
