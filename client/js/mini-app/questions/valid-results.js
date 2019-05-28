import React from 'react'
import injectSheet from 'react-jss'
import _ from 'lodash'
import ResourceCard from './resource-card'

const ValidResults = ({ classes, pregnancyResourceCenters }) => {
	return (
		<div className={classes.list}>
			{_.map(pregnancyResourceCenters, prc => {
				return <ResourceCard key={prc._id} resource={prc} />
			})}
		</div>
	)
}

const styles = {
	list: {
		'min-height': '70vh',
	},
	// todo is this even used?
}

export default injectSheet(styles)(ValidResults)
