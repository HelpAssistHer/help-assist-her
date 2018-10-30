import React, { Component } from 'react'
import { connect } from 'react-redux'
import injectSheet from 'react-jss'

import HahRouter from './router'
import { getInitialAppData } from './action-creators'
import './global.css'

class App extends Component {
	componentDidMount() {
		this.props.dispatch(getInitialAppData())
	}

	render() {
		const { classes } = this.props
		return (
			<div id="app" className={classes.app}>
				<HahRouter />
			</div>
		)
	}
}

const styles = {
	app: {
		height: '100%',
	},
}

const AppWithStyle = injectSheet(styles)(App)

export default connect()(AppWithStyle)
