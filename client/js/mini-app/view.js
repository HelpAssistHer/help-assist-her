import React, { Component } from 'react'
import injectSheet from 'react-jss'

import MiniAppForm from './form'

class MiniApp extends Component {
	submit = values => {
		console.log('VALUES', values)
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
