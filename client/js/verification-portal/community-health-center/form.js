import React from 'react'
import { Formik, Field } from 'formik'
import injectSheet from 'react-jss'

import Input from '../../components/input'
import Button from '../../components/button'
import Spacer from '../../components/spacer'

const initialValues = {
	chcName: '',
	addressLine1: '',
	addressLine2: '',
	city: '',
	state: '',
	zipCode: '',
	phoneNumber: '',
	email: '',
	website: '',
}

const validate = ({
	chcName,
	addressLine1,
	city,
	state,
	zipCode,
	phoneNumber,
	website,
}) => {
	const errors = {}

	if (!chcName) {
		errors.chcName = 'Required'
	}

	if (!addressLine1) {
		errors.addressLine1 = 'Required'
	}

	if (!city) {
		errors.city = 'Required'
	}

	if (!state) {
		errors.state = 'Required'
	}

	if (!zipCode) {
		errors.zipCode = 'Required'
	}

	if (!phoneNumber) {
		errors.phoneNumber = 'Required'
	}

	if (!website) {
		errors.website = 'Required'
	}

	return errors
}

const CommunityHealthCenterForm = ({ classes }) => {
	return (
		<Formik
			initialValues={initialValues}
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
						{errors.chcName}
						<Spacer height="55px" />

						<Field
							name="addressLine1"
							placeholder="Address 1"
							type="text"
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.addressLine1}
							as={Input}
						/>
						{errors.addressLine1}

						<Field
							name="addressLine2"
							placeholder="Address 2"
							type="text"
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.addressLine2}
							as={Input}
						/>

						<Field
							name="city"
							placeholder="City"
							type="text"
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.city}
							as={Input}
						/>
						{errors.city}

						<Field
							name="state"
							placeholder="State"
							type="text"
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.state}
							as={Input}
						/>
						{errors.state}

						<Field
							name="zipCode"
							placeholder="Zip Code"
							type="text"
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.zipCode}
							as={Input}
						/>
						{errors.zipCode}

						<Field
							name="phoneNumber"
							placeholder="Phone Number"
							type="text"
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.phoneNumber}
							as={Input}
						/>
						{errors.phoneNumber}

						<Field
							name="email"
							placeholder="Email"
							type="text"
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.email}
							as={Input}
						/>
						{errors.email}

						<Field
							name="website"
							placeholder="Website"
							type="text"
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.website}
							as={Input}
						/>
						{errors.website}
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
