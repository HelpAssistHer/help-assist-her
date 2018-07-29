import React from 'react'
import injectSheet from 'react-jss'

const ResourceTypeButton = ({ classes }) => {
	return (
		<div className={classes.root}>
			<button>Pregnancy Centers</button>
		</div>
	)
}

const styles = {
	root: {
		height: '0px',
	},
}

export default injectSheet(styles)(ResourceTypeButton)
