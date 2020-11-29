import React from 'react'
import injectSheet from 'react-jss'
import _ from 'lodash'
import cx from 'classnames'

import { Phone, BigPhone, Tablet, Desktop } from '../../components/breakpoints'
import ResourceCard from './resource-card'
import { ScrollToTop } from '../../components/scroll-to-top'

const ValidResults = ({ classes, results }) => {
	const phoneStyle = cx(classes.validResultsRoot, classes.paddingPhone)
	const desktopStyle = cx(classes.validResultsRoot, classes.paddingDesktop)

	return (
		<div>
			<ScrollToTop />

			<div>
				<Phone>
					<div className={phoneStyle}>
						{_.map(results, (result) => {
							return <ResourceCard key={result._id} resource={result} />
						})}
					</div>
				</Phone>

				<BigPhone>
					<div className={phoneStyle}>
						{_.map(results, (result) => {
							return <ResourceCard key={result._id} resource={result} />
						})}
					</div>
				</BigPhone>

				<Tablet>
					<div className={desktopStyle}>
						{_.map(results, (result) => {
							return <ResourceCard key={result._id} resource={result} />
						})}
					</div>
				</Tablet>

				<Desktop>
					<div className={desktopStyle}>
						{_.map(results, (result) => {
							return <ResourceCard key={result._id} resource={result} />
						})}
					</div>
				</Desktop>
			</div>
		</div>
	)
}

const styles = {
	validResultsRoot: {
		display: 'flex',
		'flex-direction': 'column',
		'align-items': 'center',
	},
	paddingPhone: {
		padding: '20px',
	},
	paddingDesktop: {
		padding: '50px',
	},
}

export default injectSheet(styles)(ValidResults)
