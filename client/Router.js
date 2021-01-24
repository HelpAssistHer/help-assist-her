import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import LoginPage from './verification-portal/components/LoginPage'
import MiniApp from './components/MiniApp'
import ResultsPage from './components/ResultsPage'
import AboutPage from './components/AboutPage'
import FeedbackPage from './components/FeedbackPage'
import EmergencyPage from './components/EmergencyPage'
import Menu from './components/Menu'

const HahRouter = () => {
	return (
		<Router>
			<Switch>
				<Route exact path="/" component={MiniApp} />
				<Route exact path="/verification" component={LoginPage} />
				<Route exact path="/about" component={AboutPage} />
				<Route exact path="/feedback" component={FeedbackPage} />
				<Route exact path="/menu" component={Menu} />
				<Route exact path="/emergency" component={EmergencyPage} />
				<Route exact path="/results" component={ResultsPage} />
			</Switch>
		</Router>
	)
}

export default HahRouter
