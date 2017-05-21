import React from 'react'
import { connect } from 'react-redux'

import VerificationPortalForm from './form'

const mapStateToProps = state => {
	return {
		name: 'Name',
	}
}

const mapDispatchToProps = dispatch => {
	return {
		getResourceToVerify: () => {
			dispatch(getResourceToVerify)
		}
	}
}

const VerificationPortal = connect(
	mapStateToProps,
	mapDispatchToProps
)(VerificationPortalForm)

export default VerificationPortal
