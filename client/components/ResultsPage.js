import React, { useEffect, useMemo, useState } from 'react'
import injectSheet from 'react-jss'

import { useLocation } from 'react-router-dom'

import { Phone, BigPhone, Tablet, Desktop } from './Breakpoints'
import LogoAndNavigation from './LogoAndNavigation'
import Footer from './Footer'
import ValidResults from './ValidResultsPage'
import NoResults from './NoResultsPage'

import { findPregnancyResourceCentersNearMe, findChcsNearMe } from './requests'

const bannerMessageValidResults = (
	<>
		The search results closest to the location you entered are displayed first.
		<br />
		During beta, we are limited to resources in New York.
	</>
)

const bannerMessageNoResults = (
	<>
		No search results match the criteria you selected.
		<br />
		During beta, we are limited to resources in New York.
	</>
)
function useSearchData() {
	const location = useLocation()
	const [resources, setResources] = useState(null)
	const params = useMemo(() => new URLSearchParams(location.search.slice(1)), [
		location.search,
	])

	useEffect(() => {
		;(async () => {
			const type = params.get('type')
			const address = params.get('address')

			let response
			if (type === 'prc') {
				response = await findPregnancyResourceCentersNearMe(address)
			}
			if (type === 'chc') {
				response = await findChcsNearMe(address)
			}

			if (response.ok) {
				const resources = await response.json()

				setResources(resources)
			}
		})()
	}, [params])

	return resources
}

const ResourceList = ({ classes }) => {
	let results = useSearchData()

	const noResults = results && !results.length
	return (
		<div className={classes.resourceListViewRoot}>
			<LogoAndNavigation />
			{results && (
				<>
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
						<ValidResults results={results} />
					)}
				</>
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

export default injectSheet(styles)(ResourceList)
