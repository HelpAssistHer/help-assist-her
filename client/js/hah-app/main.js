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



class Main extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			loggedIn : false
		}
		isAuthenticated().then( (res) => {
			this.state.loggedIn = res
		})
		console.log(this.state)
	}

	updateState() {
		isAuthenticated().then( (res) => {
			this.state.loggedIn = res
		})
		console.log('this.state.loggedIn: '+this.state.loggedIn)
	}
	render() {
		this.updateState()
		console.log('this.state.loggedIn: '+this.state.loggedIn)
		return (
			<main>
				<div className="container-fluid">
					<Switch >
						<Route path="/login" component={Login}/>
						<Route exact path='/' component={Landing} />
						<PrivateRoute exact path='/verification' authed={this.state.loggedIn} component={VerificationPortalContainer}   />
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


export default Main