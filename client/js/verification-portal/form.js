import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'

class VerificationPortalForm extends Component {
	render() {
		const { handleSubmit } = this.props

		return (
			<form onSubmit={handleSubmit}>
				<Field
					name='name'
					component='input'
					type='text'
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
