import React from 'react'
import { connect } from 'react-redux'
import injectSheet from 'react-jss'
import { withRouter } from 'react-router-dom'

import { getPregnancyResourceCenters } from '../data/action-creators'

const ResourceTypeButtonStyle = ({ classes, dispatch, history }) => {
	return (
		<div className={classes.root}>
			<button
				type="submit"
				onClick={() => {
					dispatch(getPregnancyResourceCenters())
					history.push('/mini-app/pregnancy-resource-centers')
				}}
			>
				Pregnancy Centers
			</button>
		</div>
	)
}

const styles = {
	root: {
		height: '0px',
	},
}

const ResourceTypeButton = injectSheet(styles)(ResourceTypeButtonStyle)

export default connect()(withRouter(ResourceTypeButton))
