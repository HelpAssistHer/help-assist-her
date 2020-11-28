import React from 'react'
import injectSheet from 'react-jss'

import Spacer from '../../components/Spacer'
import VerificationPortalForm from './form'
import Button from '../../components/Button'
import { updateOutOfBusiness } from '../out-of-business/action-creators'
import { updateDoNotList } from '../do-not-list/action-creators'

const VerificationPortal = ({ classes, resource }) => {
	const { outOfBusiness, doNotList } = resource

	return (
		<div>
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
				/>
				<Spacer height="100px" />
			</div>
		</div>
	)
}

const styles = {
	verificationPortal: {
		'text-align': 'center',
		'font-family': 'sans-serif',
		color: '#4A4A4A',
		'max-width': '903px',
		'margin-left': '81px',
		'background-color': '#ffffff',
		'padding-left': '15px',
		'padding-right': '15px',
		position: 'relative',
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
