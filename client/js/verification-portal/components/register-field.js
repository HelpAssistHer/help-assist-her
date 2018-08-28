import React from 'react'
import injectSheet from 'react-jss'
import { Field } from 'redux-form'
import classNames from 'classnames'

import Input from '../../components/input'
import Toggle from '../../components/toggle'
import Spacer from '../../components/spacer'

const RegisterField = ({ classes, inputField }) => {
	const { name, type, placeholder, verify, styling } = inputField
	const { normalize, spacer, customInputStyle } = styling
	const customStyle = customInputStyle ? classes[customInputStyle] : ''
	return (
		<div>
			{inputField.spacer ? <Spacer height={spacer} /> : ''}
			<div className={classes.verifiedField}>
				{verify ? (
					<Field name={verify} component={Toggle} type="checkbox" />
				) : null}
			</div>
			<div className={classNames(classes.inputField, customStyle)}>
				<Field
					component={Input}
					name={name}
					placeholder={placeholder}
					type={type ? type : 'text'}
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
