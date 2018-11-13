import React from 'react'
import _ from 'lodash'
import injectSheet from 'react-jss'
import classNames from 'classnames'

const resources = ['Community Health Center', 'Pregnancy Resource Center']

const ResourceCarousel = ({ classes }) => {
	return (
		<div className={classes.resourceCarouselRoot}>
			{_.map(resources, (resource, index) => {
				const styleWithBorder = classNames(classes.border, classes.resourceBox)
				const resourceBoxStyle =
					index === 1 ? styleWithBorder : classes.resourceBox

				return (
					<div className={resourceBoxStyle} key={resource}>
						<div className={classes.resourceText}>{resource}</div>
					</div>
				)
			})}
		</div>
	)
}

const styles = {
	resourceCarouselRoot: {
		display: 'flex',
		'justify-content': 'center',
	},
	resourceBox: {
		display: 'flex',
		'flex-direction': 'column',
		'justify-content': 'flex-end',
		height: '241px',
		width: '261px',
	},
	resourceText: {
		'font-size': '24px',
		'text-align': 'center',
	},
	border: {
		'border-left': '3px solid black',
	},
}

export default injectSheet(styles)(ResourceCarousel)
