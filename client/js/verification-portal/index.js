import React from 'react'
import injectSheet from 'react-jss'

import HeaderSuccess from './components/header-success'
import Spacer from '../components/spacer'
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
			<Spacer height="64px" />
			<Spacer height="25px" />
			<LoginButton />
			{getFormComponent({ formType })}
		</div>
	)
}

const styles = {}

export default injectSheet(styles)(VerificationPortal)
