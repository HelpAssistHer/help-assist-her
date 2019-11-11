import React from 'react'
import injectSheet from 'react-jss'
import Spacer from '../components/spacer'
import FacebookLoginButtonContainer from './facebook-login-button/index'

const LoginButton = ({ classes }) => (
	<div className={classes.button}>
		<Spacer height="10px" />
		<FacebookLoginButtonContainer />
	</div>
)

const styles = {
	button: {
		color: 'rgb(255, 255, 255)',
		'border-radius': '32px',
		'font-family': 'sans-serif',
	},
}

export default injectSheet(styles)(LoginButton)
