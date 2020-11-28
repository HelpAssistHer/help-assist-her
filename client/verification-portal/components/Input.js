import React from 'react'
import injectSheet from 'react-jss'
import cx from 'classnames'

const Input = ({ classes, type, placeholder, ...props }) => {
	// Redux Forms and Formik pass in input differently
	const input = props.input || props

	const inputClasses = cx(
		classes.textInput,
		(input.name === 'prcName' || input.name === 'chcName') &&
			classes.largeFontSize,
	)
	return (
		<div className={classes.child}>
			<input
				className={inputClasses}
				type={type}
				placeholder={placeholder}
				{...input}
			/>
		</div>
	)
}

const styles = {
	child: {
		display: 'flex',
		'align-items': 'flex-start',
	},
	textInput: {
		width: '100%',
		padding: '12px 20px',
		margin: '8px 30px 8px 0px',
		border: 'none',
		'border-bottom': '1px solid #979797',
		fontSize: '18px',
		outline: 'none',
	},
	largeFontSize: {
		fontSize: '30px',
	},
}

export default injectSheet(styles)(Input)
