import React from 'react'
import FacebookLogin from 'react-facebook-login'
import injectSheet from 'react-jss'

import {
	authenticateUser,
	logoutUser,
	isAuthenticated
} from '../action-creators'

class FacebookLoginButton extends React.Component {


	constructor(props) {
		super(props)
		this.state = {
			loggedIn : false
		}
		isAuthenticated().then( (res) => {
			this.state.loggedIn = res
		})
		console.log(this.state)
	}

	facebookResponse(response) {
		const authenticated = authenticateUser(response.accessToken)
		console.log('logged in')
		this.setState({loggedIn: authenticated})
	}

	logout() {
		logoutUser().then(loggedOut => {
			if (loggedOut) {
				this.setState({loggedIn: false})
				console.log('logged out')
			}
		})

	}
	updateState() {
		isAuthenticated().then( (res) => {
			this.state.loggedIn = res
		})
		console.log('this.state.loggedIn: '+this.state.loggedIn)
	}

	render() {
		const { classes, changeFieldValue } = this.props

		this.updateState()
		console.log('this.state.loggedIn: '+this.state.loggedIn)

		if (this.state.loggedIn) {
			return (<button
				type='button'
				className={classes.facebookLoginButton}
				onClick={this.logout.bind(this)}
			>Logout</button>)
		} else {
			return (

				<FacebookLogin
								appId='1601964419836286'
								autoLoad={false}
								fields='name,email,picture'
								callback={this.facebookResponse.bind(this)}
								cssClass={classes.facebookLoginButton}
								textButton=' Login'
								icon='fa-facebook'
							/>
			)
		}


	}
}

const styles = {

	facebookLoginButton: {
		'color': '#FFFFFF !important',
		'border': '2px solid #FFFFFF !important',
		'font-family': 'Century Gothic, san-serif !important',
		'font-size': '18px !important',
		'border-radius': '6px !important',
		'background-color': 'Transparent !important',
		'background-repeat': 'no-repeat !important',
		'min-width': '145px !important',
		'letter-spacing': '0 !important',
		'text-shadow': '0 1px 0 rgba(255,254,255,0.50) !important',


	}
}

FacebookLoginButton = injectSheet(styles)(FacebookLoginButton)

export default FacebookLoginButton
