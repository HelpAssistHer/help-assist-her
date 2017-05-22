import React from 'react'
import injectSheet from 'react-jss'

const Input = ({ classes, label, placeholder, id, type }) => (
	<div>
		{/*<label className={classes.label}>{label}</label>*/}
		<input className={classes.textInput} id={id} type={type} placeholder={placeholder} />
		{/*<input className={classes.checkbox} type='checkbox' value='1' name='verified' id={`${id}-checkbox`} />*/}
		{/*<br />*/}
		{/*<Spacer height='10px' />*/}
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
		width: '50%',
		padding: '12px 20px',
		margin: '8px 0',
	},
}

export default injectSheet(styles)(Input)
