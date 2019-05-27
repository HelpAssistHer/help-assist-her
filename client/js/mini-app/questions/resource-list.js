import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import injectSheet from 'react-jss'

import LogoAndNavigation from '../logo-and-navigation'
import Footer from '../components/footer'
import ValidResults from './valid-results'
import NoResults from './no-results'

const searchResultsMessage =
	'Your search results have been arranged by closest distance to your location data.'

const mapStateToProps = state => {
	return {
		pregnancyResourceCenters: state.miniApp.pregnancyResourceCenters,
	}
}

const ResourceListView = ({ classes, pregnancyResourceCenters }) => {
	const noResults = _.get(pregnancyResourceCenters, 'statusCode') === 404

	return (
		<div>
			<LogoAndNavigation />
			<div className={classes.resultsHeader}>{searchResultsMessage}</div>
			{noResults ? (
				<NoResults />
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
	resultsHeader: {
		padding: '30px 0px 30px 0px',
		'background-color': '#3d65f9',
		'font-size': '14px',
		color: '#99cccc',
		'text-align': 'center',
		'margin-top': '100px',
	},
	resultsFooter: {
		width: '100%',
		'align-self': 'flex-end',
	},
}

const ResourceList = connect(mapStateToProps)(ResourceListView)

export default injectSheet(styles)(ResourceList)
