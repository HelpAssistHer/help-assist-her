import React from 'react'
import injectSheet from 'react-jss'

const Input = ({ classes, input, type, placeholder }) => {
	return (
		<div className={classes.inputRoot}>
			<div className={classes.border}>
				<input
					className={classes.inputPhone}
					type={type}
					placeholder={placeholder}
					{...input}
				/>
			</div>
		</div>
	)
}

const styles = {
	inputRoot: {
		display: 'flex',
		'justify-content': 'center',
	},
	border: {
		'border-bottom': '1px solid #979797',
		width: '250px',
	},
	inputPhone: {
		border: 'none',
		outline: 'none',
		'font-family': 'hah-regular',
		'font-size': '14px',
		color: '#000000',
		opacity: '0.27',
		'letter-spacing': '0.5px',
		'line-height': '16px',
		'text-align': 'center',
		height: '26px',
		width: '100%',
	},
}

export default injectSheet(styles)(Input)
