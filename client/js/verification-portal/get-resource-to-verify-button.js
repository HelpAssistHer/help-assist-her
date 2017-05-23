import React from 'react'
import { connect } from 'react-redux'

import { getResourceToVerify } from './action-creators'
import Button from '../components/button'
import Spacer from '../components/spacer'
import { store } from '../hah-app/index'

const updateForm = ({ changeFieldValue, resource }) => {
	const { name } = resource

	changeFieldValue('name', name)
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
