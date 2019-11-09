import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import injectSheet from 'react-jss'

import LogoAndNavigation from '../logo-and-navigation'
import Footer from '../components/footer'
import ValidResults from './valid-results'
import NoResults from './no-results'

const bannerMessageValidResults =
	'Your search results have been arranged by closest distance to your location data.'
const bannerMessageNoResults =
	'We currently only have resources in the state of New York, but keep checking back for new states!'

const mapStateToProps = state => {
	return {
		pregnancyResourceCenters: state.miniApp.pregnancyResourceCenters,
	}
}

const ResourceListView = ({ classes, pregnancyResourceCenters }) => {
	const noResults = _.get(pregnancyResourceCenters, 'statusCode') === 404

	return (
		<div className={classes.resourceListViewRoot}>
			<LogoAndNavigation />
			<div className={classes.bannerMessage}>
				{noResults ? bannerMessageNoResults : bannerMessageValidResults}
			</div>

			{noResults ? (
				<div className={classes.noResultsView}>
					<NoResults />
				</div>
			) : (
				<ValidResults pregnancyResourceCenters={pregnancyResourceCenters} />
			)}

			<div className={classes.resultsFooter}>
				<Footer />
			</div>
		</div>
	)
}

const styles = {
	resourceListViewRoot: {
		display: 'flex',
		'flex-direction': 'column',
		'min-height': '100vh',
		'background-color': 'rgba(93,93,93,0.08)',
	},
	bannerMessage: {
		padding: '30px 0px 30px 0px',
		'background-color': '#3d65f9',
		'font-size': '16px',
		color: '#99cccc',
		'text-align': 'center',
		'margin-top': '100px',
	},
	noResultsView: {
		padding: '56px',
	},
	resultsFooter: {
		'margin-top': 'auto',
	},
}

const ResourceList = connect(mapStateToProps)(ResourceListView)

export default injectSheet(styles)(ResourceList)
