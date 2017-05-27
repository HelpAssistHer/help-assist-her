import React from 'react'
import injectSheet from 'react-jss'

const VerifiedCheckbox = ({ classes, input, label }) => {
	return (
		<div className={classes.child}>
			<label className={classes.label}>{label}</label>
			<input type='checkbox' checked={input.value} {...input} />
		</div>
	)
}

const styles = {
	child: {
		'justify-content': 'center',
	},
	label: {
		padding: '20px 10px',
		display: 'block',
		float: 'left',
		width: '100%',
		'text-align': 'right',
	},
}

export default injectSheet(styles)(VerifiedCheckbox)
