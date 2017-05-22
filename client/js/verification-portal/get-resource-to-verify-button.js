import React from 'react'
import { connect } from 'react-redux'

import { getResourceToVerify } from './action-creators'
import Button from '../components/button'
import Spacer from '../components/spacer'

const GetResourceToVerifyButton = ({ dispatch }) => {
	return (
		<div>
			<Spacer height='20px' />
			<Button
				buttonText='Get One Resource'
				onClick={() => {
					dispatch(getResourceToVerify())
				}}
			/>
			<Spacer height='50px' />
		</div>
	)
}

export default connect()(GetResourceToVerifyButton)
