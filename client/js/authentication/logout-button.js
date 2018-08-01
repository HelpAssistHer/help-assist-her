import React from 'react'
import injectSheet from 'react-jss'

import Spacer from '../components/spacer'
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
		'font-family': 'Century Gothic',
		'font-size': '11px',
		'font-weight': 'bold',
		'letter-spacing': '0.18px',
		'text-align': 'center',
		'line-height': '13px',
	},
}

export default injectSheet(styles)(LogoutButton)
