import React from 'react'
import injectSheet from 'react-jss'
import { Field } from 'redux-form'

import Input from '../../components/input'

const RegisterField = ({ classes, inputField, normalize }) => {
	return (
		<div>
			<div className={classes.verifiedField}>
				{inputField.verify ? (
					<Field name={inputField.verify} component={Input} type="checkbox" />
				) : null}
			</div>
			<div className={classes.inputField}>
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
}

export default injectSheet(styles)(RegisterField)
