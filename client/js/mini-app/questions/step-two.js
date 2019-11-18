import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import injectSheet from 'react-jss'

import Instruction from './instruction'
import MiniAppForm from '../form'
import { getPregnancyResourceCenters } from '../data/action-creators'
import { Phone, BigPhone, Tablet, Desktop } from '../../components/breakpoints'

class StepTwo extends Component {
	submit = ({ locationInput }) => {
		const { dispatch, history } = this.props
		dispatch(getPregnancyResourceCenters(locationInput))
		history.push('/mini-app/pregnancy-resource-centers')
	}

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
							<MiniAppForm onSubmit={this.submit} />
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
							<MiniAppForm onSubmit={this.submit} />
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
							<MiniAppForm onSubmit={this.submit} />
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
							<MiniAppForm onSubmit={this.submit} />
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
		height: '15px',
		width: '15px',
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
}

const StepTwoWithStyle = injectSheet(styles)(StepTwo)

export default connect()(withRouter(StepTwoWithStyle))
