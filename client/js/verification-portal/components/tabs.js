import React from 'react'
import injectSheet from 'react-jss'
import { Link } from 'react-router-dom'
import { NavTab } from 'react-router-tabs'

import { tabNames } from '../constants'

const Tabs = ({ classes }) => (
	<div className={classes.grid}>
		<div className={classes.gridItems}>
			<NavTab
				to="/verification/community-health-center"
				className={classes.navTab}
			>
				{tabNames.COMMUNITY_HEALTH_CENTER}
			</NavTab>
		</div>
		<div className={classes.gridItems}>
			<NavTab
				to="/verification/pregnancy-resource-center"
				className={classes.navTab}
			>
				{tabNames.PREGNANCY_RESOURCE_CENTER}
			</NavTab>
		</div>
	</div>
)

const styles = {
	grid: {
		display: 'grid',
		'grid-template-columns': 'repeat(2, 1fr)',
		'grid-template-rows': '1',
		height: '47px',
		color: '#FFFFFF',
		'font-family': 'sans-serif',
		'font-size': '16px',
		'letter-spacing': '4px',
		'line-height': '20px',
		'text-transform': 'uppercase',
		cursor: 'pointer',
	},
	gridItems: {
		'justify-self': 'center',
		'align-self': 'center',
		'text-decoration': 'none !important',
	},
	navTab: {
		'background-color': '#F0649A',
		display: 'inline-block',
		padding: '10px 25px',
		'text-decoration': 'none',
		'&:hover': {
			'background-color': 'rgba(240,100,154,0.15)',
		},
	},
	navTabActive: {
		'background-color': 'rgba(240,100,154,0.15)',
	},
}

export default injectSheet(styles)(Tabs)
