import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import injectSheet from 'react-jss'

import ResourceCard from './resource-card'
import LogoAndNavigation from '../logo-and-navigation'
import NoResults from './no-results'
import Footer from './footer'

const searchResultsMessage =
	'Your search results have been arranged by closest distance to your location data.'
const noResultsMessage = 'No results match your search.'

const mapStateToProps = state => {
	return {
		pregnancyResourceCenters: state.miniApp.pregnancyResourceCenters,
	}
}

const ResourceListView = ({ classes, pregnancyResourceCenters }) => {
	// const containerView = (
	// 	<div>
	// 		<LogoAndNavigation />
	// 		<div className={classes.header}>
	// 			Your search results have been arranged by closest distance to your
	// 			location data.
	// 		</div>
	// 	</div>
	// )

	const noResultsView = (
		<div className={classes.noResultsRoot}>
			<LogoAndNavigation />
			<div className={classes.header}>{searchResultsMessage}</div>
			<div className={classes.noResults}>
				{noResultsMessage}
				<button>Return to Search</button>
			</div>
			<div className={classes.footer}>
				<Footer />
			</div>
		</div>
	)

	return noResultsView

	// const noResults = _.get(pregnancyResourceCenters, 'statusCode') === 404
	// if (noResults) return <NoResults />

	// return (
	// 	<div>
	// 		<LogoAndNavigation />
	// 		<div className={classes.header}>
	// 			Your search results have been arranged by closest distance to your
	// 			location data.
	// 		</div>
	// 		<div>
	// 			{_.map(pregnancyResourceCenters, prc => {
	// 				return <ResourceCard key={prc._id} resource={prc} />
	// 			})}
	// 		</div>
	// 	</div>
	// )
}

const styles = {
	noResultsRoot: {
		height: '100%',
		display: 'flex',
		'flex-direction': 'column',
		'justify-content': 'space-between',
	},
	noResults: {
		'background-color': 'rgba(93,93,93,0.08)',
		// border: 3px solid #3D65F9;
	},
	header: {
		padding: '30px 0px 30px 0px',
		'background-color': '#3d65f9',
		'font-size': '14px',
		color: '#99cccc',
		'text-align': 'center',
	},
	// footer: {
	// 	'align-self': 'flex-end',
	// },
}

const ResourceList = connect(mapStateToProps)(ResourceListView)

export default injectSheet(styles)(ResourceList)
