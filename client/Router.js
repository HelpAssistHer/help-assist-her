import React from 'react'
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from 'react-router-dom'

import LoginPage from './verification-portal/components/LoginPage'
import VerificationPortalContainer from './verification-portal'
import MiniApp from './components/MiniApp'
import ResultsPage from './components/ResultsPage'
import AboutPage from './components/AboutPage'
import FeedbackPage from './components/FeedbackPage'
import EmergencyPage from './components/EmergencyPage'
import Menu from './components/Menu'
import { formTypes } from './verification-portal/constants'

const HahRouter = () => {
	return (
		<Router>
			<Switch>
				<Route exact path="/verification" component={LoginPage} />
				<Route exact path="/mini-app" component={MiniApp} />
				<Route exact path="/about" component={AboutPage} />
				<Route exact path="/feedback" component={FeedbackPage} />
				<Route exact path="/menu" component={Menu} />
				<Route exact path="/emergency" component={EmergencyPage} />
				<Route exact path="/mini-app/results" component={ResultsPage} />
				<Route
					exact
					path="/verification/pregnancy-resource-center"
					render={(props) => (
						<VerificationPortalContainer
							formType={formTypes.PREGNANCY_RESOURCE_CENTER}
							{...props}
						/>
					)}
				/>
				<Route
					exact
					path="/verification/pregnancy-resource-center/:id"
					render={(props) => (
						<VerificationPortalContainer
							formType={formTypes.PREGNANCY_RESOURCE_CENTER}
							{...props}
						/>
					)}
				/>
				<Route
					exact
					path="/verification/community-health-center"
					render={(props) => (
						<VerificationPortalContainer
							formType={formTypes.COMMUNITY_HEALTH_CENTER}
							{...props}
						/>
					)}
				/>
				<Redirect from="/" to="/mini-app" />
			</Switch>
		</Router>
	)
}

export default HahRouter
