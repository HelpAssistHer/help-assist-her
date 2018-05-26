import React from 'react'
import injectSheet from 'react-jss'
import LoginButton from '../authentication/facebook-login-button'

const Header = ({ classes }) => (
	<div className={classes.header}>
		<LoginButton />
	</div>
)

const styles = {}

export default injectSheet(styles)(Header)
