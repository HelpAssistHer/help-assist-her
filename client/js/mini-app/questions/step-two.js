import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

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
		return (
			<div>
				<Instruction
					stepNumber="STEP TWO"
					stepDescription="Where do you need access to care?"
				/>
				<MiniAppForm onSubmit={this.submit} />
			</div>
		)
	}
}

export default connect()(withRouter(StepTwo))
