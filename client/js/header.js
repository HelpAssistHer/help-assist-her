'use strict'

import React from 'react'
import injectSheet from 'react-jss'

const Header = ({ classes }) => (
	<div className={classes.header}>
		<img className={classes.logo} src='../../public/img/logo-white.png' />
	</div>
)

const styles = {
	header: {
		'background-image': 'linear-gradient(-90deg, #FCC582 0%, #F0649A 100%);',
		height: '200px',
		position: 'relative',
	},
	logo: {
		'max-height': '100%',
		'max-width': '100%',
		width: 'auto',
		height: 'auto',
		position: 'absolute',
		top: '0',
		bottom: '0',
		left: '0',
		right: '0',
		margin: 'auto',
	},
}

export default injectSheet(styles)(Header)
