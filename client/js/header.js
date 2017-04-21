import React from 'react'
import injectSheet from 'react-jss'

import Button from './button'

const Header = ({ classes }) => (
	<div className={classes.header}>
		<div className={classes.authenticationButtonDiv}>
			<Button
				onClick={() => {
					window.location.href = 'http://localhost:4000/auth/facebook'
				}}
				buttonText='Account'
			/>
		</div>
		<img className={classes.logo} src='../../public/img/logo-white.png' />
	</div>
)

const styles = {
	header: {
		'background-image': 'linear-gradient(-90deg, #FCC582 0%, #F0649A 100%)',
		height: '200px',
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
	authenticationButtonDiv: {
		width: '7%',
		float: 'right',
		padding: '10px',
	},
}

export default injectSheet(styles)(Header)
