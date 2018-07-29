import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import injectSheet from 'react-jss'

import ResourceCard from './resource-card'

const mapStateToProps = state => {
	return {
		pregnancyResourceCenters: state.miniApp.pregnancyResourceCenters,
	}
}

const ResourceListView = ({ classes }) => {
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

const ResourceList = connect(mapStateToProps)(ResourceListView)

export default injectSheet(styles)(ResourceList)
