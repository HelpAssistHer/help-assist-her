import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import FacebookLoginButton from './view'

class FacebookLoginButtonContainer extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		const { dispatch, facebookAppId, isLoggedIn } = this.props

		if (isLoggedIn) {
			return <Redirect to="/verification/community-health-center" />
		}

		return (
			<FacebookLoginButton
				dispatch={dispatch}
				facebookAppId={facebookAppId}
				isLoggedIn={isLoggedIn}
			/>
		)
	}
}

function mapStateToProps(state) {
	const { initialData } = state
	return {
		facebookAppId: initialData.facebookAppId,
		isLoggedIn: initialData.isLoggedIn,
	}
}

export default connect(mapStateToProps)(FacebookLoginButtonContainer)
