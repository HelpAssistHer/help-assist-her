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
	changeFieldValue('name-verified', verified.name)
	changeFieldValue('address1', address.line1)
	changeFieldValue('address2', address.line2)
	changeFieldValue('city', address.city)
	changeFieldValue('state', address.state)
	changeFieldValue('zip', address.zip)
	changeFieldValue('address-verified', verified.address)
	changeFieldValue('phone', phone)
	changeFieldValue('phone-verified', verified.phone)
	changeFieldValue('website', website)
	changeFieldValue('website-verified', verified.website)

	changeFieldValue('primary-contact-first-name', primaryContactUser.firstName)
	changeFieldValue('primary-contact-last-name', primaryContactUser.lastName)
	changeFieldValue('primary-contact-phone', primaryContactUser.phone)
	changeFieldValue('primary-contact-email', primaryContactUser.email)
	changeFieldValue('primary-contact-verified', verified.primaryContact)

	_.each(services, service => {
		changeFieldValue(service, 1)
	})
	changeFieldValue('services-verified', verified.services)

	changeFieldValue('sunday-open', hours[0].open)
	changeFieldValue('sunday-close', hours[0].close)
	changeFieldValue('monday-open', hours[1].open)
	changeFieldValue('monday-close', hours[1].close)
	changeFieldValue('tuesday-open', hours[2].open)
	changeFieldValue('tuesday-close', hours[2].close)
	changeFieldValue('wednesday-open', hours[3].open)
	changeFieldValue('wednesday-close', hours[3].close)
	changeFieldValue('thursday-open', hours[4].open)
	changeFieldValue('thursday-close', hours[4].close)
	changeFieldValue('friday-open', hours[5].open)
	changeFieldValue('friday-close', hours[5].close)
	changeFieldValue('saturday-open', hours[6].open)
	changeFieldValue('saturday-close', hours[6].close)
	changeFieldValue('hours-verified', verified.hours)

	changeFieldValue('notes', notes)
}

const GetResourceToVerifyButton = ({ dispatch, changeFieldValue }) => {
	return (
		<div>
			<Spacer height='20px' />
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
			<Spacer height='50px' />
		</div>
	)
}

export default connect()(GetResourceToVerifyButton)
