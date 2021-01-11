import React from 'react'
import { useHistory } from 'react-router-dom'
import { Formik, Field } from 'formik'
import injectSheet from 'react-jss'

import { Phone, BigPhone, Tablet, Desktop } from './Breakpoints'
import Button from './Button'
import Input from './Input'
import Spacer from './Spacer'

const initialValues = {
	locationInput: '',
}

const MiniAppForm = ({ classes, resourceType }) => {
	const history = useHistory()
	return (
		<Formik
			initialValues={initialValues}
			onSubmit={async ({ locationInput }) => {
				history.push({
					pathname: '/mini-app/results',
					search: `?${new URLSearchParams({
						type: resourceType,
						address: locationInput,
					})}`,
				})
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
