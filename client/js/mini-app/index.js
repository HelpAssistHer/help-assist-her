import React from 'react'
import injectSheet from 'react-jss'

import ResourceTypeButton from './components/resource-type-button'

const MiniApp = ({ classes }) => {
	return (
		<div className={classes.root}>
			The Mini App
			<ResourceTypeButton />
		</div>
	)
}

const styles = {
	root: {
		height: '0px',
	},
}

export default injectSheet(styles)(MiniApp)
