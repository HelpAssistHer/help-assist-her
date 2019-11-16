import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import injectSheet from 'react-jss'

import LeftSideNavContainer from './left-side-nav-container'
import ResourceView from './resource-view'
import { isAuthenticated } from '../authentication/action-creators'

const mapStateToProps = state => {
	return {
		isLoggedIn: state.initialData.isLoggedIn,
	}
}

const VerificationPortalView = ({ formType, classes, isLoggedIn }) => {
	if (!isLoggedIn) {
		isAuthenticated()
		return <Redirect to="/verification" />
	}

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
		'background-color': '#fff',
	},
	leftSideNav: {
		flex: '0 0 339px',
	},
}

const VerificationPortal = injectSheet(styles)(VerificationPortalView)
export default connect(mapStateToProps)(VerificationPortal)
