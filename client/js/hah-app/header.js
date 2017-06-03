import React from 'react'
import injectSheet from 'react-jss'

import LoginButton from '../authentication/facebook-login-button'
import LogoutButton from '../authentication/logout-button'

const Header = ({ classes }) => (
	<div className={classes.header}>
		<div className={classes.authenticationButtonDiv}>
			<LoginButton />
			<LogoutButton />
		</div>
		<img className={classes.logo} src='../../public/img/logo-white.png' />
	</div>
)

const styles = {
	header: {
		'background-image': 'linear-gradient(-90deg, #FCC582 0%, #F0649A 100%)',
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
	authenticationButtonDiv: {
		width: '11%',
		float: 'right',
		padding: '10px',
	},
}

export default injectSheet(styles)(Header)
