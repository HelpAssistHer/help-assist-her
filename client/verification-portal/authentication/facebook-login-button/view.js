import React from 'react'
import FacebookLogin from 'react-facebook-login'
import injectSheet from 'react-jss'

import { isAuthenticated } from '../action-creators'

import {
	createLoginAction,
	createLogoutAction,
	login,
} from '../../../action-creators'

class FacebookLoginButton extends React.Component {
	constructor(props) {
		super(props)

		// make a call to the server to see if authenticated, and change the isLoggedIn state accordingly

		isAuthenticated().then((res) => {
			const userDisplayName = res.userDisplayName

			if (res.isLoggedIn) {
				this.props.dispatch(createLoginAction(userDisplayName))
			} else {
				this.props.dispatch(createLogoutAction())
			}
		})
	}

	facebookResponse(response) {
		this.props.dispatch(login(response.accessToken))
	}

	render() {
		const { classes, facebookAppId } = this.props

		if (!facebookAppId) {
			return null
		}

		return (
			<div>
				{
					<FacebookLogin
						appId={facebookAppId}
						autoLoad={false}
						fields="name,email,picture"
						callback={this.facebookResponse.bind(this)}
						cssClass={classes.facebookLoginButton}
						textButton="Sign in with your Facebook"
					/>
				}
			</div>
		)
	}
}

const styles = {
	facebookLoginButton: {
		height: '76px',
		width: '508px',
		'background-color': 'rgba(255,255,255,0.4)',
		'border-radius': '100px',
		'font-family': 'hah-regular',
		color: '#FFFFFF',
		'font-size': '20px',
		'letter-spacing': '0.33px',
		'line-height': '24px',
		cursor: 'pointer',
		'text-align': 'center',
		border: 'none',
		outline: 'none',
		'min-width': '145px',
		'&:hover': {
			'background-color': '#FFFFFF',
			color: '#F0649A',
		},
		'&:active': {
			'background-color': '#FFFFFF',
			color: '#F0649A',
		},
	},
}

export default injectSheet(styles)(FacebookLoginButton)
