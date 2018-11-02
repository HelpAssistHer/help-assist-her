import React, { Component } from 'react'
import { connect } from 'react-redux'
import injectSheet from 'react-jss'
import { withRouter } from 'react-router-dom'

import MiniAppForm from './form'
import { getPregnancyResourceCenters } from './data/action-creators'
import Header from './header'
import Instruction from './instruction'
import ResourceCarousel from './components/resource-carousel'
import MiniAppFooter from './components/footer'

class MiniApp extends Component {
	submit = ({ locationInput }) => {
		const { dispatch, history } = this.props
		dispatch(getPregnancyResourceCenters(locationInput))
		history.push('/mini-app/pregnancy-resource-centers')
	}

	render() {
		return (
			<div>
				<Header />
				<Instruction
					stepNumber="STEP ONE"
					stepDescription="Select one of the following:"
				/>
				<ResourceCarousel />
				<Instruction
					stepNumber="STEP TWO"
					stepDescription="Enter your location:"
				/>
				<MiniAppForm onSubmit={this.submit} />
				<MiniAppFooter />
			</div>
		)
	}
}

const styles = {}

const MiniAppStyle = injectSheet(styles)(MiniApp)

export default connect()(withRouter(MiniAppStyle))
