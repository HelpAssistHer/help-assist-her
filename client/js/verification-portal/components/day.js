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
const closedAllDayStatus = (dayNum, hours) => {
	return _.get(hours, `[${dayNum}].closedAllDay`) || false
}

class Day extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			hours: this.props.hours,
		}
		this.openStateToggle = this.openStateToggle.bind(this)
	}
	openStateToggle = (i, hours) => {
		const weeks = hours || []
		const todaysHours = _.nth(hours, i) || {}
		const currentState = closedAllDayStatus(i, this.state.hours)
		todaysHours.closedAllDay = !currentState
		weeks[i] = todaysHours
		this.props.changeFieldValue(`hours[${i}].closedAllDay`, !currentState)
		this.setState({ hours: weeks })
	}
	componentWillReceiveProps(nextProps) {
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
								<label className={classes.lable}>{today}</label>
								<div
									onClick={() => this.openStateToggle(i, this.state.hours)}
									className={
										closedAllDayStatus(i, this.state.hours)
											? classNames(classes.lable, classes.closed)
											: classNames(classes.lable, classes.notClose)
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
	lable: {
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
const dayContainer = connect(null, mapDispatchToProps)(Day)

export default injectSheet(styles)(dayContainer)
