import React from 'react'
import FacebookLogin from 'react-facebook-login'

class FacebookLoginButton extends React.Component {
	facebookResponse(response) {
		authenticateUser(response.accessToken)
	}

	render() {
		return (
			<FacebookLogin
				appId='1601964419836286'
				autoLoad={false}
				fields='name,email,picture'
				callback={this.facebookResponse}
				textButton='FB Login'
			/>
		)
	}
}

export default FacebookLoginButton