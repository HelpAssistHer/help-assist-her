import React from 'react'
import injectSheet from 'react-jss'

const ResourceCard = ({ classes, resourceName }) => {
	return <div className={classes.root}>{resourceName}</div>
}

const styles = {
	root: {
		height: '0px',
	},
}

export default injectSheet(styles)(ResourceCard)
