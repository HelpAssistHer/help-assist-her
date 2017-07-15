import React from 'react'
import FacebookLogin from 'react-facebook-login'
import injectSheet from 'react-jss'
import { connect } from 'react-redux'

import {
	authenticateUser,
	logoutUser,
	isAuthenticated
} from '../action-creators'

import { 
	getInitialAppData,
	createLoginAction,
	createLogoutAction,
	login,
	logout
} from '../../hah-app/action-creators'

class FacebookLoginButton extends React.Component {


	constructor(props) {
		super(props)
		
		// make a call to the server to see if authenticated, and change the isLoggedIn state accordingly
		
		isAuthenticated().then( (res) => {
			if (res) {
				this.props.dispatch(createLoginAction())
			} else {
				this.props.dispatch(createLogoutAction())
			}
		})
		console.log(this.state)
	}

	facebookResponse(response) {
		this.props.dispatch(login(response.accessToken))
	}

	logout() {
		this.props.dispatch(logout())

	}

	render() {
		const { classes, changeFieldValue } = this.props
		
		console.log('fb button this.state.isLoggedIn: '+this.props.isLoggedIn)

		if (this.props.isLoggedIn) {
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

function mapStateToProps(state) {
	return {
		isLoggedIn: state.initialData.isLoggedIn,
	}
}

FacebookLoginButton = injectSheet(styles)(FacebookLoginButton)
export default connect(mapStateToProps)(FacebookLoginButton)

