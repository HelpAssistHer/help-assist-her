import React from 'react'
import injectSheet from 'react-jss'
import _ from 'lodash'
import ResourceCard from './resource-card'

const ValidResults = ({ classes, pregnancyResourceCenters }) => {
	return (
		<div className={classes.validResultsRoot}>
			{_.map(pregnancyResourceCenters, prc => {
				return <ResourceCard key={prc._id} resource={prc} />
			})}
		</div>
	)
}

const styles = {
	validResultsRoot: {
		padding: '48px',
	},
}

export default injectSheet(styles)(ValidResults)
