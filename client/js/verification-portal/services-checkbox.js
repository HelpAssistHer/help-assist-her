import React from 'react'
import injectSheet from 'react-jss'

const ServicesCheckbox = ({ classes, input, label }) => {
	return (
		<div className={classes.parent}>
			<input type='checkbox' {...input} />
			<label className={classes.label}>{label}</label>
		</div>
	)
}

const styles = {
	parent: {
		display: 'flex',
		'align-items': 'baseline',
		'justify-content': 'center',
	},
	label: {
		padding: '20px 10px',
	},
}

export default injectSheet(styles)(ServicesCheckbox)
