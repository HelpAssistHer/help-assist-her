'use strict'

import React from 'react'
import injectSheet from 'react-jss'

const Spacer = ({ classes, height, width }) => (
	<div
		className={classes.spacer}
		style={{
			height,
			width,
			flex: '0 0 auto',
		}}
	/>
)

const styles = {
	spacer: {
		flex: '0 0 auto',
	},
}

export default injectSheet(styles)(Spacer)
