import React from 'react'
import injectSheet from 'react-jss'

import CommunityHealthCenterForm from './community-health-center'
import PregnancyResourceCenterForm from './pregnancy-resource-center'
import { formTypes } from './constants'
import LeftSideNavContainer from './left-side-nav-container'
import { ResourceView, getFormComponent } from './resource-view'

const VerificationPortal = ({ formType, classes }) => {
	return (
		<div className={classes.verificationPortal}>
			<div className={classes.leftSideNav}>
				<LeftSideNavContainer />
			</div>
			<ResourceView formType={formType} />
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
