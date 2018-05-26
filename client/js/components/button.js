import React from 'react'
import injectSheet from 'react-jss'
import classNames from 'classNames'

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
		'min-width': '14em', // default button will be medium button size
		outline: 'none',
		padding: '1% 2%',
		'font-size': '.75em',
		'font-weight': 'bold',
		'border-radius': '25px',
		border: '2px solid #000',
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
	medium: {},
	large: {
		'min-width': '20em', // large button class need to be added to make button large
		padding: '2% 5%',
		'font-size': '1.25em',
		'border-radius': '30px',
	},
}

export default injectSheet(styles)(Button)
