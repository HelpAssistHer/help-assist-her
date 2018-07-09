import React from 'react'

import HeaderSuccess from './components/header-success'
import Spacer from '../components/spacer'
import LoginButton from '../authentication/facebook-login-button'
import Tabs from './components/tabs'
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

const VerificationPortal = ({ formType }) => {
	return (
		<div>
			<HeaderSuccess />
			<Tabs />
			<Spacer height="63px" />
			<LoginButton />
			{getFormComponent({ formType })}
		</div>
	)
}

export default VerificationPortal
