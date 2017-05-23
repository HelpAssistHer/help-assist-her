import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'

import Input from '../components/input'

class VerificationPortalForm extends Component {
	render() {
		const { handleSubmit } = this.props

		return (
			<form onSubmit={handleSubmit}>
				<Field
					name='name'
					component={Input}
					type='text'
					label='Name'
				/>
				<button type="submit">Submit</button>
			</form>
		)
	}
}

VerificationPortalForm = reduxForm({
	form: 'verificationPortal',
})(VerificationPortalForm)

export default VerificationPortalForm
