import React from 'react'
import { connect } from 'react-redux'
import injectSheet from 'react-jss'

import LoginButton from '../authentication/login-button'

class Landing extends React.Component {
	render() {
		const { classes } = this.props
		return (
			<div className={classes.landing}>
				<img
					src="./img/logo-white.png"
					alt="Help Assist Her logo"
					className={classes.logoWhite}
				/>

				<div className={classes.titleText}>Information Database</div>
				<div className={classes.descriptionText}>
					Sign in to start helping our sisters out!
				</div>
				<LoginButton />
			</div>
		)
	}
}
const styles = {
	landing: {
		margin: '0',
		height: '100%',
		width: '100%',
		'background-image': 'url("./img/background.png")',
		'background-position': 'center',
		'background-repeat': 'no-repeat',
		'background-size': 'cover',
		color: '#FFFFFF',
		'text-align': 'center',
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
const LandingWithStyle = injectSheet(styles)(Landing)

export default connect()(LandingWithStyle)
