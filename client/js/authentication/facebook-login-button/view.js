import React from 'react'
import FacebookLogin from 'react-facebook-login'

import { authenticateUser } from '../action-creators'

class FacebookLoginButton extends React.Component {
	constructor(props) {
		super(props)
	}

	facebookResponse(response) {
		authenticateUser(response.accessToken)
	}

	render() {
		return (
			<div>
				{
					this.props.fbAppId ?
					<FacebookLogin
						appId={this.props.fbAppId}
						autoLoad={false}
						fields='name,email,picture'
						callback={this.facebookResponse}
						textButton='FB Login'
					/> : null
				}
			</div>
		)
	}
}

export default FacebookLoginButton
