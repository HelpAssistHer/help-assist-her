import React from 'react'
import {
	BrowserRouter as Router,
	Route,
	Link,
	Redirect,
	withRouter,
	Switch
} from 'react-router-dom'
import Landing from './Landing'
import Login from './login'
import VerificationPortalContainer from '../verification-portal/index'
import {
	authenticateUser,
	logoutUser,
	isAuthenticated
} from '../authentication/action-creators'

import { connect } from 'react-redux'
import {
	getInitialAppData,
	createLoginAction,
	createLogoutAction,
	login,
	logout
} from './action-creators'


class Main extends React.Component {
	constructor(props) {
		super(props)
		isAuthenticated().then( (res) => {
			if (res) {
				this.props.dispatch(createLoginAction())
			} else {
				this.props.dispatch(createLogoutAction())
			}
		})
	}
	
	render() {
		console.log('main this.props.isLoggedIn: '+this.props.isLoggedIn)
		return (
			<main>
				<div className="container-fluid">
					<Switch >
						<Route path="/login" component={Login}/>
						<Route exact path='/' component={Landing} />
						<PrivateRoute exact path='/verification' authed={this.props.isLoggedIn} component={VerificationPortalContainer}   />
					</Switch>
				</div>
			</main>
		)
	}
}




function PrivateRoute ({component: Component, authed, ...rest}) {
	return (
		<Route
			{...rest}
			render={(props) => {
				return authed === true
				? <Component {...props} />
				: <Redirect to={{pathname: '/login', state: {from: props.location}}} />}}
		/>
	)
}

function mapStateToProps(state) {
	return {
		isLoggedIn: state.initialData.isLoggedIn,
	}
}


export default connect(mapStateToProps)(Main)
