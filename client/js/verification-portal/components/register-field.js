import React from 'react'
import injectSheet from 'react-jss'
import { Field, reduxForm } from 'redux-form'

import Input from '../../components/input'

const RegisterField = ({ classes, info }) => {
	return (
		<div>
			<div className={classes.verifiedField}>
				<Field
					name={`${info.name}.verified`}
					type="checkbox"
					value={info.verified}
					component={Input}
				/>
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
