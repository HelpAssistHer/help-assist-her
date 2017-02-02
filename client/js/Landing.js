'use strict'

import React from 'react'
import { Link } from 'react-router'
import ResourceButton from './ResourceButton'

const Landing = React.createClass({
	render() {
		return (
			<div className='landing'>
				<h1>Welcome to HAH</h1>
				<input type='text' placeholder='Search' />
				<Link to='/search'>Pregnancy Centers</Link>
				<Link to='/search'>Well Woman Care</Link>
				<ResourceButton/>
				<ResourceButton/>
				<ResourceButton/>
				<ResourceButton/>
			</div>
		)
	}
})

export default Landing
