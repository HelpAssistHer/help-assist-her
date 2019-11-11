import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import injectSheet from 'react-jss'

import Input from '../../components/input'
import Spacer from '../../components/spacer'
import Button from '../../components/button'
import Heading from '../../components/heading'
import BusinessHours from '../components/business-hours'
import Services from './services'
import Toggle from '../../components/toggle'
import { formatPhone, formatZipcode } from '../util'
import { updateResource } from './action-creators'

class VerificationPortalFormClass extends Component {
	render() {
		const {
			classes,
			handleSubmit,
			outOfBusiness,
			doNotList,
			submitting,
		} = this.props

		return (
			<form className={classes.form}>
				<div
					className={
						outOfBusiness || doNotList ? classes.blockFormEditing : null
					}
				/>
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
							<Field name="verifiedData.prcName.verified" component={Toggle} />
						</div>
						<div className={classes.secondAndThirdBox}>
							<Field
								placeholder="Name of Pregnancy Resource Center"
								name="prcName"
								component={Input}
								type="text"
							/>
						</div>
					</div>
					<Spacer height="64px" />

					<div className={classes.gridField}>
						<div className={classes.secondAndThirdBox}>
							<Field
								placeholder="Address 1"
								name="address.line1"
								component={Input}
								type="text"
							/>
						</div>
						<div className={classes.secondAndThirdBox}>
							<Field
								placeholder="Address 2"
								name="address.line2"
								component={Input}
								type="text"
							/>
						</div>
						<div className={classes.secondBox}>
							<Field
								placeholder="City"
								name="address.city"
								component={Input}
								type="text"
							/>
						</div>
						<div className={classes.thirdBox}>
							<Field
								placeholder="State"
								name="address.state"
								component={Input}
								type="text"
							/>
						</div>
					</div>

					<div className={classes.gridField}>
						<div className={classes.firstBox}>
							<Field name="verifiedData.address.verified" component={Toggle} />
						</div>

						<div className={classes.secondBox}>
							<Field
								placeholder="Zip Code"
								name="address.zip"
								component={Input}
								type="number"
								format={formatZipcode}
							/>
						</div>
					</div>
					<Spacer height="66px" />

					<div className={classes.gridField}>
						<div className={classes.firstBox}>
							<Field name="verifiedData.phone.verified" component={Toggle} />
						</div>
						<div className={classes.secondBox}>
							<Field
								name="phone"
								component={Input}
								placeholder="Phone Number"
								type="tel"
								format={formatPhone}
							/>
						</div>
					</div>

					<div className={classes.gridField}>
						<div className={classes.firstBox}>
							<Field
								name="verifiedData.hotlinePhoneNumber.verified"
								component={Toggle}
							/>
						</div>
						<div className={classes.secondBox}>
							<Field
								name="hotlinePhoneNumber"
								component={Input}
								placeholder="Hotline Phone Number"
								type="tel"
								format={formatPhone}
							/>
						</div>
					</div>

					<div className={classes.gridField}>
						<div className={classes.firstBox}>
							<Field name="verifiedData.email.verified" component={Toggle} />
						</div>
						<div className={classes.secondBox}>
							<Field
								placeholder="Email"
								name="email"
								component={Input}
								type="text"
							/>
						</div>
					</div>

					<div className={classes.gridField}>
						<div className={classes.firstBox}>
							<Field name="verifiedData.website.verified" component={Toggle} />
						</div>
						<div className={classes.secondBox}>
							<Field
								placeholder="Website"
								name="website"
								component={Input}
								type="url"
							/>
						</div>
					</div>

					{/* 5-12-18, I am commenting this out for now, as we want to keep the
				data verification simple for now. We will eventually add this back. */}
					{/*<div>*/}
					{/*<h3>Primary Contact</h3>*/}
					{/*<Field*/}
					{/*label='First Name'*/}
					{/*name='primaryContactPerson.firstName'*/}
					{/*component={Input}*/}
					{/*type='text'*/}
					{/*/>*/}

					{/*<Field*/}
					{/*label='Last Name'*/}
					{/*name='primaryContactPerson.lastName'*/}
					{/*component={Input}*/}
					{/*type='text'*/}
					{/*/>*/}

					{/*<Field*/}
					{/*label='Email'*/}
					{/*name='primaryContactPerson.email'*/}
					{/*component={Input}*/}
					{/*type='text'*/}
					{/*/>*/}

					{/*<div className={classes.parent}>*/}
					{/*<Field*/}
					{/*label='Phone Number'*/}
					{/*name='primaryContactPerson.phone'*/}
					{/*placeholder='Format must be +19998887777'*/}
					{/*component={Input}*/}
					{/*type='text'*/}
					{/*/>*/}
					{/*<Field*/}
					{/*label='Primary Contact Verified'*/}
					{/*name='verifiedData.primaryContactPerson.verified'*/}
					{/*component={VerifiedCheckbox}*/}
					{/*/>*/}
					{/*</div>*/}
					{/*</div>*/}

					<Spacer height="81px" />

					<div className={classes.gridField}>
						<div className={classes.headingGrid}>
							<Heading text="SERVICES" size="medium" />
						</div>
					</div>
					<Spacer height="53px" />
					<Services />
				</div>

				<div className={classes.formSection}>
					<div>
						<Field
							name="otherServices"
							component="textarea"
							placeholder="Add additional services not listed above here..."
							rows="4"
							cols="50"
						/>
					</div>
					<div className={classes.parent}>
						<Field name="verifiedData.services.verified" component={Toggle} />
					</div>
				</div>

				<div className={classes.formSection}>
					<Heading text="HOURS" size="medium" />
					<Spacer height="50px" />
					<BusinessHours />
				</div>

				<div className={classes.parent}>
					<Field name="verifiedData.hours.verified" component={Toggle} />
				</div>

				<div className={classes.formSection}>
					<Heading text="NOTES" size="medium" />
					<Spacer height="50px" />
					<Field name="notes" component="textarea" rows="4" cols="50" />
				</div>

				<div className={classes.formSection}>
					<Spacer height="50px" />
					<Button
						type="submit"
						buttonText="Save Progress"
						activeState={false}
						size="large"
						disabled={submitting}
						onClick={handleSubmit(formData => updateResource(formData))}
					/>
				</div>
			</form>
		)
	}
}

const VerificationPortalForm = reduxForm({
	form: 'verificationPortal',
})(VerificationPortalFormClass)

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

export default injectSheet(styles)(VerificationPortalForm)
