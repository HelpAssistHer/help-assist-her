import React from 'react'
import injectSheet from 'react-jss'

import GetResourceToVerifyButton from './get-resource-to-verify-button'
import Spacer from '../components/spacer'
import VerificationPortalForm from './form'
import { updateResource } from './action-creators'
import Button from '../components/button'
import { shouldShowFeature } from '../hah-app/helpers'
import { updateOutOfBusiness } from './out-of-business/action-creators'

class VerificationPortal extends React.Component {
	constructor(props) {
		super(props)
	}
	submit = values => {
		updateResource(values)
	}
	render() {
		const userDisplayName = _.get(this.props, 'initialData.userDisplayName')
		const { classes, changeFieldValue, resource } = this.props
		const { outOfBusiness } = resource

		return (
			<div>
				<div className={classes.leftPositionButton}>
					<GetResourceToVerifyButton changeFieldValue={changeFieldValue} />
				</div>
				<div className={classes.verificationPortal}>
					{shouldShowFeature(userDisplayName) && (
						<div className={classes.leftPositionButton}>
							<Button
								activeState={!!outOfBusiness}
								buttonText="Out of Business"
								size="medium"
								onClick={() => updateOutOfBusiness(!outOfBusiness)}
							/>
						</div>
					)}

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
		width: '100%',
		position: 'absolute',
		left: '1%',
		'z-index': '100',
	},
}

export default injectSheet(styles)(VerificationPortal)
