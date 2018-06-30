import React from 'react'
import injectSheet from 'react-jss'

const Time = ({ classes, input, placeholder }) => {
	return (
		<div className={classes.warper}>
			<span className={classes.arrow}>{'<'}</span>
			<input
				className={classes.input}
				type="text"
				placeholder={placeholder}
				{...input}
			/>
			<span className={classes.arrow}>{'>'}</span>
		</div>
	)
}

const styles = {
	warper: {
		color: '#000',
	},
	input: {
		height: '17px',
		width: '84px',
		'font-family': 'Century Gothic',
		'font-size': '14px',
		'letter-spacing': '1.91px',
		'line-height': '17px',
		'text-align': 'center',
		border: 'none',
		outline: 'none',
		padding: '0px 5px',
	},
	arrow: {
		height: '18px',
		width: '8px',
		'font-family': 'Al Tarikh',
		'font-size': '18px',
		'letter-spacing': '0.95px',
		'line-height': '18px',
		cursor: 'pointer',
	},
}

export default injectSheet(styles)(Time)
