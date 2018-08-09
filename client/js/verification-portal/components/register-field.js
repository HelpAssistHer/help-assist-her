import React from 'react'
import injectSheet from 'react-jss'
import { Field } from 'redux-form'

import Input from '../../components/input'

const RegisterField = ({ classes, inputField }) => {
	return (
		<div>
			<div className={classes.verifiedField}>
				{inputField.verify ? (
					<Field
						name={inputField.verify.name}
						component={Input}
						type="checkbox"
					/>
				) : null}
			</div>
			<div className={classes.inputField}>
				<Field
					placeholder={inputField.placeholder}
					name={inputField.name}
					component={Input}
					type="text"
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
