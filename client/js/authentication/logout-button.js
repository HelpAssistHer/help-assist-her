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
		'padding-top': '25.82px',
	},
	logoutButton: {
		height: '28.89px',
		width: '72.61px',
		border: '1px solid #FFFFFF',
		'border-radius': '100px',
		'background-color': 'transparent',
		color: '#FFFFFF',
		'letter-spacing': '0.18px',
	},
}

export default injectSheet(styles)(LogoutButton)
