import React from 'react'
import _ from 'lodash'
import injectSheet from 'react-jss'

import ResourceCard from './resource-card'

const ResourceList = ({ classes }) => {
	return (
		<div className={classes.root}>
			A LIST OF AWESOME PREGNANCY CENTERS
			{_.map(['Name 1', 'Name 2'], name => {
				return <ResourceCard key={name} resourceName={name} />
			})}
		</div>
	)
}

const styles = {
	root: {
		height: '0px',
	},
}

export default injectSheet(styles)(ResourceList)
