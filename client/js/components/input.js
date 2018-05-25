import React from 'react'
import injectSheet from 'react-jss'

import Spacer from '../components/spacer'

const Input = ({ classes, input, label, type, placeholder }) => {
	return (
		<div className={classes.child}>
			<label className={classes.label}>{label}</label>
			<input className={classes.textInput} type={type} placeholder={placeholder} {...input} />
			<Spacer height='10px' />
		</div>
	)
}

const styles = {
	child: {
		'justify-content': 'center',
		width: '80%',
	},
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
		'font-size': '90%',
		'border': 'none',
		'border-bottom': '1px solid #979797'
	},
}

export default injectSheet(styles)(Input)
