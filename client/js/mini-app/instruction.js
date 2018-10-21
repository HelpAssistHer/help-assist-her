import React from 'react'
import injectSheet from 'react-jss'

import { Phone, Desktop } from '../components/breakpoints'

const Instruction = ({ classes, stepNumber, stepDescription }) => {
	return (
		<div className={classes.instructionRoot}>
			<Phone>
				<div>
					<div className={classes.stepNumberPhone}>{stepNumber}</div>
					<div className={classes.stepDescriptionPhone}>{stepDescription}</div>
				</div>
			</Phone>
			<Desktop>
				<div>
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
		'font-family': 'sans-serif',
		'margin-top': '40px',
	},
	stepNumberPhone: {
		'font-weight': 'bold',
		'font-size': '10px',
		color: '#3d65f9',
		'margin-bottom': '20px',
	},
	stepDescriptionPhone: {
		color: '#000000',
		'font-size': '14px',
	},
	stepNumberDesktop: {
		'font-weight': 'bold',
		'font-size': '18px',
		color: '#3d65f9',
		'margin-bottom': '20px',
	},
	stepDescriptionDesktop: {
		color: '#000000',
		'font-size': '25px',
	},
}

export default injectSheet(styles)(Instruction)
