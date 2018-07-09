import React from 'react'
import injectSheet from 'react-jss'
import { Field } from 'redux-form'
import classNames from 'classnames'
import Time from './time'

const Day = ({ classes, day, name, closedAllDay }) => {
	const openClose = closedToday => {
		console.log('closedAllDay == ', closedToday)
		return (closedAllDay = !closedToday)
	}
	return (
		<div className={classes.day}>
			<div>
				<label className={classes.lable}>{day}</label>
				<div
					onClick={() => openClose(closedAllDay)}
					className={
						closedAllDay
							? classNames(classes.closed, classes.lable)
							: classNames(classes.lable, classes.notClose)
					}
				>
					Closed
				</div>
			</div>
			{closedAllDay ? (
				''
			) : (
				<div>
					<Field
						className={classes.field}
						name={`${name}.open`}
						component={Time}
						placeholder={'open'}
					/>
					to
					<Field
						className={classes.field}
						name={`${name}.close`}
						component={Time}
						placeholder={'close'}
					/>
				</div>
			)}
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
		margin: '10px 20px',
	},
	notClose: {
		opacity: '0.3',
		color: '#F7924B',
	},
	closed: {
		opacity: '1',
		color: '#F7924B',
	},
	field: {
		display: 'inline-block',
	},
}

export default injectSheet(styles)(Day)
