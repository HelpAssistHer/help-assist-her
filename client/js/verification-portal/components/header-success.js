import React from 'react'
import injectSheet from 'react-jss'

const HeaderSuccess = ({ classes }) => {
	return <div className={classes.root} />
}

const styles = {
	root: {
		height: '0px', //'246px',
	},
}

export default injectSheet(styles)(HeaderSuccess)
