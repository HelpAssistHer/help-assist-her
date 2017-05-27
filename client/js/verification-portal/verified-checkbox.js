import React from 'react'
import injectSheet from 'react-jss'

const VerifiedCheckbox = ({ classes, input }) => {
	return (
		<div className={classes.child}>
			<input type='checkbox' {...input} />
		</div>
	)
}

const styles = {
	child: {
		'justify-content': 'center',
	},
}

export default injectSheet(styles)(VerifiedCheckbox)
