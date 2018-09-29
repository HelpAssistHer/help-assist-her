import React from 'react'
import injectSheet from 'react-jss'

import HeaderModal from './components/header-modal'
import Spacer from '../components/spacer'
import LoginButton from '../authentication/facebook-login-button'
import Tabs from './components/tabs'
import CommunityHealthCenterForm from './community-health-center'
import PregnancyResourceCenterForm from './pregnancy-resource-center'
import { formTypes } from './constants'
import LeftSideNavContainer from './left-side-nav-container'
import ResourceView from './resource-view'

const VerificationPortal = ({ formType, classes }) => {
	return (
		<div>
			<HeaderModal />
			<Tabs />
			<Spacer height="63px" />
			<LoginButton />
			{getFormComponent({ formType })}
			<div className={classes.verificationPortal}>
				<div className={classes.leftSideNav}>
					<LeftSideNavContainer />
				</div>
				<ResourceView formType={formType} />
			</div>
		</div>
	)
}

const styles = {
	verificationPortal: {
		display: 'flex',
		'flex-direction': 'row',
	},
	leftSideNav: {
		flex: '0 0 339px',
	},
}
export default injectSheet(styles)(VerificationPortal)
