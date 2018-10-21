import React from 'react'
import injectSheet from 'react-jss'
import { connect } from 'react-redux'
import { change } from 'redux-form'

const timeInterval = [
	'12:00',
	'12:30',
	'1:00',
	'1:30',
	'2:00',
	'2:30',
	'3:00',
	'3:30',
	'4:00',
	'4:30',
	'5:00',
	'5:30',
	'6:00',
	'6:30',
	'7:00',
	'7:30',
	'8:00',
	'8:30',
	'9:00',
	'9:30',
	'10:00',
	'10:30',
	'11:00',
	'11:30',
]
const timeSpin = (currentValue, name, increment, changeFieldValue) => {
	let i = 0
	if (!currentValue)
		return name.split('.')[1] === 'open'
			? changeFieldValue(name, '9:00 am')
			: changeFieldValue(name, '5:00 pm')
	const currentTime = currentValue.split(' ')
	i = timeInterval.indexOf(currentTime[0])
	!timeInterval[i + increment]
		? currentTime[1] === 'am'
			? (currentTime[1] = 'pm')
			: (currentTime[1] = 'am')
		: ''
	!timeInterval[i + increment]
		? increment < 0
			? (i = timeInterval.length)
			: (i = -1)
		: ''
	currentTime[0] = timeInterval[i + increment]
	changeFieldValue(name, currentTime.join(' '))
}
const Time = ({ classes, input, changeFieldValue }) => {
	return (
		<div className={classes.wrapper}>
			<span
				className={classes.arrow}
				onClick={() => timeSpin(input.value, input.name, -1, changeFieldValue)}
			>
				{'<'}
			</span>
			<input
				className={classes.input}
				type="text"
				placeholder={input.name.split('.')[1]}
				{...input}
			/>
			<span
				className={classes.arrow}
				onClick={() => timeSpin(input.value, input.name, 1, changeFieldValue)}
			>
				{'>'}
			</span>
		</div>
	)
}
const styles = {
	wrapper: {
		color: '#000',
		padding: '2.5px',
		'border-bottom': '1px solid #979797',
		width: '105px',
	},
	input: {
		height: '17px',
		width: '84px',
		'font-family': 'sans-serif',
		'font-size': '14px',
		'letter-spacing': '1.91px',
		'line-height': '17px',
		'text-align': 'center',
		border: 'none',
		outline: 'none',
		padding: '0px 1.5px',
	},
	arrow: {
		height: '18px',
		width: '8px',
		'font-family': 'Al Tarikh',
		'font-size': '14px',
		'letter-spacing': '0.95px',
		'line-height': '18px',
		cursor: 'pointer',
	},
}

const mapDispatchToProps = dispatch => {
	return {
		changeFieldValue: (field, value) => {
			dispatch(change('verificationPortal', field, value || ''))
		},
	}
}
const timeContainer = connect('', mapDispatchToProps)(Time)

export default injectSheet(styles)(timeContainer)
