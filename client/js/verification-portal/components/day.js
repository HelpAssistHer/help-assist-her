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
		let {
			classes,
			day,
			name,
			timeing,
			closedAllDay,
			changeFieldValue,
		} = this.props
		console.log(day, ' timeimg == ', timeing, ' name == ', name)
		if (!timeing) timeing = {}
		const openClose = (name, closedToday) => {
			if (!timeing) timeing = {}
			closedAllDay = !closedToday
			timeing.closedAllDay = !closedToday
			changeFieldValue(`${name}`, timeing)
			return closedAllDay
		}
		return (
			<div className={classes.day}>
				<div>
					<label className={classes.lable}>{day}</label>
					<div
						onClick={() => openClose(name, closedAllDay)}
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
