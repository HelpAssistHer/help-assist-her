import React from 'react'
import injectSheet from 'react-jss'

const ResourceCard = ({ classes, resource }) => {
	return (
		<div className={classes.root}>
			{resource.prcName}
			{resource.address.line1}
			{resource.address.line2}
			{resource.address.city}
			{resource.address.state}
			{resource.address.zip}
		</div>
	)
}

const styles = {
	root: {
		height: '0px',
		'padding-bottom': '30px',
	},
}

export default injectSheet(styles)(ResourceCard)
