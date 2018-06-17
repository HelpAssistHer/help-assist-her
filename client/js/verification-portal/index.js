import React from 'react'
import injectSheet from 'react-jss'

import HeaderSuccess from './components/header-success'
import Tabs from './components/tabs'
import Spacer from '../components/spacer'
import LoginButton from '../authentication/facebook-login-button'

const VerificationPortal = ({ classes }) => (
	<div>
		<HeaderSuccess />
		<Tabs tabNames={['community health center', 'pregnancy resource center']} />
		<Spacer height="64px" />
		<Spacer height="25px" />
		<LoginButton />
	</div>
)

const styles = {}

export default injectSheet(styles)(VerificationPortal)
