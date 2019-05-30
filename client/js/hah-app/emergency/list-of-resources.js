import React from 'react'
import injectSheet from 'react-jss'

import resourceData from './resource-data'
import ResourceCard from './resource-card'

const resource1 = resourceData[0]

const ListOfResources = ({ classes }) => (
	<div className={classes.background}>
		List
		<ResourceCard resource={resource1} />
	</div>
)

const styles = {
	background: {
		'background-color': 'rgba(93,93,93,0.08)',
	},
}

export default injectSheet(styles)(ListOfResources)
