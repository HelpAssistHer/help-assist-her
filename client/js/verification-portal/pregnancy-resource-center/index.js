import { connect } from 'react-redux'
import { change } from 'redux-form'

import VerificationPortal from './view'

const mapStateToProps = state => {
	const { initialData, resource } = state

	return {
		initialData,
		resource,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		changeFieldValue: (field, value) => {
			dispatch(change('verificationPortal', field, value || ''))
		},
		handleVerificationFormSubmit: values => {
			console.log('hitting the handleVerificationFormSubmit func')
			console.log(values)
			debugger
		},
	}
}

const VerificationPortalContainer = connect(
	mapStateToProps,
	mapDispatchToProps,
)(VerificationPortal)

export default VerificationPortalContainer
