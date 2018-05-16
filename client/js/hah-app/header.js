import React from 'react'
import injectSheet from 'react-jss'
import LoginButton from '../authentication/facebook-login-button'

const Header = ({ classes }) => (
	<div className={classes.header}>
		<div className={classes.authenticationButtonDiv}>
			<LoginButton />
		</div>
	</div>
)

const styles = {
	header: {
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
	authenticationButtonDiv: {},
}

export default injectSheet(styles)(Header)
