import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Formik, Field } from 'formik'
import injectSheet from 'react-jss'

import { Phone, BigPhone, Tablet, Desktop } from '../components/breakpoints'
import Button from './components/button'
import Input from './components/input'
import Spacer from '../components/spacer'
import { findPregnancyResourceCentersNearMe, findChcsNearMe } from './requests'
import { addPrcsToRedux, addChcsToRedux } from './data/action-creators'

const initialValues = {
	locationInput: '',
}

const MiniAppForm = ({ classes, dispatch, history, resourceType }) => {
	return (
		<Formik
			initialValues={initialValues}
			onSubmit={async (values, { setSubmitting }) => {
				let response

				if (resourceType === 'prc') {
					response = await findPregnancyResourceCentersNearMe(
						values.locationInput,
					)
				}

				if (resourceType === 'chc') {
					response = await findChcsNearMe(values.locationInput)
				}

				setSubmitting(false)

				if (response.ok) {
					const result = await response.json()

					if (resourceType === 'prc') {
						dispatch(addPrcsToRedux(result))
					}

					if (resourceType === 'chc') {
						dispatch(addChcsToRedux(result))
					}

					history.push({
						pathname: '/mini-app/results',
						search: `?query=${resourceType}`,
					})
				}
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

const MiniAppFormWithStyle = injectSheet(styles)(MiniAppForm)

export default connect()(withRouter(MiniAppFormWithStyle))
