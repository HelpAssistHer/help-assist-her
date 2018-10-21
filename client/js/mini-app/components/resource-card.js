import React from 'react'
import injectSheet from 'react-jss'

const ResourceCard = ({ classes, resource }) => {
	const { line1, line2, city, state, zip } = resource.address

	return (
		<div className={classes.root}>
			<div className={classes.resourceName}>{resource.prcName}</div>
			<div className={classes.resourceAddress}>
				{line1}
				{line2}
				<br />
				{`${city}, ${state} ${zip}`}
			</div>
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
	resourceAddress: {
		margin: '20px 0px 20px 30px',
		'font-family': 'sans-serif',
		'font-size': '15px',
	},
}

export default injectSheet(styles)(ResourceCard)
