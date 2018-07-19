import React from 'react'
import injectSheet from 'react-jss'
import { connect } from 'react-redux'
import { change } from 'redux-form'

class Time extends React.Component {
	render() {
		const { classes, input, placeholder, changeFieldValue } = this.props
		let i = 0
		const hr = [
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
			'12:00',
		]
		const timeSpin = (current, name, arrow) => {
			if (!current)
				return name.split('.')[1] == 'open'
					? changeFieldValue(name, '9:00 am')
					: changeFieldValue(name, '5:00 pm')
			current = current.split(' ')
			i = hr.indexOf(current[0])
			if (arrow == 'up') {
				if (!hr[i - 1]) {
					i = hr.length
					current[1] == 'am' ? (current[1] = 'pm') : (current[1] = 'am')
				}
				current[0] = hr[i - 1]
			} else {
				if (!hr[i + 1]) {
					i = -1
					current[1] == 'am' ? (current[1] = 'pm') : (current[1] = 'am')
				}
				current[0] = hr[i + 1]
			}
			changeFieldValue(name, current.join(' '))
		}
		return (
			<div className={classes.wrapper}>
				<span
					className={classes.arrow}
					onClick={() => timeSpin(input.value, input.name, 'up')}
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
					onClick={() => timeSpin(input.value, input.name, 'down')}
				>
					{'>'}
				</span>
			</div>
		)
	}
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
		'font-family': 'Century Gothic',
		'font-size': '14px',
		'letter-spacing': '1.91px',
		'line-height': '17px',
		'text-align': 'center',
		border: 'none',
		outline: 'none',
		padding: '0px 1.5px',
		// '& ::-webkit-inner-spin-button, & ::-webkit-inner-spin-button:hover, & ::-webkit-outer-spin-button, & ::-webkit-outer-spin-button:hover': {
		// 	'-webkit-appearance': 'none',
		// 	margin: '0',
		// },
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
