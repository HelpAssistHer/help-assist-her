import React from 'react'
import { Link } from 'react-router-dom'
class Login extends React.Component {
	render() {
		return (
			<div className='login-page'>
				<p>Please login using Facebook to continue.</p>
				<Link to='/verification'>Continue to Verification Portal</Link>
			</div>
		)
	}
}

export default Login
