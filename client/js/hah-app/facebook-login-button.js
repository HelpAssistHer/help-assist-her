import React from 'react'
import FacebookLogin from 'react-facebook-login'

class FacebookLoginButton extends React.Component {
	facebookResponse(response) {
		console.log('Facebook response', response)
	}

	render() {
		return (
			<FacebookLogin
				appId='1312011635554544'
				autoLoad={false}
				fields='name,email,picture'
				callback={this.facebookResponse}
				textButton='Login'
			/>
		)
	}
}

export default FacebookLoginButton
