import React from 'react'
import injectSheet from 'react-jss'
import _ from 'lodash'

import resourceData from './resource-data'
import ResourceCard from './resource-card'

const ListOfResources = ({ classes }) => (
	<div className={classes.listOfResourcesRoot}>
		{_.map(resourceData, resource => (
			<ResourceCard key={resource.nameOfResource} resource={resource} />
		))}
	</div>
)

const styles = {
	listOfResourcesRoot: {
		display: 'flex',
		'flex-wrap': 'wrap',
		'justify-content': 'center',
	},
}

export default injectSheet(styles)(ListOfResources)
