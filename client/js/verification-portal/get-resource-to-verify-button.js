import React from 'react'
import { connect } from 'react-redux'

import { getResourceToVerify } from './action-creators'
import Button from '../components/button'
import Spacer from '../components/spacer'
import { store } from '../hah-app/index'

const updateForm = ({ changeFieldValue, resource }) => {
	const { name, address, phone, website } = resource

	changeFieldValue('name', name)
	changeFieldValue('address1', address.line1)
	changeFieldValue('address2', address.line2)
	changeFieldValue('city', address.city)
	changeFieldValue('state', address.state)
	changeFieldValue('zip', address.zip)
	changeFieldValue('phone', phone)
	changeFieldValue('website', website)
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
