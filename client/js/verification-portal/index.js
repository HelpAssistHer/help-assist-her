import React from 'react'
import { connect } from 'react-redux'
import injectSheet from 'react-jss'

import GetResourceToVerifyButton from './get-resource-to-verify-button'
import VerificationPortalForm from './form'

class VerificationPortal extends React.Component {
	submit = (values) => {
		// Do something with the form values
		console.log('SUBMITTED', values)
	}
	render() {
		const { classes } = this.props

		return (
			<div className={classes.verificationPortal}>
				<h1>VERIFICATION PORTAL</h1>
				<h3>Type: Pregnancy Centers</h3>
				<GetResourceToVerifyButton />

				<h3>General Info</h3>
				<VerificationPortalForm onSubmit={this.submit} />
			</div>
		)
	}
}

const styles = {
	verificationPortal: {
		'text-align': 'center',
		'font-family': 'sans-serif',
		color: '#4A4A4A',
	},
}

export default injectSheet(styles)(VerificationPortal)

// const mapStateToProps = state => {
// 	console.log('MAP STATE TO PROPS', state.resource.name)
// 	return {
// 		resource: state.resource,
// 	}
// }
//
// const mapDispatchToProps = dispatch => {
// 	return {
// 		getResourceToVerify: () => {
// 			dispatch(getResourceToVerify)
// 		}
// 	}
// }
//
// const VerificationPortal = connect(
// 	mapStateToProps,
// 	mapDispatchToProps
// )(VerificationPortalForm)
//
// export default VerificationPortal
