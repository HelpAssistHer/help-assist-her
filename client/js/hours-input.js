import React from 'react'
import injectSheet from 'react-jss'
import Spacer from './spacer'

const HoursInput = ({ classes, label, value, placeholder, id }) => (
	<div className={classes.root}>
		<label className={classes.label}>{label}</label>

		<input className={classes.checkbox} type='checkbox' value='1' name='verified' id={`${id}-checkbox`} />
		<input className={classes.textInput} id={id} type='time' placeholder='Time Opens'  />
		<input className={classes.textInput} type='time' placeholder='Time Closes'  />
		<br />
		<Spacer height='10px' />
	</div>
)

const styles = {
	label: {
		padding: '20px 10px',
		display: 'block',
		float: 'left',
		width: '20%',
		'text-align': 'right',
	},
	textInput: {
		width: '100px',
		padding: '12px 20px',
		margin: '8px 0',
	},
}

export default injectSheet(styles)(HoursInput)
