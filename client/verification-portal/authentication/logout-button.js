import React from 'react'
import injectSheet from 'react-jss'

import { logoutUser } from './action-creators'

const LogoutButton = ({ classes }) => (
	<div>
		<div className={classes.button}>
			<button className={classes.logoutButton} onClick={logoutUser}>
				Logout
			</button>
		</div>
	</div>
)

const styles = {
	button: {
		'padding-left': '233px',
		'padding-top': '26px',
	},
	logoutButton: {
		height: '29px',
		width: '73px',
		border: '1px solid #FFFFFF',
		'border-radius': '100px',
		'background-color': 'transparent',
		color: '#FFFFFF',
		'font-family': 'hah-bold',
		'font-size': '11px',
		'letter-spacing': '0.3px',
		'line-height': '13px',
		'text-align': 'center',
		cursor: 'pointer',
		outline: 'none',
		'&:hover': {
			'background-color': '#FFFFFF',
			color: '#000000',
		},
		'&:active': {
			'background-color': '#FFFFFF',
			color: '#000000',
		},
	},
}

export default injectSheet(styles)(LogoutButton)
