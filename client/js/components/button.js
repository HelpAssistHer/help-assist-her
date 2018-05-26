import React from 'react'
import injectSheet from 'react-jss'
import classNames from 'classnames'

const Button = ({ classes, onClick, buttonText, activeState, type, size }) => {
	const activeClass = activeState ? classes.active : classes.inactive
	return (
		<button
			type={type}
			className={classNames(activeClass, classes[size], classes.default)}
			onClick={onClick}
		>
			{buttonText}
		</button>
	)
}

const styles = {
	default: {
		outline: 'none',
		'font-weight': 'bold',
		border: '2px solid #000000',
		'border-radius': '100px',
		'text-align': 'center',
	},
	inactive: {
		color: '#000',
		'background-color': '#fff',
		'&:hover': {
			color: '#fff',
			'border-color': '#f28274',
			'background-color': '#f28274',
		},
	},
	active: {
		color: '#fff',
		'border-color': '#f28274',
		'background-color': '#f28274',
	},
	medium: {
		'font-size': '15px',
		height: '49.69px',
		width: '153.18px',
		'letter-spacing': '0.23px',
		'line-height': '18px',
	},
	large: {
		'font-size': '18px',
		height: '48.84px',
		width: '280px',
		'letter-spacing': '0.3px',
		'line-height': '22px',
	},
}

export default injectSheet(styles)(Button)
