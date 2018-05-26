import React from 'react'
import { Link } from 'react-router-dom'

class Landing extends React.Component {
	render() {
		return (
			<div className="landing">
				<Link to="/verification">Verification Portal</Link>
			</div>
		)
	}
}

export default Landing
