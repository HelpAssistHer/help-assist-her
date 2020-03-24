import React from 'react'
import { Formik, Field } from 'formik'
import injectSheet from 'react-jss'

import Input from '../../components/input'
import Button from '../../components/button'
import Spacer from '../../components/spacer'

const validate = values => {
	const errors = {}

	if (!values.chcName) {
		errors.email = 'Required'
	}

	return errors
}

const CommunityHealthCenterForm = ({ classes }) => {
	return (
		<Formik
			initialValues={{ email: 'something', password: '', chcName: '' }}
			validate={validate}
			onSubmit={(values, { setSubmitting }) => {
				setTimeout(() => {
					alert(JSON.stringify(values, null, 2))
					setSubmitting(false)
				}, 400)
			}}
		>
			{({
				values,
				errors,
				touched,
				handleChange,
				handleBlur,
				handleSubmit,
				isSubmitting,
				/* and other goodies */
			}) => (
				<form className={classes.form} onSubmit={handleSubmit}>
					<div>
						<div className={classes.leftColumn}>VERIFIED</div>
						<div className={classes.rightColumn}>GENERAL INFORMATION</div>
					</div>
					<Spacer height="50px" />
					<div>
						<Field
							name="chcName"
							placeholder="Name of Community Health Center"
							type="text"
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.chcName}
							as={Input}
						/>
						{errors.email}
						<Spacer height="50px" />
					</div>
					<Button
						type="submit"
						buttonText="Save Progress"
						activeState={false}
						size="large"
						disabled={isSubmitting}
					>
						Submit!!
					</Button>
				</form>
			)}
		</Formik>
	)
}

const styles = {
	form: {
		width: '80%',
		'margin-left': '10%',
		'font-family': 'sans-serif',
		position: 'relative',
	},
	leftColumn: {
		display: 'inline-block',
		width: '20%',
		color: '#F48271',
		height: '17px',
		'font-size': '14px',
		'font-weight': 'bold',
		'line-height': '17px',
		'letter-spacing': '2.61px',
	},
	rightColumn: {
		display: 'inline-block',
		width: '80%',
		color: '#D8D8D8',
		'font-size': '20px',
		'font-weight': 'bold',
		'line-height': '24px',
		'justify-self': 'start',
		'letter-spacing': '3.73px',
	},
}

export default injectSheet(styles)(CommunityHealthCenterForm)
