import React from 'react'
import { Link } from 'react-router-dom'

import LoginButton from '../authentication/login-button'

class Landing extends React.Component {
	render() {
		return (
			<div className="landing">
				<Link to="/verification">Verification Portal</Link>
				<LoginButton />
			</div>
		)
	}
}

export default Landing
