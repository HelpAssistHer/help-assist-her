import React from 'react'
import injectSheet from 'react-jss'

import { Phone, Desktop } from '../components/breakpoints'
import Spacer from '../components/spacer'

const Instruction = ({ classes, stepNumber, stepDescription }) => {
	return (
		<div className={classes.instructionRoot}>
			<Phone>
				<div>
					<Spacer height="29px" />
					<div className={classes.stepNumberPhone}>{stepNumber}</div>
					<div className={classes.stepDescriptionPhone}>{stepDescription}</div>
				</div>
			</Phone>
			<Desktop>
				<div>
					<Spacer height="67px" />
					<div className={classes.stepNumberDesktop}>{stepNumber}</div>
					<div className={classes.stepDescriptionDesktop}>
						{stepDescription}
					</div>
				</div>
			</Desktop>
		</div>
	)
}

const styles = {
	instructionRoot: {
		'text-align': 'center',
	},
	stepNumberPhone: {
		'font-family': 'hah-bold',
		'letter-spacing': '2px',
		'font-size': '10px',
		color: '#3d65f9',
	},
	stepDescriptionPhone: {
		color: '#000000',
		'font-size': '14px',
	},
	stepNumberDesktop: {
		'font-family': 'hah-bold',
		'letter-spacing': '2px',
		'font-size': '18px',
		color: '#3d65f9',
	},
	stepDescriptionDesktop: {
		color: '#000000',
		'font-size': '25px',
	},
}

export default injectSheet(styles)(Instruction)
