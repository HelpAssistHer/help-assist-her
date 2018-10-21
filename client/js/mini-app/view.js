import React, { Component } from 'react'
import { connect } from 'react-redux'
import injectSheet from 'react-jss'
import { withRouter } from 'react-router-dom'

import MiniAppForm from './form'
import { getPregnancyResourceCenters } from './data/action-creators'

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
				<div className={classes.header}>
					Made by women, for women to help you make independent, informed
					healthcare decisions.
				</div>
				<MiniAppForm onSubmit={this.submit} />
			</div>
		)
	}
}

const styles = {
	header: {
		'background-color': '#016454',
		color: '#abd3f9',
		'font-family': 'sans-serif',
		'font-size': '30px',
		height: '104px',
		padding: '60px 20px 40px 80px',
	},
}

const MiniAppStyle = injectSheet(styles)(MiniApp)

export default connect()(withRouter(MiniAppStyle))
