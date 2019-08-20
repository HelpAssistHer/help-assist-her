import React from 'react'
import injectSheet from 'react-jss'

import { Phone, Tablet, Desktop } from '../../components/breakpoints'
import Spacer from '../../components/spacer'

const Instruction = ({ classes, stepNumber, stepDescription }) => {
	return (
		<div className={classes.instructionRoot}>
			<Phone>
				<div>
					<div className={classes.stepNumberPhone}>{stepNumber}</div>
					<Spacer height="10px" />
					<div className={classes.stepDescriptionPhone}>{stepDescription}</div>
				</div>
			</Phone>

			<Tablet>
				<div>
					<div className={classes.stepNumberDesktop}>{stepNumber}</div>
					<Spacer height="30px" />
					<div className={classes.stepDescriptionDesktop}>
						{stepDescription}
					</div>
				</div>
			</Tablet>

			<Desktop>
				<div>
					<div className={classes.stepNumberDesktop}>{stepNumber}</div>
					<Spacer height="30px" />
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
		display: 'flex',
		'flex-direction': 'column',
		'align-items': 'center',
	},
	stepNumberPhone: {
		'font-family': 'hah-bold',
		'letter-spacing': '2px',
		'font-size': '10px',
		color: '#3d65f9',
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
	stepDescriptionPhone: {
		'font-family': 'hah-regular',
		color: '#000000',
		'font-size': '14px',
		height: '20px',
		'line-height': '20px',
		'max-width': '225px',
	},
	stepDescriptionDesktop: {
		'font-family': 'hah-regular',
		color: '#000000',
		'font-size': '30px',
		height: '40px',
		'line-height': '40px',
		'max-width': '500px',
	},
}

export default injectSheet(styles)(Instruction)
