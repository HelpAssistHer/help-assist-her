import React from 'react'
import injectSheet from 'react-jss'

const ResourceList = ({ classes }) => {
	return <div className={classes.root}>A LIST OF AWESOME PREGNANCY CENTERS</div>
}

const styles = {
	root: {
		height: '0px',
	},
}

export default injectSheet(styles)(ResourceList)
