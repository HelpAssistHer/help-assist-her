import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Landing from './landing'
import VerificationPortalContainer from '../verification-portal'
import { formTypes } from '../verification-portal/constants'

const HahRouter = () => {
	return (
		<Router>
			<Switch>
				<Route exact path="/" component={Landing} />
				<Route
					path="/verification"
					render={props => (
						<VerificationPortalContainer
							formType={formTypes.PREGNANCY_RESOURCE_CENTER}
							{...props}
						/>
					)}
				/>
				<Route
					exact
					path="/verification/pregnancy-resource-center"
					render={props => (
						<VerificationPortalContainer
							formType={formTypes.PREGNANCY_RESOURCE_CENTER}
							{...props}
						/>
					)}
				/>
				<Route
					exact
					path="/verification/community-health-center"
					render={props => (
						<VerificationPortalContainer
							formType={formTypes.COMMUNITY_HEALTH_CENTER}
							{...props}
						/>
					)}
				/>
			</Switch>
		</Router>
	)
}

export default HahRouter
