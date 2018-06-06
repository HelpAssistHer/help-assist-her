import React from 'react'
import injectSheet from 'react-jss'
import classNames from 'classnames'

const Heading = ({ classes, text }) => {
	return <div className={classes.headingText}>{text}</div>
}

const styles = {
	headingText: {
		color: '#D8D8D8',
		'font-size': '20px',
		'font-weight': 'bold',
		'letter-spacing': '3.73px',
		'line-height': '24px',
	},
}

export default injectSheet(styles)(Heading)
