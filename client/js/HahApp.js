'use strict'

import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Header from './header'
import Landing from './Landing'
import VerificationPortal from './verification-portal-index'

const App = React.createClass({
	render() {
		return (
			<div>
				<Header />
				<Router>
					<div className='app'>
						<Route exact path='/' component={Landing} />
						<Route exact path='/verification' component={VerificationPortal} />
					</div>
				</Router>
			</div>
		)
	}
})

render(<App />, document.getElementById('app'))
