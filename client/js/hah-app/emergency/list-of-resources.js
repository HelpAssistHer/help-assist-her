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
		'background-color': 'rgba(93,93,93,0.08)',
	},
	paddingPhone: {
		padding: '20px 0px',
	},
	paddingDesktop: {
		padding: '46px 0px',
	},
}

export default injectSheet(styles)(ListOfResources)
