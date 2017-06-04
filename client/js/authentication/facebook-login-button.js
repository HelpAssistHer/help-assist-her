import React from 'react'
import FacebookLogin from 'react-facebook-login'

import { authenticateUser } from './action-creators'

class FacebookLoginButton extends React.Component {
	facebookResponse(response) {
		authenticateUser(response.accessToken)
	}

	render() {
		return (
			<FacebookLogin
				appId={VERIFICATION_PORTAL_FACEBOOK_APP_ID}
				autoLoad={false}
				fields='name,email,picture'
				callback={this.facebookResponse}
				textButton='FB Login'
			/>
		)
	}
}

export default FacebookLoginButton
