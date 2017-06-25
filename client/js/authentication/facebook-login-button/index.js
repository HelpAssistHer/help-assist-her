import React from 'react'
import { connect } from 'react-redux'
import styles from './facebook-login-button.css';


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
		const { classes, changeFieldValue } = this.props
		return <FacebookLoginButton fbAppId={this.props.fbAppId} className={styles.normal}/>
	}
}

function mapStateToProps(state) {
	return {
		fbAppId: state.initialData.facebookAppId,
	}
}


export default connect(mapStateToProps)(FacebookLoginButtonContainer)
