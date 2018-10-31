import React, { Component } from 'react'
import { connect } from 'react-redux'
import injectSheet from 'react-jss'
import { withRouter } from 'react-router-dom'

import MiniAppForm from './form'
import { getPregnancyResourceCenters } from './data/action-creators'
import Header from './header'
import Instruction from './instruction'
import ResourceCarousel from './components/resource-carousel'

class MiniApp extends Component {
	submit = ({ locationInput }) => {
		const { dispatch, history } = this.props
		dispatch(getPregnancyResourceCenters(locationInput))
		history.push('/mini-app/pregnancy-resource-centers')
	}

	render() {
		const { classes } = this.props

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
				<div className={classes.address}>
					<div className={classes.addressInput}>
						<MiniAppForm onSubmit={this.submit} />
					</div>
				</div>
				<div className={classes.footer}>Help Assist Her</div>
			</div>
		)
	}
}

const styles = {
	address: {
		display: 'flex',
		'justify-content': 'center',
	},
	addressInput: {
		width: '478px',
	},
	footer: {
		height: '188px',
		'background-color': '#3d65f9',
		'margin-top': '100px',
	},
}

const MiniAppStyle = injectSheet(styles)(MiniApp)

export default connect()(withRouter(MiniAppStyle))
