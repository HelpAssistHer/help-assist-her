import React, { Component } from 'react'
import { connect } from 'react-redux'
import injectSheet from 'react-jss'
import { withRouter } from 'react-router-dom'

import MiniAppForm from './form'
import { getPregnancyResourceCenters } from './data/action-creators'
import Header from './header'

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
				<MiniAppForm onSubmit={this.submit} />
			</div>
		)
	}
}

const styles = {}

const MiniAppStyle = injectSheet(styles)(MiniApp)

export default connect()(withRouter(MiniAppStyle))
