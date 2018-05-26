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
		// this class will be applied to all button
		'outline': 'none',
		'font-size': '.75em',
		'font-weight': 'bold',
	},
	inactive: {
		// this class will be applied to button which will have props btnType == balckAndWhite
		color: '#000',
		'background-color': '#fff',
		'&:hover': {
			color: '#fff',
			'border-color': '#f28274',
			'background-color': '#f28274',
		},
	},
	active: {
		// this class will be applied to button which will have props btnType == orange
		color: '#fff',
		'border-color': '#f28274',
		'background-color': '#f28274',
	},
	medium: {
		'height': '49.69px',
		'width': '153.18px',
		'border': '2px solid #000000',
		'border-radius': '100px'
	},
	large: {
		'font-size': '1.25em',
		'height': '48.84px',
		'width': '280px',
		'border': '2px solid #000000',
		'border-radius': '100px'
	},
}

export default injectSheet(styles)(Button)
