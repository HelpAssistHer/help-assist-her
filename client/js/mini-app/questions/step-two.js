import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import injectSheet from 'react-jss'

import Instruction from './instruction'
import MiniAppForm from '../form'
import { getPregnancyResourceCenters } from '../data/action-creators'

class StepTwo extends Component {
	submit = ({ locationInput }) => {
		const { dispatch, history } = this.props
		dispatch(getPregnancyResourceCenters(locationInput))
		history.push('/mini-app/pregnancy-resource-centers')
	}

	render() {
		const { classes } = this.props

		return (
			<div>
				<div className={classes.backButton} />
				<Instruction
					stepNumber="STEP TWO"
					stepDescription="Where do you need access to care?"
				/>
				<MiniAppForm onSubmit={this.submit} />
			</div>
		)
	}
}

const styles = {
	backButton: {
		height: '30px',
		width: '30px',
		'border-left': '2px solid #000000',
		'border-bottom': '2px solid #000000',
		transform: 'rotate(45deg)',
	},
}

const StepTwoWithStyle = injectSheet(styles)(StepTwo)

export default connect()(withRouter(StepTwoWithStyle))
