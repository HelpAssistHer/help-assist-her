import React from 'react'
import { Field, reduxForm } from 'redux-form'

import GetResourceToVerifyButton from './get-resource-to-verify-button'
import Input from '../components/input'

const VerificationPortalForm = () => {
	return (
		<div>
			<h1>VERIFICATION PORTAL</h1>
			<h3>Type: Pregnancy Centers</h3>
			<GetResourceToVerifyButton />

			<h3>General Info</h3>
			<div>
				<Field
					name='resourceName'
					component={Input}
					type='text'
					label='Name'
				/>
			</div>
		</div>
	)
}

export default reduxForm({
	form: 'verificationPortal'
})(VerificationPortalForm)
