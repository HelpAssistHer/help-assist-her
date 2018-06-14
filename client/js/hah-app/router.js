import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Landing from './landing'
import VerificationPortalContainer from '../verification-portal/index'
import CommunityHealthCenterContainer from '../verification-portal/community-health-center'

const HahRouter = () => {
	return (
		<Router>
			<div>
				<Route exact path="/" component={Landing} />
				<Route
					exact
					path="/verification/pregnancy-resource-center"
					component={VerificationPortalContainer}
				/>
				<Route
					exact
					path="/verification/community-health-center"
					component={CommunityHealthCenterContainer}
				/>
			</div>
		</Router>
	)
}

export default HahRouter
