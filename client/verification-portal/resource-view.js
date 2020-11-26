import React from 'react'
import injectSheet from 'react-jss'

import HeaderModal from './components/header-modal'
import Spacer from '../components/spacer'
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

const ResourceView = ({ formType, classes }) => {
	return (
		<div className={classes.resourceView}>
			<Spacer height="25px" backgroundColor="black" />
			<HeaderModal />
			<Tabs />
			<Spacer height="63px" />
			{getFormComponent({ formType })}
		</div>
	)
}

const styles = {
	resourceView: {
		width: '100%',
	},
}

export default injectSheet(styles)(ResourceView)
