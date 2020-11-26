import React from 'react'
import injectSheet from 'react-jss'
import { Field } from 'redux-form'
import classNames from 'classnames'

import Input from '../../components/input'
import Toggle from '../../components/toggle'
import Spacer from '../../components/spacer'

const RegisterField = ({ classes, inputField }) => {
	const { name, type, placeholder, verify, styling } = inputField
	const { format, spacer, customInputStyle } = styling || {}
	const customStyle = classes[customInputStyle] || ''
	return (
		<div>
			{spacer ? <Spacer height={spacer} /> : ''}
			<div className={classes.verifiedField}>
				{verify ? <Field name={verify} component={Toggle} /> : null}
			</div>
			<div className={classNames(classes.inputFields, customStyle)}>
				<Field
					component={Input}
					name={name}
					placeholder={placeholder}
					type={type || 'text'}
					format={format}
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
	inputFields: {
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

export default injectSheet(styles)(RegisterField)
