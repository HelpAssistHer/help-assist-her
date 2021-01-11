import React from 'react'
import { connect } from 'react-redux'
import injectSheet from 'react-jss'
import Imgix from 'react-imgix'

import FacebookLoginButton from '../authentication/facebook-login-button'

class LoginPage extends React.Component {
	render() {
		const { classes } = this.props
		return (
			<div className={classes.loginPageBackground}>
				<div className={classes.loginPageWrapper}>
					<Imgix
						src="https://helpassisther.imgix.net/logo-white.png"
						alt="Help Assist Her logo"
						className={classes.logoWhite}
						width={400}
					/>

					<div className={classes.titleText}>Information Database</div>
					<div className={classes.descriptionText}>
						Sign in to start helping our sisters out!
					</div>
					<FacebookLoginButton />
				</div>
			</div>
		)
	}
}
const styles = {
	loginPageBackground: {
		margin: '0',
		height: '100%',
		width: '100%',
		'background-image': 'url("https://helpassisther.imgix.net/background.png")',
		'background-position': 'center',
		'background-repeat': 'no-repeat',
		'background-size': 'cover',
	},
	loginPageWrapper: {
		height: '75%',
		color: '#FFFFFF',
		'text-align': 'center',
		display: 'flex',
		'flex-direction': 'column',
		'align-items': 'center',
		'justify-content': 'space-around',
	},
	logoWhite: {
		width: '340px',
	},
	titleText: {
		'font-size': '72px',
		'line-height': '88px',
	},
	descriptionText: {
		'font-size': '24px',
		'line-height': '29px',
		'margin-top': '45px',
	},
}

export default connect()(injectSheet(styles)(LoginPage))
