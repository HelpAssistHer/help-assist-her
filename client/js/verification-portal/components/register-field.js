import React from 'react'
import injectSheet from 'react-jss'
import { Field } from 'redux-form'
import classNames from 'classnames'

import Input from '../../components/input'
import Toggle from '../../components/toggle'
import Spacer from '../../components/spacer'

const RegisterField = ({ classes, inputField, normalize }) => {
	const customInputStyle = inputField.customInputStyle
		? classes[inputField.customInputStyle]
		: ''
	return (
		<div>
			{inputField.spacer ? <Spacer height={inputField.spacer} /> : ''}
			<div className={classes.verifiedField}>
				{inputField.verify ? (
					<Field name={inputField.verify} component={Toggle} type="checkbox" />
				) : null}
			</div>
			<div className={classNames(classes.inputField, customInputStyle)}>
				<Field
					component={Input}
					name={inputField.name}
					placeholder={inputField.placeholder}
					type={inputField.type ? inputField.type : 'text'}
					normalize={normalize}
				/>
			</div>
		</div>
	)
}

const styles = {
	verifiedField: {
		display: 'inline-block',
		width: '20%',
	},
	inputField: {
		display: 'inline-block',
		width: '80%',
	},
	leftHalfInputField: {
		width: '50%',
	},
	rightHalfInputField: {
		position: 'absolute',
		width: '30%',
		left: '70%',
		top: '41%',
	},
}
// className={inputField.customInputStyle === 'rightHalfInputField'? classes.parentInputField:''}

export default injectSheet(styles)(RegisterField)
