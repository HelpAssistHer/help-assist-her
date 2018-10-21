import { connect } from 'react-redux'
import { change } from 'redux-form'

import LeftSideNav from './left-side-nav'

const mapStateToProps = () => {
	return {}
}

const mapDispatchToProps = dispatch => {
	return {
		changeFieldValue: (field, value) => {
			dispatch(change('verificationPortal', field, value || ''))
		},
	}
}

const LeftSideNavContainer = connect(mapStateToProps, mapDispatchToProps)(
	LeftSideNav,
)

export default LeftSideNavContainer
