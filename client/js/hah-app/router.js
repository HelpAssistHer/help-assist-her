import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Landing from './landing'
import VerificationPortalContainer from '../verification-portal'

const HahRouter = () => {
	return (
		<Router>
			<div>
				<Route exact path="/" component={Landing} />
				<Route
					exact
					path="/verification"
					component={VerificationPortalContainer}
				/>
			</div>
		</Router>
	)
}

export default HahRouter
