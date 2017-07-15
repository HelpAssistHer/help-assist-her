import React from 'react'
import { connect } from 'react-redux'

import FacebookLoginButton from './view'
import { getInitialAppData } from '../../hah-app/action-creators'

class FacebookLoginButtonContainer extends React.Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		this.props.dispatch(getInitialAppData())
	}

	render() {
		return <FacebookLoginButton fbAppId={this.props.fbAppId} />
	}
}

function mapStateToProps(state) {
	return {
		fbAppId: state.initialData.facebookAppId,
	}
}

export default connect(mapStateToProps)(FacebookLoginButtonContainer)
