import { connect } from 'react-redux'
import { change } from 'redux-form'

import VerificationPortal from './verification-portal'

const mapStateToProps = state => {
	const { initialData, resource } = state

	return {
		initialData,
		resource,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		getResourceToVerify: () => {
			dispatch(getResourceToVerify)
		},
		changeFieldValue: (field, value) => {
			dispatch(change('verificationPortal', field, value || ''))
		}
	}
}

const VerificationPortalContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(VerificationPortal)

export default VerificationPortalContainer
