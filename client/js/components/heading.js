import React from 'react'
import injectSheet from 'react-jss'

const Heading = ({ classes, text, size }) => {
	return <div className={classes[`${size}`]}>{text}</div>
}

const styles = {
	medium: {
		color: '#D8D8D8',
		'font-size': '20px',
		'font-weight': 'bold',
		'letter-spacing': '3.73px',
		'line-height': '24px',
		'justify-self': 'start',
	},
	small: {
		height: '17px',
		color: '#F48271',
		'font-size': '14px',
		'font-weight': 'bold',
		'letter-spacing': '2.61px',
		'line-height': '17px',
	},
}

export default injectSheet(styles)(Heading)
