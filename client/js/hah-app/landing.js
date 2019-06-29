import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import injectSheet from 'react-jss'

import LoginButton from '../authentication/login-button'

class Landing extends React.Component {
	render() {
		const { classes } = this.props
		return (
			<div className={classes.landing}>
				<Link to="/verification/pregnancy-resource-center">
					Verification Portal
				</Link>
				<ul className={classes.homeScreen}>
					<li>
						<img
							src="./img/logo-white.png"
							alt="Help Assist Her logo"
							className={classes.logoWhite}
						/>
					</li>
					<li className={classes.textOne}>Information Database</li>
					<li className={classes.textTwo}>
						Sign in to start helping our sister out!
					</li>
				</ul>
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
	},
	homeScreen: {
		position: 'absolute',
		top: '20%',
		margin: '0%',
		padding: '0%',
		width: '100%',
		'list-style': 'none',
		'text-align': 'center',
		color: '#FFFFFF',
		'font-family': 'Century Gothic',
		'font-weight': 'bold',
	},
	logoWhite: {
		height: '67.07px',
		width: '338.23px',
	},
	textOne: {
		'font-size': '72px',
		'letter-spacing': '3px',
		'line-height': '88px',
	},
	textTwo: {
		'font-size': '24px',
		'letter-spacing': '0.33px',
		'line-height': '29px',
		'margin-top': '45px',
	},
}
const LandingWithStyle = injectSheet(styles)(Landing)

export default connect()(LandingWithStyle)
