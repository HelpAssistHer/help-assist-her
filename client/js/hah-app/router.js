import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Landing from './landing'
import VerificationPortalContainer from '../verification-portal'
import { formTypes } from '../verification-portal/constants'

const HahRouter = () => {
	return (
		<Router>
			<div>
				<Route exact path="/" component={Landing} />
				<Route
					exact
					path="/verification"
					render={props => (
						<VerificationPortalContainer
							formType={formTypes.PREGNANCY_RESOURCE_CENTER}
							{...props}
						/>
					)}
				/>
			</div>
		</Router>
	)
}

export default HahRouter
