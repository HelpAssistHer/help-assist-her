import React from 'react'
import _ from 'lodash'
import injectSheet from 'react-jss'

const resources = ['Community Health Center', 'Pregnancy Resource Center']

const ResourceCarousel = ({ classes }) => {
	return (
		<div className={classes.resourceCarouselRoot}>
			{_.map(resources, resource => {
				return (
					<div className={classes.resourceBox} key={resource}>
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
		'border-left': '3px solid black',
	},
	resourceText: {
		'font-family': 'sans-serif',
		'font-size': '24px',
		'text-align': 'center',
	},
}

export default injectSheet(styles)(ResourceCarousel)
