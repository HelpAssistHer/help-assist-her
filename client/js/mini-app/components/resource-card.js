import React from 'react'
import injectSheet from 'react-jss'

const ResourceCard = ({ classes, resource }) => {
	return (
		<div className={classes.root}>
			<div className={classes.resourceName}>{resource.prcName}</div>
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
		border: '2px solid #3d65f9',
		'border-radius': '4px',
		margin: '20px 20px 20px 20px',
	},
	resourceName: {
		margin: '40px 0px 0px 30px',
		'font-family': 'sans-serif',
		'font-size': '20px',
	},
}

export default injectSheet(styles)(ResourceCard)
