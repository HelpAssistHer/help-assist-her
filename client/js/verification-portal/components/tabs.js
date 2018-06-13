import React from 'react'
import injectSheet from 'react-jss'

const Tabs = ({ classes, tabNames }) => (
	<div className={classes.root}>{tabNames}</div>
)

const styles = {
	root: {
		height: '47px',
		// 'background-color': 'rgba(240,100,154,0.15)',
		'background-color': '#F0649A',
		color: '#FFFFFF',
		'font-family': 'sans-serif',
		'font-size': '16px',
		'letter-spacing': '4px',
		'line-height': '20px',
		'text-transform': 'uppercase',
	},
}

export default injectSheet(styles)(Tabs)
