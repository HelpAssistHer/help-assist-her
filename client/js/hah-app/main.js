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
import VerificationPortalContainer from '../verification-portal/index'

const Main = () => (
	<main>
		<div className="container-fluid">
			<Switch>
				{/*<Route exact path='/' component={Home}/>*/}
				{/*<Route path="/public" component={Public}/>*/}
				{/*<Route path="/login" component={Login}/>*/}
				{/*<Route path="/protected" component={Protected}/>*/}
				<Route exact path='/' component={Landing} />
				<Route exact path='/verification' component={VerificationPortalContainer}   />
			</Switch>
		</div>
	</main>
)

//
//
// const fakeAuth = {
// 	//isAuthenticated: false,
// 	isAuthenticated: true,
// 	authenticate(cb) {
// 		this.isAuthenticated = true
// 		setTimeout(cb, 100) // fake async
// 	},
// 	signout(cb) {
// 		this.isAuthenticated = false
// 		setTimeout(cb, 100)
// 	}
// }
//
// const AuthButton = withRouter(({ history }) => (
// 	fakeAuth.isAuthenticated ? (
// 			<p>
// 				Welcome! <button onClick={() => {
// 				fakeAuth.signout(() => history.push('/'))
// 			}}>Sign out</button>
// 			</p>
// 		) : (
// 			<p>You are not logged in.</p>
// 		)
// ))
//
const Public = () => <h3>Public</h3>
const Protected = () => <h3>Protected</h3>
//
// const PrivateRoute = ({ component: Component, ...rest }) => (
// 	<Route {...rest} render={props => (
// 		fakeAuth.isAuthenticated ? (
// 				<Component {...props}/>
// 			) : (
// 				<Redirect to={{
// 					pathname: '/login',
// 					state: { from: props.location }
// 				}}/>
// 			)
// 	)}/>
// )
//
// class Login extends React.Component {
// 	state = {
// 		redirectToReferrer: false
// 	}
//
// 	login = () => {
// 		fakeAuth.authenticate(() => {
// 			this.setState({ redirectToReferrer: true })
// 		})
// 	}
//
// 	render() {
// 		const { from } = this.props.location.state || { from: { pathname: '/' } }
// 		const { redirectToReferrer } = this.state
//
// 		if (redirectToReferrer) {
// 			return (
// 				<Redirect to={from}/>
// 			)
// 		}
//
// 		return (
// 			<div>
// 				<p>You must log in to view the page at {from.pathname}</p>
// 				<button onClick={this.login}>Log in</button>
// 			</div>
// 		)
// 	}
// }


const Home = () => (
	<div>
		<h1>Welcome to the Tornadoes Website!</h1>
	</div>
)

export default Main