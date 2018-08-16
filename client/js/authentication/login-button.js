import React from 'react'
import injectSheet from 'react-jss'
import Spacer from '../components/spacer'

const LoginButton = ({ classes }) => (
	<div>
		<Spacer height="10px" />
		<button className={classes.button}>Sign in with your Facebook</button>
	</div>
)

const styles = {
	button: {
		color: 'rgb(255, 255, 255)',
		cursor: 'pointer',
		height: '65px',
		width: '30%',
		margin: '25% 35%',
		'border-radius': '32px',
		background:
			'rgb(215, 97, 127) none repeat scroll 0% 0% / auto padding-box border-box',
		'font-family': 'san-serif',
		'font-size': '25px !important',
	},
}

export default injectSheet(styles)(LoginButton)
