import { connect } from 'react-redux'

import VerificationPortal from './verification-portal'

const mapStateToProps = state => {
	return {
		resource: state.resource,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		getResourceToVerify: () => {
			dispatch(getResourceToVerify)
		},
	}
}

const VerificationPortalContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(VerificationPortal)

export default VerificationPortalContainer
