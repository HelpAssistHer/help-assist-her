import React from 'react'

import HeaderSuccess from './components/header-success'
import LoginButton from '../authentication/facebook-login-button'
import { formTypes } from './constants'
import CommunityHealthCenterForm from './community-health-center'
import PregnancyResourceCenterForm from './pregnancy-resource-center'

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

const VerificationPortal = ({ classes, formType }) => {
	return (
		<div>
			<HeaderSuccess />
			<LoginButton />
			{getFormComponent({ formType })}
		</div>
	)
}

export default VerificationPortal
