import React, { Component } from 'react'
import { Field, reduxForm, change } from 'redux-form'
import { connect } from 'react-redux'

import Input from '../components/input'

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

// const mapStateToProps = state => {
// 	console.log('MAP STATE TO PROPS', state.resource)
// 	return {
// 		resource: state.resource,
// 	}
// }
//
// const mapDispatchToProps = dispatch => {
// 	return {
// 		getResourceToVerify: () => {
// 			dispatch(getResourceToVerify)
// 		},
// 		changeFieldValue: (field, value) => {
// 			dispatch(change(form, field, value))
// 		}
// 	}
// }
//
// VerificationPortalForm = connect(
// 	mapStateToProps,
// 	mapDispatchToProps
// )(VerificationPortalForm)

VerificationPortalForm = reduxForm({
	form: 'verificationPortal',
})(VerificationPortalForm)

export default VerificationPortalForm
