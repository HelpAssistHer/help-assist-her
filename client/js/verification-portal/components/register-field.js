import React from 'react'
import injectSheet from 'react-jss'
import { Field } from 'redux-form'

import Input from '../../components/input'

const RegisterField = ({ classes, info }) => {
	return (
		<div>
			<div className={classes.verifiedField}>
				{info.verify ? (
					<Field name={info.verify.name} component={Input} type="checkbox" />
				) : (
					''
				)}
			</div>
			<div className={classes.inputField}>
				<Field
					placeholder={info.placeholder}
					name={info.name}
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
