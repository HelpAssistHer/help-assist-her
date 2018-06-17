import React from 'react'
import injectSheet from 'react-jss'
import { Link } from 'react-router-dom'
import { tabNames } from '../constants'

const Tabs = ({ classes }) => (
	<div className={classes.grid}>
		<div className={classes.gridItems}>
			<Link to="/verification/community-health-center" className={classes.link}>
				{tabNames.COMMUNITY_HEALTH_CENTER}
			</Link>
		</div>
		<div className={classes.gridItems}>
			<Link
				to="/verification/pregnancy-resource-center"
				className={classes.link}
			>
				{tabNames.PREGNANCY_RESOURCE_CENTER}
			</Link>
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
		'background-color': '#F0649A',
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
		// '&:hover': {
		// 	'background-color': 'rgba(240,100,154,0.15)',
		// },
	},
	link: {
		height: '100%',
		width: '100%',
	},
}

export default injectSheet(styles)(Tabs)
