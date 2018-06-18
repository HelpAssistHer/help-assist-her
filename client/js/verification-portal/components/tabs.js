import React from 'react'
import injectSheet from 'react-jss'
import { NavTab } from 'react-router-tabs'

import { tabNames } from '../constants'

const Tabs = ({ classes }) => (
	<div className={classes.grid}>
		<div className={classes.gridItems}>
			<NavTab
				to="/verification/community-health-center"
				className={classes.navTab}
				activeClassName={classes.navTabActive}
			>
				{tabNames.COMMUNITY_HEALTH_CENTER}
			</NavTab>
		</div>
		<div className={classes.gridItems}>
			<NavTab
				to="/verification/pregnancy-resource-center"
				className={classes.navTab}
				activeClassName={classes.navTabActive}
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
		height: '47px',
		'line-height': '47px',
		color: '#FFFFFF',
		'font-family': 'sans-serif',
		'font-size': '16px',
		'letter-spacing': '4px',
		'text-transform': 'uppercase',
		cursor: 'pointer',
		'text-align': 'center',
	},
	gridItems: {
		display: 'flex',
	},
	navTab: {
		'background-color': 'rgba(240,100,154,0.15)',
		'text-decoration': 'none',
		color: 'inherit',
		width: '100%',
		height: '100%',
		'&:hover': {
			'background-color': '#F0649A',
		},
	},
	navTabActive: {
		'background-color': '#F0649A',
	},
}

export default injectSheet(styles)(Tabs)
