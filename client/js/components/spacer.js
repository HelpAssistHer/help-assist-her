import React from 'react'
import injectSheet from 'react-jss'

const Spacer = ({ classes, height, width, backgroundColor }) => (
	<div
		className={classes.spacer}
		style={{
			height,
			width,
			backgroundColor,
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
