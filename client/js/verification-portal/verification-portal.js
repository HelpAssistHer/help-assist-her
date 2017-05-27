import React from 'react'
import injectSheet from 'react-jss'

import GetResourceToVerifyButton from './get-resource-to-verify-button'
import Spacer from '../components/spacer'
import VerificationPortalForm from './form'
import { updateResource } from './action-creators'

class VerificationPortal extends React.Component {
	submit = (values) => {
		updateResource(values)
	}
	render() {
		const { classes, changeFieldValue } = this.props

		return (
			<div className={classes.verificationPortal}>
				<h1>VERIFICATION PORTAL</h1>
				<h3>Type: Pregnancy Centers</h3>
				<GetResourceToVerifyButton
					changeFieldValue={changeFieldValue}
				/>

				<VerificationPortalForm
					onSubmit={this.submit}
				/>
				<Spacer height='100px'/>
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

VerificationPortal = injectSheet(styles)(VerificationPortal)

export default VerificationPortal
