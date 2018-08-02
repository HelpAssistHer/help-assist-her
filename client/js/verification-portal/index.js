import React from 'react'
import injectSheet from 'react-jss'

import HeaderSuccess from './components/header-success'
import Spacer from '../components/spacer'
import LoginButton from '../authentication/facebook-login-button'
import Tabs from './components/tabs'
import LeftSideNavContainer from './components/left-side-nav-container'
import CommunityHealthCenterForm from './community-health-center'
import PregnancyResourceCenterForm from './pregnancy-resource-center'
import { formTypes } from './constants'

function getFormComponent({ formType }) {
	switch (formType) {
		case formTypes.COMMUNITY_HEALTH_CENTER:
			return <CommunityHealthCenterForm />
		case formTypes.PREGNANCY_RESOURCE_CENTER:
			return <PregnancyResourceCenterForm />
		default:
			throw new Error(`Invalid form type: ${formType}`)
	}
}

const ResourceView = ({ formType, classes }) => {
	return (
		<div style={{ flex: '0 0 auto' }}>
			<Spacer height="25px" backgroundColor="black" />
			<HeaderSuccess />
			<Tabs />
			<Spacer height="63px" />
			<LoginButton />
			{getFormComponent({ formType })}
		</div>
	)
}

const VerificationPortal = ({ formType, classes }) => {
	return (
		<div className={classes.verificationPortal}>
			<LeftSideNavContainer />
			<ResourceView formType={formType} />
		</div>
	)
}

const styles = {
	verificationPortal: {
		display: 'flex',
		'flex-direction': 'row',
	},
}
export default injectSheet(styles)(VerificationPortal)
