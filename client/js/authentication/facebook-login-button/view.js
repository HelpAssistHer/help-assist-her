import React from 'react'
import FacebookLogin from 'react-facebook-login'

import { authenticateUser } from '../action-creators'

class FacebookLoginButton extends React.Component {
	// getInitialState() {
	// 	return { loggedIn : false }
	// }

	constructor(props) {
		super(props)
	}

	facebookResponse(response) {
		authenticateUser(response.accessToken)
	}

	// onClick() {
	// 	this.setState({ loggedIn: true})
	// }

	render() {

		// if (this.state.loggedIn) {
		// 	return (<div>Logged In</div>)
		// } else {
			return (
				<div>
					{
						this.props.fbAppId ?
							<FacebookLogin
								appId={this.props.fbAppId}
								autoLoad={false}
								fields='name,email,picture'
								onClick={this.onClick}
								callback={this.facebookResponse}
								textButton='FB Login'
							/> : null
					}
				</div>
			)
		// }
	}
}

export default FacebookLoginButton
