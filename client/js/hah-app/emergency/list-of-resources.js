import React from 'react'
import injectSheet from 'react-jss'
import _ from 'lodash'

import resourceData from './resource-data'
import ResourceCard from './resource-card'

const ListOfResources = ({ classes }) => (
	<div className={classes.background}>
		{_.map(resourceData, resource => (
			<ResourceCard key={resource.nameOfResource} resource={resource} />
		))}
	</div>
)

const styles = {
	background: {
		'background-color': 'rgba(93,93,93,0.08)',
	},
}

export default injectSheet(styles)(ListOfResources)
