import React, { Component } from 'react'
import injectSheet from 'react-jss'

import MiniAppForm from './form'
import { getPregnancyResourceCenters } from './data/action-creators'

class MiniApp extends Component {
	submit = ({ locationInput }) => {
		const { dispatch } = this.props
		dispatch(getPregnancyResourceCenters(locationInput))
	}

	render() {
		return (
			<div>
				The Mini App
				<MiniAppForm onSubmit={this.submit} />
			</div>
		)
	}
}

const styles = {
	root: {
		height: '0px',
	},
}

export default injectSheet(styles)(MiniApp)
