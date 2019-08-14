import React from 'react'
import injectSheet from 'react-jss'

import { Phone, Tablet, Desktop } from '../../components/breakpoints'
import Spacer from '../../components/spacer'

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

			<Tablet>
				<div>
					<Spacer height="67px" />
					<div className={classes.stepNumberDesktop}>{stepNumber}</div>
					<div className={classes.stepDescriptionDesktop}>
						{stepDescription}
					</div>
				</div>
			</Tablet>

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
		height: '20px',
		'line-height': '20px',
	},
	stepDescriptionPhone: {
		'font-family': 'hah-regular',
		color: '#000000',
		'font-size': '14px',
		height: '20px',
		'line-height': '20px',
	},
	stepNumberDesktop: {
		'font-family': 'hah-bold',
		'letter-spacing': '5px',
		'font-size': '18px',
		color: '#3d65f9',
		height: '40px',
		'line-height': '40px',
	},
	stepDescriptionDesktop: {
		'font-family': 'hah-regular',
		color: '#000000',
		'font-size': '25px',
		height: '40px',
		'line-height': '40px',
	},
}

export default injectSheet(styles)(Instruction)
