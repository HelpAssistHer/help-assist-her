import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import injectSheet from 'react-jss'

import ResourceCard from './resource-card'
import LogoAndNavigation from '../logo-and-navigation'
import Footer from '../components/footer'

const mapStateToProps = state => {
	return {
		pregnancyResourceCenters: state.miniApp.pregnancyResourceCenters,
	}
}

const ResourceListView = ({ classes, pregnancyResourceCenters }) => {
	return (
		<div>
			<LogoAndNavigation />
			<div className={classes.list}>
				<div className={classes.header}>
					Your search results have been arranged by closest distance to your
					location data.
				</div>
				<div className={classes.root}>
					{_.map(pregnancyResourceCenters, prc => {
						return <ResourceCard key={prc._id} resource={prc} />
					})}
				</div>
			</div>
			<Footer />
		</div>
	)
}

const styles = {
	header: {
		padding: '30px 0px 30px 0px',
		'background-color': '#3d65f9',
		'font-size': '14px',
		color: '#99cccc',
		'text-align': 'center',
		'margin-top': '100px',
	},
	list: {
		'min-height': '70vh',
	},
}

const ResourceList = connect(mapStateToProps)(ResourceListView)

export default injectSheet(styles)(ResourceList)
