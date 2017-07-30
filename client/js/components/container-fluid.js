import React from 'react'
import injectSheet from 'react-jss'

const ContainerFluid = ({ classes, content}) => (
	<div className={classes.containerFluid}>{content}</div>
)

const styles = {
	containerFluid: {
		'max-width': '903px',
		'background-color': '#ffffff',
		'margin-right': 'auto',
		'margin-left': 'auto',
		'padding-left': '15px',
		'padding-right': '15px',
	},
}

export default injectSheet(styles)(ContainerFluid)
