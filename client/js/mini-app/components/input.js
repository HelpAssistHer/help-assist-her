import React from 'react'
import injectSheet from 'react-jss'

const Input = ({ classes, input, type, placeholder }) => {
	return (
		<div className={classes.inputRoot}>
			<input
				className={classes.inputPhone}
				type={type}
				placeholder={placeholder}
				{...input}
			/>
		</div>
	)
}

const styles = {
	inputRoot: {
		display: 'flex',
		'justify-content': 'center',
	},
	inputPhone: {
		border: 'none',
		'border-bottom': '1px solid #979797',
		outline: 'none',
		'font-family': 'hah-regular',
		'font-size': '14px',
		color: '#000000',
		opacity: '0.27',
		'letter-spacing': '0.5px',
		'line-height': '16px',
		'text-align': 'center',
		width: '208px',
		height: '26px',
	},
}

export default injectSheet(styles)(Input)
