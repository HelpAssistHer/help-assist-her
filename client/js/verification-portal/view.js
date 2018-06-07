import React from 'react'
import injectSheet from 'react-jss'

import GetResourceToVerifyButton from './get-resource-to-verify-button'
import HeaderSuccess from './components/header-success'
import LoginButton from '../authentication/facebook-login-button'
import Spacer from '../components/spacer'
import VerificationPortalForm from './form'
import { updateResource } from './action-creators'
import Button from '../components/button'
import { updateOutOfBusiness } from './out-of-business/action-creators'

class VerificationPortal extends React.Component {
	constructor(props) {
		super(props)
	}
	submit = values => {
		updateResource(values)
	}
	render() {
		const { classes, changeFieldValue, resource } = this.props
		const { outOfBusiness } = resource

		return (
			<div>
				<HeaderSuccess />
				<div className={classes.leftPositionButton}>
					<GetResourceToVerifyButton changeFieldValue={changeFieldValue} />
					<Spacer height="25px" />
					<LoginButton />
				</div>
				<div className={classes.rightPositionButton}>
					<Button
						activeState={!!outOfBusiness}
						buttonText="Out of Business"
						size="medium"
						onClick={() => updateOutOfBusiness(!outOfBusiness)}
					/>
				</div>
				<div className={classes.verificationPortal}>
					<VerificationPortalForm
						outOfBusiness={!!outOfBusiness}
						onSubmit={this.submit}
					/>
					<Spacer height="100px" />
				</div>
			</div>
		)
	}
}

const styles = {
	verificationPortal: {
		'text-align': 'center',
		'font-family': 'sans-serif',
		color: '#4A4A4A',
		'max-width': '903px',
		'margin-left': 'calc(50% - 451.5px)',
		'background-color': '#ffffff',
		'padding-left': '15px',
		'padding-right': '15px',
		position: 'relative',
	},
	leftPositionButton: {
		'padding-top': '50px',
		position: 'absolute',
		left: '1%',
		'z-index': '100',
	},
	rightPositionButton: {
		float: 'right',
		'padding-right': '50px',
	},
}

export default injectSheet(styles)(VerificationPortal)
