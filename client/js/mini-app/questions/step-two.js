import React, { Component } from 'react'
import injectSheet from 'react-jss'

import Instruction from './instruction'
import MiniAppForm from '../form'
import { Phone, BigPhone, Tablet, Desktop } from '../../components/breakpoints'

class StepTwo extends Component {
	render() {
		const { classes, onResourceChange } = this.props

		return (
			<div>
				<Phone>
					<div className={classes.stepTwoContainer}>
						<button
							className={classes.backButtonPhone}
							onClick={() => onResourceChange(null)}
						/>
						<div>
							<Instruction
								stepNumber="STEP TWO"
								stepDescription="Where do you need access to care?"
							/>
							<div className={classes.betaTextPhone}>
								*beta only available in NY*
							</div>
							<MiniAppForm />
						</div>
					</div>
				</Phone>

				<BigPhone>
					<div className={classes.stepTwoContainer}>
						<button
							className={classes.backButtonPhone}
							onClick={() => onResourceChange(null)}
						/>
						<div>
							<Instruction
								stepNumber="STEP TWO"
								stepDescription="Where do you need access to care?"
							/>
							<div className={classes.betaTextBigPhone}>
								*beta only available in NY*
							</div>
							<MiniAppForm />
						</div>
					</div>
				</BigPhone>

				<Tablet>
					<div className={classes.stepTwoContainer}>
						<button
							className={classes.backButtonDesktop}
							onClick={() => onResourceChange(null)}
						/>
						<div>
							<Instruction
								stepNumber="STEP TWO"
								stepDescription="Where do you need access to care?"
							/>
							<div className={classes.betaTextDesktop}>
								*beta only available in NY*
							</div>
							<MiniAppForm />
						</div>
					</div>
				</Tablet>

				<Desktop>
					<div className={classes.stepTwoContainer}>
						<button
							className={classes.backButtonDesktop}
							onClick={() => onResourceChange(null)}
						/>
						<div>
							<Instruction
								stepNumber="STEP TWO"
								stepDescription="Where do you need access to care?"
							/>
							<div className={classes.betaTextDesktop}>
								*beta only available in NY*
							</div>
							<MiniAppForm />
						</div>
					</div>
				</Desktop>
			</div>
		)
	}
}

const styles = {
	stepTwoContainer: {
		display: 'grid',
		'grid-template-columns': '20% 60% 20%',
	},
	backButtonPhone: {
		'align-self': 'center',
		'justify-self': 'center',
		height: '20px', // 15px is too small for mobile devices
		width: '20px', // 15px is too small for mobile devices
		'border-top': 'none',
		'border-right': 'none',
		'border-bottom': '1px solid #3D65F9',
		'border-left': '1px solid #3D65F9',
		transform: 'rotate(45deg)',
		cursor: 'pointer',
		outline: 'none',
		'background-color': '#FFFFFF', // for Safari
		'-webkit-tap-highlight-color': 'transparent', // for Safari
	},
	backButtonDesktop: {
		'align-self': 'center',
		'justify-self': 'center',
		height: '30px',
		width: '30px',
		'border-top': 'none',
		'border-right': 'none',
		'border-bottom': '2px solid #3D65F9',
		'border-left': '2px solid #3D65F9',
		transform: 'rotate(45deg)',
		cursor: 'pointer',
		outline: 'none',
		'background-color': '#FFFFFF', // for Safari
		'-webkit-tap-highlight-color': 'transparent', // for Safari
	},
	betaTextPhone: {
		'text-align': 'center',
		color: '#000000',
		'font-family': 'hah-regular',
		opacity: 0.5,
		'font-size': '3.5vw',
		'line-height': '30px',
	},
	betaTextBigPhone: {
		'text-align': 'center',
		color: '#000000',
		'font-family': 'hah-regular',
		opacity: 0.5,
		'font-size': '16px',
		'line-height': '30px',
	},
	betaTextDesktop: {
		'text-align': 'center',
		color: '#000000',
		'font-size': '16px',
		'line-height': '30px',
		'font-family': 'hah-regular',
		opacity: 0.5,
	},
}

export default injectSheet(styles)(StepTwo)
