import React from 'react'
import { Link } from 'react-router-dom'
import FacebookLoginButton from '../authentication/facebook-login-button/index'

class Landing extends React.Component {
	render() {
		return (
			<div className='landing'>
				<FacebookLoginButton/>
				<Link to='/verification'>Verification Portal</Link>
			</div>
		)
	}
}

export default Landing
