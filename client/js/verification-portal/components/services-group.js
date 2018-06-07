import React from 'react'
import injectSheet from 'react-jss'

const ServicesGroup = ({ classes, heading }) => {
	return (
		<div>
			<div className={classes.heading}>{heading}</div>
		</div>
	)
}

const styles = {
	heading: {
		color: '#000000',
		'font-size': '18px',
		'font-weight': 'bold',
		'letter-spacing': '1px',
		'line-height': '22px',
	},
}

export default injectSheet(styles)(ServicesGroup)
