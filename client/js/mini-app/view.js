import React, { Component } from 'react'
import { connect } from 'react-redux'
import injectSheet from 'react-jss'
import { withRouter } from 'react-router-dom'

import { getPregnancyResourceCenters } from './data/action-creators'
import Header from './header'
import Questions from './questions'
import Footer from './components/footer'

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
				<Questions />
				<Footer />
			</div>
		)
	}
}

const styles = {}

const MiniAppStyle = injectSheet(styles)(MiniApp)

export default connect()(withRouter(MiniAppStyle))
