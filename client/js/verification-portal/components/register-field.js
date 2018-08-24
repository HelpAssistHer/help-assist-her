import React from 'react'
import injectSheet from 'react-jss'
import { Field } from 'redux-form'

import Input from '../../components/input'
import Toggle from '../../components/toggle'
import Spacer from '../../components/spacer'

const RegisterField = ({ classes, inputField, normalize }) => {
	return (
		<div>
			{inputField.spacer ? <Spacer height={inputField.spacer} /> : ''}
			<div className={classes.verifiedField}>
				{inputField.verify ? (
					<Field name={inputField.verify} component={Toggle} type="checkbox" />
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
