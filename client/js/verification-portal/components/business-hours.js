import React from 'react'
import injectSheet from 'react-jss'
import { Field } from 'redux-form'
import { connect } from 'react-redux'
import { change } from 'redux-form'
import classNames from 'classnames'
import Time from './time'
import _ from 'lodash'
const dayName = [
	'Sunday',
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
]
const closedAllDayStatus = (dayNumber, hours) => {
	return _.get(hours, `[${dayNumber}].closedAllDay`) || false
}

class BusinessHours extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			hours: this.props.hours,
		}
		this.openStateToggle = this.openStateToggle.bind(this)
	}
	openStateToggle = (i, hours, changeFieldValue) => {
		const weeks = hours || []
		const todaysHours = _.get(hours, i) || {}
		const currentState = closedAllDayStatus(i, hours)
		todaysHours.closedAllDay = !currentState
		weeks[i] = todaysHours
		// if !currentState is true setting open and clost time field to null
		if (!currentState) {
			changeFieldValue(`hours[${i}].open`, null)
			changeFieldValue(`hours[${i}].close`, null)
			weeks[i] = { closedAllDay: !currentState }
		}
		changeFieldValue(`hours[${i}].closedAllDay`, !currentState)
		this.setState({ hours: weeks })
	}
	UNSAFE_componentWillReceiveProps(nextProps) {
		this.setState({ hours: nextProps.hours })
	}
	render() {
		const { classes, changeFieldValue } = this.props
		return (
			<div>
				{_.map(dayName, (today, i) => {
					return (
						<div className={classes.day} key={today}>
							<div className={classes.dayStatus}>
								<label className={classes.label}>{today}</label>
								<div
									onClick={() =>
										this.openStateToggle(i, this.state.hours, changeFieldValue)
									}
									className={
										closedAllDayStatus(i, this.state.hours)
											? classNames(classes.label, classes.closed)
											: classNames(classes.label, classes.open)
									}
								>
									Closed
								</div>
							</div>
							{closedAllDayStatus(i, this.state.hours) ? (
								''
							) : (
								<div>
									<Field
										className={classes.field}
										name={`hours[${i}].open`}
										component={Time}
									/>
									to
									<Field
										className={classes.field}
										name={`hours[${i}].close`}
										component={Time}
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
	dayStatus: {
		'margin-left': '85px',
	},
	label: {
		display: 'inline-block',
		width: '30%',
		'max-width': '159.63px',
		height: '22px',
		color: '#000000',
		'font-family': 'Century Gothic',
		'font-size': '18px',
		'letter-spacing': '1px',
		'line-height': '22px',
		margin: '10px 20px',
		'text-align': 'left',
		border: 'none',
	},
	open: {
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

const mapStateToProps = state => {
	return {
		hours: state.resource.hours,
	}
}
const businessHoursContainer = connect(mapStateToProps, mapDispatchToProps)(
	BusinessHours,
)

export default injectSheet(styles)(businessHoursContainer)
