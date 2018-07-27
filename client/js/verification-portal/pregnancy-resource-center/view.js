import React from 'react'
import injectSheet from 'react-jss'

import GetResourceToVerifyButton from './get-resource-to-verify-button'
import Spacer from '../../components/spacer'
import VerificationPortalForm from './form'
import { updateResource } from './action-creators'
import Button from '../../components/button'
import { updateOutOfBusiness } from '../out-of-business/action-creators'
import { updateDoNotList } from '../do-not-list/action-creators'

class VerificationPortal extends React.Component {
	submit = values => {
		updateResource(values)
	}
	render() {
		const { classes, changeFieldValue, resource } = this.props
		const { outOfBusiness, doNotList } = resource
		return (
			<div>
				<div className={classes.leftPositionButton}>
					<GetResourceToVerifyButton changeFieldValue={changeFieldValue} />
				</div>
				<div className={classes.rightPositionButton}>
					<Button
						activeState={outOfBusiness}
						buttonText="Out of Business"
						size="medium"
						onClick={() => updateOutOfBusiness(!outOfBusiness)}
					/>
					<div className={classes.moveDown}>
						<Button
							activeState={doNotList}
							buttonText="Do Not List"
							size="medium"
							onClick={() => updateDoNotList(!doNotList)}
						/>
					</div>
				</div>
				<div className={classes.verificationPortal}>
					<VerificationPortalForm
						outOfBusiness={outOfBusiness}
						doNotList={doNotList}
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
		display: 'block',
		position: 'absolute',
		right: '5%',
		'z-index': '100',
	},
	moveDown: {
		'margin-top': '25px',
	},
}

export default injectSheet(styles)(VerificationPortal)
