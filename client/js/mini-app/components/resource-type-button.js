import React from 'react'
import { connect } from 'react-redux'
import injectSheet from 'react-jss'

import { findPregnancyCentersNearMe } from '../data/action-creators'

const ResourceTypeButtonStyle = ({ classes, dispatch }) => {
	return (
		<div className={classes.root}>
			<button
				onClick={() => {
					findPregnancyCentersNearMe()
					// dispatch(findPregnancyCentersNearMe())
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

export default connect()(ResourceTypeButton)
