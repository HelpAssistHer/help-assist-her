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
import ResourceList from '../mini-app/questions/resource-list'
import About from './about'
import Feedback from './feedback'
import Emergency from './emergency'
import Menu from '../mini-app/components/menu'
import { formTypes } from '../verification-portal/constants'

const HahRouter = () => {
	return (
		<Router>
			<Switch>
				<Route exact path="/verification" component={Landing} />
				<Route exact path="/mini-app" render={() => <MiniApp />} />
				<Route exact path="/about" component={About} />
				<Route exact path="/feedback" component={Feedback} />
				<Route exact path="/menu" component={Menu} />
				<Route exact path="/emergency" component={Emergency} />
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
				<Redirect from="/" to="/mini-app" />
			</Switch>
		</Router>
	)
}

export default HahRouter
