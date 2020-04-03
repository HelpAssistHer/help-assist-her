import React from 'react'
import { Formik, Field } from 'formik'
import injectSheet from 'react-jss'

import Input from '../../components/input'
import Button from '../../components/button'
import Spacer from '../../components/spacer'
import Heading from '../../components/heading'
import ToggleFormik from '../../components/toggle-formik'
import { addNewCommunityHealthCenter } from './requests'

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
	verifiedData: {
		chcName: {
			verified: false,
		},
		address: {
			verified: false,
		},
		phone: {
			verified: false,
		},
		email: {
			verified: false,
		},
		website: {
			verified: false,
		},
	},
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

const onSubmit = async (values, { setSubmitting }) => {
	const result = await addNewCommunityHealthCenter(values)
	console.log('result', result)
	setSubmitting(false)
}

const CommunityHealthCenterForm = ({ classes }) => {
	return (
		<Formik
			initialValues={initialValues}
			validate={validate}
			onSubmit={onSubmit}
		>
			{({
				values,
				errors,
				touched,
				handleChange,
				handleBlur,
				handleSubmit,
				isSubmitting,
			}) => (
				<form className={classes.form} onSubmit={handleSubmit}>
					<div className={classes.formSection}>
						<div className={classes.gridField}>
							<div className={classes.firstBox}>
								<Heading text="VERIFIED" size="small" />
							</div>
							<div className={classes.headingGrid}>
								<Heading text="GENERAL INFORMATION" size="medium" />
							</div>
						</div>
						<Spacer height="55px" />

						<div className={classes.gridField}>
							<div className={classes.firstBox}>
								<ToggleFormik name="verifiedData.chcName.verified" />
							</div>

							<div className={classes.secondAndThirdBox}>
								<Field
									name="chcName"
									placeholder="Name of Community Health Center"
									type="text"
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.chcName}
									as={Input}
								/>
								{errors.chcName && touched.chcName && errors.chcName}
							</div>
						</div>

						<Spacer height="64px" />

						<div className={classes.gridField}>
							<div className={classes.secondAndThirdBox}>
								<Field
									name="addressLine1"
									placeholder="Address 1"
									type="text"
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.addressLine1}
									as={Input}
								/>
								{errors.addressLine1 &&
									touched.addressLine1 &&
									errors.addressLine1}
							</div>

							<div className={classes.secondAndThirdBox}>
								<Field
									name="addressLine2"
									placeholder="Address 2"
									type="text"
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.addressLine2}
									as={Input}
								/>
							</div>

							<div className={classes.secondBox}>
								<Field
									name="city"
									placeholder="City"
									type="text"
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.city}
									as={Input}
								/>
								{errors.city && touched.city && errors.city}
							</div>

							<div className={classes.thirdBox}>
								<Field
									name="state"
									placeholder="State"
									type="text"
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.state}
									as={Input}
								/>
								{errors.state && touched.state && errors.state}
							</div>
						</div>

						<div className={classes.gridField}>
							<div className={classes.firstBox}>
								<ToggleFormik name="verifiedData.address.verified" />
							</div>

							<div className={classes.secondBox}>
								<Field
									name="zipCode"
									placeholder="Zip Code"
									type="text"
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.zipCode}
									as={Input}
								/>
								{errors.zipCode && touched.zipCode && errors.zipCode}
							</div>
						</div>
						<Spacer height="66px" />

						<div className={classes.gridField}>
							<div className={classes.firstBox}>
								<ToggleFormik name="verifiedData.phone.verified" />
							</div>

							<div className={classes.secondBox}>
								<Field
									name="phoneNumber"
									placeholder="Phone Number"
									type="text"
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.phoneNumber}
									as={Input}
								/>
								{errors.phoneNumber &&
									touched.phoneNumber &&
									errors.phoneNumber}
							</div>
						</div>

						<div className={classes.gridField}>
							<div className={classes.firstBox}>
								<ToggleFormik name="verifiedData.email.verified" />
							</div>

							<div className={classes.secondBox}>
								<Field
									name="email"
									placeholder="Email"
									type="email"
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.email}
									as={Input}
								/>
								{errors.email && touched.email && errors.email}
							</div>
						</div>

						<div className={classes.gridField}>
							<div className={classes.firstBox}>
								<ToggleFormik name="verifiedData.website.verified" />
							</div>

							<div className={classes.secondBox}>
								<Field
									name="website"
									placeholder="Website (format is https://www.google.com)"
									type="url"
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.website}
									as={Input}
								/>
								{errors.website && touched.website && errors.website}
							</div>
						</div>

						<Spacer height="81px" />
					</div>

					<div className={classes.formSection}>
						<div className={classes.gridField}>
							<div className={classes.secondBox}>
								<Heading text="NOTES" size="medium" />
								<Spacer height="50px" />
								<Field name="notes" component="textarea" rows="4" cols="50" />

								<Spacer height="50px" />
								<Button
									type="submit"
									buttonText="Add New CHC"
									activeState={false}
									size="large"
									disabled={isSubmitting}
								/>
							</div>
						</div>
					</div>
				</form>
			)}
		</Formik>
	)
}

const styles = {
	parent: {
		display: 'flex',
		'align-items': 'baseline',
	},
	form: {
		position: 'relative',
		display: 'flex',
		'flex-direction': 'column',
		'align-items': 'baseline',
		'justify-content': 'space-evenly',
		margin: '0px 100px 50px 0px',
	},
	formSection: {
		width: '100%',
	},
	blockFormEditing: {
		'background-color': 'rgba(242,130,116,0.3)',
		width: '104%',
		height: '100%',
		'z-index': '1',
		display: 'block',
		position: 'absolute',
		top: '1%',
		left: '-2%',
	},
	gridField: {
		display: 'grid',
		'grid-template-columns': '20% 50% 30%',
	},
	firstBox: {
		'grid-column-start': 1,
		'grid-column-end': 2,
		'justify-self': 'center',
		'align-self': 'center',
	},
	secondBox: {
		'grid-column-start': 2,
		'grid-column-end': 3,
	},
	thirdBox: {
		'grid-column-start': 3,
		'grid-column-end': 4,
	},
	secondAndThirdBox: {
		'grid-column-start': 2,
		'grid-column-end': 4,
	},
	headingGrid: {
		'grid-column-start': 2,
		'grid-column-end': 3,
		'justify-self': 'start',
	},
}

export default injectSheet(styles)(CommunityHealthCenterForm)
