import React from 'react'
import { Formik, Field } from 'formik'
import injectSheet from 'react-jss'

import { Phone, BigPhone, Tablet, Desktop } from '../components/breakpoints'
import Button from './components/button'
import Input from './components/input'
import Spacer from '../components/spacer'
import { findPregnancyResourceCentersNearMe } from './requests'

const initialValues = {
	locationInput: '',
}

const MiniAppForm = ({ classes }) => {
	return (
		<Formik
			initialValues={initialValues}
			// validate={validate}
			onSubmit={async (values, { setSubmitting }) => {
				console.log('values!!', values.locationInput)
				const response = await findPregnancyResourceCentersNearMe(
					values.locationInput,
				)
				setSubmitting(false)
				console.log('response', response)

				// if (response.ok) {
				// 	//redirect
				// }
			}}
		>
			{({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
				<form onSubmit={handleSubmit}>
					<Phone>
						<Spacer height="13px" />
					</Phone>
					<BigPhone>
						<Spacer height="13px" />
					</BigPhone>
					<Tablet>
						<Spacer height="92px" />
					</Tablet>
					<Desktop>
						<Spacer height="92px" />
					</Desktop>

					<Field
						name="locationInput"
						placeholder="Address, city, state, or zip code"
						type="text"
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.locationInput}
						as={Input}
					/>

					<Phone>
						<Spacer height="25px" />
					</Phone>
					<BigPhone>
						<Spacer height="25px" />
					</BigPhone>
					<Tablet>
						<Spacer height="93px" />
					</Tablet>
					<Desktop>
						<Spacer height="93px" />
					</Desktop>

					<div className={classes.goButtonRoot}>
						<Button
							type="submit"
							buttonText="Go"
							activeState={false}
							size="medium"
							disabled={isSubmitting}
						/>
					</div>
				</form>
			)}
		</Formik>
	)
}

const styles = {
	goButtonRoot: {
		display: 'flex',
		'justify-content': 'center',
	},
}

export default injectSheet(styles)(MiniAppForm)
