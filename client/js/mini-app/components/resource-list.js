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

const ResourceListView = ({ classes, pregnancyResourceCenters }) => {
	return (
		<div className={classes.root}>
			A LIST OF AWESOME PREGNANCY CENTERS
			{_.map(pregnancyResourceCenters, prc => {
				const { prcName } = prc

				return <ResourceCard key={prcName} resourceName={prcName} />
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
