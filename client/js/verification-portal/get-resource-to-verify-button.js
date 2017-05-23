import React from 'react'
import { connect } from 'react-redux'

import { getResourceToVerify } from './action-creators'
import Button from '../components/button'
import Spacer from '../components/spacer'

const GetResourceToVerifyButton = ({ dispatch, changeFieldValue }) => {
	return (
		<div>
			<Spacer height='20px' />
			<Button
				buttonText='Get One Resource'
				onClick={() => {
					dispatch(getResourceToVerify())
					changeFieldValue('name', 'Some Text')
				}}
			/>
			<Spacer height='50px' />
		</div>
	)
}

export default connect()(GetResourceToVerifyButton)
