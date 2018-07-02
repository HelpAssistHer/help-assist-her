import React from 'react'
import injectSheet from 'react-jss'
import { Field } from 'redux-form'
import classNames from 'classnames'
import Input from '../../components/input'

const Day = ({ classes, day, name, closedAllDay }) => {
	return (
		<div className={classes.day}>
			<div>
				<label className={classes.lable}>{day}</label>
				<div
					className={
						closedAllDay
							? classNames(classes.closed, classes.lable)
							: classNames(classes.lable, classes.notClose)
					}
				>
					Closed
				</div>
			</div>
			<div>
				<Field name={`${name}.open`} component={Input} type="time" />
				<Field name={`${name}.close`} component={Input} type="time" />
			</div>
		</div>
	)
}

const styles = {
	day: {
		padding: '1.5%',
	},
	lable: {
		display: 'inline-block',
		width: '45%',
		height: '22px',
		width: '159.63px',
		color: '#000000',
		'font-family': 'Century Gothic',
		'font-size': '18px',
		'letter-spacing': '1px',
		'line-height': '22px',
	},
	notClose: {
		opacity: '0.3',
		color: '#F7924B',
	},
	closed: {
		opacity: '1',
		color: '#F7924B',
	},
}

export default injectSheet(styles)(Day)
