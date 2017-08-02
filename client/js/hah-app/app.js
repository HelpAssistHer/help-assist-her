import React from 'react'
import injectSheet from 'react-jss'

import Header from './header'
import HahRouter from './router'

const App = ({ classes }) => (
	<div id='app' className={classes.app}>
		<Header />
		<HahRouter />
	</div>
)

const styles = {
	app: {
		background: '-webkit-gradient(linear, left top, left bottom, from(#fff), to(#DFDCDC))',
		height: '100%',
	}
}

export default injectSheet(styles)(App)
