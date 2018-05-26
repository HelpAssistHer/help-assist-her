import React from 'react'
import injectSheet from 'react-jss'

import Spacer from '../components/spacer'
import { logoutUser } from './action-creators'

const LogoutButton = ({ classes }) => (
	<div>
		<Spacer height="10px" />
		<button className={classes.button} onClick={logoutUser}>
			Logout
		</button>
	</div>
)

const styles = {
	button: {
		color: 'rgb(255, 255, 255)',
		cursor: 'pointer',
		height: '63.875px',
		'min-height': '0px',
		'text-decoration': 'none solid rgb(255, 255, 255)',
		'text-transform': 'uppercase',
		width: '110px',
		'column-rule-color': 'rgb(255, 255, 255)',
		'perspective-origin': '43.0312px 31.9375px',
		'transform-origin': '43.0312px 31.9375px',
		'caret-color': 'rgb(255, 255, 255)',
		background: 'rgb(76, 105, 186) none repeat scroll 0% 0% / auto padding-box border-box',
		border: '1px solid rgb(76, 105, 186)',
		font: 'normal normal bold normal 13.9504px / normal Helvetica, sans-serif',
		outline: 'rgb(255, 255, 255) none 0px',
		padding: '14.938px 19.938px',
		transition: 'background-color 0.3s ease 0s, border-color 0.3s ease 0s',
	},
}

export default injectSheet(styles)(LogoutButton)
