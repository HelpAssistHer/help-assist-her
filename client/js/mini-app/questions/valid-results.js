import React from 'react'
import injectSheet from 'react-jss'
import _ from 'lodash'
import cx from 'classnames'

import { Phone, BigPhone, Tablet, Desktop } from '../../components/breakpoints'
import ResourceCard from './resource-card'

const ValidResults = ({ classes, pregnancyResourceCenters }) => {
	const phoneStyle = cx(classes.validResultsRoot, classes.paddingPhone)
	const desktopStyle = cx(classes.validResultsRoot, classes.paddingDesktop)

	return (
		<div>
			<Phone>
				<div className={phoneStyle}>
					{_.map(pregnancyResourceCenters, prc => {
						return <ResourceCard key={prc._id} resource={prc} />
					})}
				</div>
			</Phone>

			<BigPhone>
				<div className={phoneStyle}>
					{_.map(pregnancyResourceCenters, prc => {
						return <ResourceCard key={prc._id} resource={prc} />
					})}
				</div>
			</BigPhone>

			<Tablet>
				<div className={desktopStyle}>
					{_.map(pregnancyResourceCenters, prc => {
						return <ResourceCard key={prc._id} resource={prc} />
					})}
				</div>
			</Tablet>

			<Desktop>
				<div className={desktopStyle}>
					{_.map(pregnancyResourceCenters, prc => {
						return <ResourceCard key={prc._id} resource={prc} />
					})}
				</div>
			</Desktop>
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
