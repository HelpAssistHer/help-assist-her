import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import injectSheet from 'react-jss'

import { Phone, BigPhone, Tablet, Desktop } from '../../components/breakpoints'
import LogoAndNavigation from '../logo-and-navigation'
import Footer from '../components/footer'
import ValidResults from './valid-results'
import NoResults from './no-results'

const bannerMessageValidResults = (
	<Fragment>
		The search results closest to the location you entered are displayed first.
		<br />
		During beta, we are limited to resources in New York.
	</Fragment>
)

const bannerMessageNoResults = (
	<Fragment>
		No search results match the criteria you selected.
		<br />
		During beta, we are limited to resources in New York.
	</Fragment>
)

const mapStateToProps = state => {
	return {
		pregnancyResourceCenters: state.miniApp.pregnancyResourceCenters,
	}
}

const ResourceListView = ({ classes, pregnancyResourceCenters }) => {
	const noResults =
		_.get(pregnancyResourceCenters, 'statusCode') === 404 ||
		pregnancyResourceCenters === undefined

	return (
		<div className={classes.resourceListViewRoot}>
			<LogoAndNavigation />

			<Phone>
				<div className={classes.bannerMessagePhone}>
					<div className={classes.textContainer}>
						{noResults ? bannerMessageNoResults : bannerMessageValidResults}
					</div>
				</div>
			</Phone>

			<BigPhone>
				<div className={classes.bannerMessagePhone}>
					<div className={classes.textContainer}>
						{noResults ? bannerMessageNoResults : bannerMessageValidResults}
					</div>
				</div>
			</BigPhone>

			<Tablet>
				<div className={classes.bannerMessageDesktop}>
					<div className={classes.textContainer}>
						{noResults ? bannerMessageNoResults : bannerMessageValidResults}
					</div>
				</div>
			</Tablet>

			<Desktop>
				<div className={classes.bannerMessageDesktop}>
					<div className={classes.textContainer}>
						{noResults ? bannerMessageNoResults : bannerMessageValidResults}
					</div>
				</div>
			</Desktop>

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
		'min-height': '100vh', // Make sure the footer sticks to the bottom when there are no results
	},
	bannerMessagePhone: {
		display: 'flex',
		'justify-content': 'center',
		'background-color': '#3d65f9',
		'margin-top': '55px',
	},
	bannerMessageDesktop: {
		display: 'flex',
		'justify-content': 'center',
		'background-color': '#3d65f9',
		'margin-top': '100px',
	},
	textContainer: {
		'max-width': '600px',
		padding: '30px 25px',
		'font-size': '16px',
		color: '#FFFFFF',
		'text-align': 'center',
	},
	noResultsView: {
		padding: '28px 20px',
	},
	resultsFooter: {
		'margin-top': 'auto',
	},
}

const ResourceList = connect(mapStateToProps)(ResourceListView)

export default injectSheet(styles)(ResourceList)
