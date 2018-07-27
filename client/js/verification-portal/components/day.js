import React from 'react'
import injectSheet from 'react-jss'
import { Field } from 'redux-form'
import { connect } from 'react-redux'
import { change } from 'redux-form'
import classNames from 'classnames'
import Time from './time'

class Day extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			hours: this.props.hours,
		}
		this.openState = this.openState.bind(this)
	}
	openState = (i, currentState, hours, changeFieldValue) => {
		hours[i]
			? (hours[i].closedAllDay = !currentState)
			: (hours[i] = { closedAllDay: !currentState })
		changeFieldValue(`hours[${i}].closedAllDay`, !currentState)
		this.setState({ hours })
	}
	componentWillReceiveProps(nextProps) {
		this.setState({ hours: nextProps.hours })
	}
	render() {
		const { classes, changeFieldValue } = this.props
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
			return hours ? (hours[dayNum] ? hours[dayNum].closedAllDay : true) : false
		}
		return (
			<div>
				{_.map(dayName, (today, i) => {
					return (
						<div className={classes.day} key={today}>
							<div>
								<label className={classes.lable}>{today}</label>
								<div
									onClick={() =>
										this.openState(
											i,
											closedAllDayStatus(i, this.props.hours),
											this.props.hours,
											changeFieldValue,
										)
									}
									className={
										closedAllDayStatus(i, this.state.hours)
											? classNames(classes.closed, classes.lable)
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
const dayContainer = connect(null, mapDispatchToProps)(Day)

export default injectSheet(styles)(dayContainer)
