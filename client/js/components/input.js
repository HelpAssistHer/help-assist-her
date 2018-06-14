import React from 'react'
import injectSheet from 'react-jss'

import Spacer from '../components/spacer'

const Input = ({ classes, input, type, placeholder }) => {
	return (
		<div className={classes.child}>
			<input
				className={classes.textInput}
				type={type}
				placeholder={placeholder}
				{...input}
			/>
		</div>
	)
}

const styles = {
	child: {
		display: 'flex',
		'align-items': 'flex-start',
	},
	textInput: {
		width: '100%',
		padding: '12px 20px',
		margin: '8px 30px 8px 0px',
		'font-size': '18px',
		border: 'none',
		'border-bottom': '1px solid #979797',
	},
}

export default injectSheet(styles)(Input)
