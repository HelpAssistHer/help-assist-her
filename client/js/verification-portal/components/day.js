import React from 'react'
import injectSheet from 'react-jss'
import { Field } from 'redux-form'
import { connect } from 'react-redux'
import { change } from 'redux-form'
import classNames from 'classnames'
import Time from './time'
import { updateResource } from '../pregnancy-resource-center/action-creators'

// const Day = ({ classes, day, name, closedAllDay }) => {

class Day extends React.Component {
	render() {
		const { classes, changeFieldValue, hours, resource } = this.props
		const dayName = [
			'Sunday',
			'Monday',
			'Tuesday',
			'Wednesday',
			'Thursday',
			'Friday',
			'Saturday',
		]
		let closedAllDay = false
		let timeing = {}
		const openClose = (i, hours, closedToday) => {
			closedAllDay = !closedToday
			timeing.closedAllDay = !closedToday
			console.log(' hour before = ', hours)
			resource.hours[i] = timeing
			console.log(' hour after = ', hours)
			updateResource(resource)
			// changeFieldValue(`${name}`, timeing)
			// return closedAllDay
		}
		const closedAllDayStatus = (dayNum, hours) => {
			return hours && hours.length > 0
				? hours[dayNum]
					? hours[dayNum].closedAllDay
					: true
				: false
		}

		return (
			<div>
				{_.map(dayName, (today, i) => {
					closedAllDay = closedAllDayStatus(i, hours)
					timeing = _.get(hours, `[${i}]`) || {}
					return (
						<div className={classes.day} key={today}>
							<div>
								<label className={classes.lable}>{today}</label>
								<div
									onClick={() => openClose(i, hours, closedAllDay)}
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
										name={`hours[${i}].open`}
										component={Time}
										placeholder={'open'}
									/>
									to
									<Field
										className={classes.field}
										name={`hours[${i}].close`}
										component={Time}
										placeholder={'close'}
									/>
								</div>
							)}
						</div>
					)
				})}
			</div>
		)
	}
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

const mapDispatchToProps = dispatch => {
	return {
		changeFieldValue: (field, value) => {
			dispatch(change('verificationPortal', field, value || ''))
		},
	}
}
const dayContainer = connect('', mapDispatchToProps)(Day)

export default injectSheet(styles)(dayContainer)
