import React from 'react'
import injectSheet from 'react-jss'

const MiniApp = ({ classes }) => {
	return <div className={classes.root}>The Mini App</div>
}

const styles = {
	root: {
		height: '0px',
	},
}

export default injectSheet(styles)(MiniApp)
