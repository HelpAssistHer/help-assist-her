import React from 'react'
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from 'react-router-dom'

import Landing from './landing'
import VerificationPortalContainer from '../verification-portal'
import MiniApp from '../mini-app'
import ResourceList from '../mini-app/components/resource-list'
import { formTypes } from '../verification-portal/constants'

const HahRouter = () => {
	return (
		<Router>
			<Switch>
				<Route exact path="/" component={Landing} />
				<Route exact path="/mini-app" render={() => <MiniApp />} />
				<Route
					exact
					path="/mini-app/pregnancy-resource-centers"
					component={ResourceList}
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
					path="/verification/pregnancy-resource-center/:id"
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
				<Redirect
					from="/verification"
					to="/verification/pregnancy-resource-center"
				/>
			</Switch>
		</Router>
	)
}

export default HahRouter
