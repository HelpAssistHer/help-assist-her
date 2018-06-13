import React from 'react'
import injectSheet from 'react-jss'

import Spacer from '../components/spacer'

const Input = ({ classes, input, label, type, placeholder }) => {
	return (
		<div className={classes.child}>
			<input
				className={classes.textInput}
				type={type}
				placeholder={placeholder}
				{...input}
			/>
			<Spacer height="10px" />
		</div>
	)
}

const styles = {
	child: {
		display: 'flex',
		'align-items': 'flex-start',
		width: '100%',
	},
	textInput: {
		width: '100%',
		padding: '12px 20px',
		margin: '8px 30px 8px 0px',
		'font-size': '100%',
		border: 'none',
		'border-bottom': '1px solid #979797',
	},
}

export default injectSheet(styles)(Input)
