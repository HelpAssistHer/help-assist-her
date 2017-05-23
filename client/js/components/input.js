import React from 'react'
import injectSheet from 'react-jss'

import Spacer from '../components/spacer'

const Input = ({ classes, input, label, type }) => {
	return (
		<div>
			<label className={classes.label}>{label}</label>
			<input className={classes.textInput} type={type} {...input} />
			<Spacer height='10px' />
		</div>
	)
}

const styles = {
	label: {
		padding: '20px 10px',
		display: 'block',
		float: 'left',
		width: '20%',
		'text-align': 'right',
	},
	textInput: {
		width: '50%',
		padding: '12px 20px',
		margin: '8px 0',
	},
}

export default injectSheet(styles)(Input)
