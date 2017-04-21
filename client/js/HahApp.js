'use strict'

import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Match } from 'react-router'

import Header from './header'
import Landing from './Landing'
import Search from './Search'
import VerificationPortal from './verification-portal-index'

const App = React.createClass({
	render() {
		return (
			<div>
				<Header />
				<BrowserRouter>
					<div className='app'>
						<Match exactly pattern='/' component={Landing} />
						<Match pattern='/search' component={Search} />
						<Match pattern='/verification' component={VerificationPortal} />
					</div>
				</BrowserRouter>
			</div>
		)
	}
})

render(<App />, document.getElementById('app'))
