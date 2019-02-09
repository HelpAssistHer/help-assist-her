import React from 'react'
import FacebookLogin from 'react-facebook-login'
import injectSheet from 'react-jss'

import { isAuthenticated } from '../action-creators'

import {
	createLoginAction,
	createLogoutAction,
	login,
} from '../../hah-app/action-creators'

class FacebookLoginButton extends React.Component {
	constructor(props) {
		super(props)

		// make a call to the server to see if authenticated, and change the isLoggedIn state accordingly

		isAuthenticated().then(res => {
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
		color: '#F0649A !important',
		'font-family': 'Century Gothic, sans-serif !important',
		'font-weight': 'bold',
		'font-size': '20px !important',
		'border-radius': '100px !important',
		border: '5px solid #FFFFFF',
		height: '76px',
		width: '508px',
		'background-color': '#FFFFFF',
		'min-width': '145px !important',
		'letter-spacing': '0.33px !important',
		'line-height': '24px',
		cursor: 'pointer',
	},
}

export default injectSheet(styles)(FacebookLoginButton)
