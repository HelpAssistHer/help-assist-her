import React from 'react'
import injectSheet from 'react-jss'

import { logoutUser } from './action-creators'

const LogoutButton = ({ classes }) => (
	<div>
		<div className={classes.buttonDiv}>
			<button className={classes.button} onClick={logoutUser}>
				Logout
			</button>
		</div>
	</div>
)

const styles = {
	buttonDiv: {
		'padding-left': '233px',
		'padding-top': '25.82px',
	},
	button: {
		height: '28.89px',
		width: '72.61px',
		border: '1px solid #FFFFFF',
		'border-radius': '100px',
		opacity: '100%',
		'background-color': 'Transparent',
		color: '#FFFFFF',
		'letter-spacing': '0.18px',
		'line-height': '13px',
	},
}

export default injectSheet(styles)(LogoutButton)
