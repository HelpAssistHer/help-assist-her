import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import injectSheet from 'react-jss'

import Input from '../../components/input'
import Spacer from '../../components/spacer'
import VerifiedCheckbox from '../components/verified-checkbox'
import Button from '../../components/button'
import Heading from '../../components/heading'
import Day from '../components/day'
import Services from './services'

const formatPhoneDigits = digits => {
	if (!digits) {
		return ''
	}

	const phoneNumber = digits.substr(2, 10)
	const areaCode = phoneNumber.substring(0, 3)
	const prefix = phoneNumber.substring(3, 6)
	const lineNumber = phoneNumber.substring(6, 10)

	if (phoneNumber.length === 0) {
		return ''
	}

	if (phoneNumber.length < 3) {
		return phoneNumber
	}

	if (phoneNumber.length < 4) {
		return `(${areaCode})`
	}

	if (phoneNumber.length < 7) {
		return `(${areaCode})-${prefix}`
	}

	if (phoneNumber.length <= 10) {
		return `(${areaCode})-${prefix}-${lineNumber}`
	}

	throw new Error('Invalid Phone Number')
}

const parsePhoneNumber = phoneNumber => {
	//replaces every part of phone number that's not a digit with an empty string
	return '+1' + phoneNumber.replace(/([\D])/g, '').substr(0, 10)
}

class VerificationPortalForm extends Component {
	render() {
		const { classes, handleSubmit, outOfBusiness, doNotList } = this.props
		return (
			<form className={classes.form} onSubmit={handleSubmit}>
				<div
					className={
						outOfBusiness || doNotList ? classes.blockFormEditing : null
					}
				/>
				<div className={classes.formSection}>
					<div className={classes.gridField}>
						<div className={classes.firstBox}>Verified</div>
						<div className={classes.secondAndThirdBox}>
							<Heading text="GENERAL INFORMATION" />
						</div>
					</div>

					<div className={classes.gridField}>
						<div className={classes.firstBox}>
							<Field
								name="verifiedData.prcName.verified"
								component={VerifiedCheckbox}
							/>
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
							<Field
								name="verifiedData.address.verified"
								component={VerifiedCheckbox}
							/>
						</div>

						<div className={classes.secondBox}>
							<Field
								placeholder="Zip Code"
								name="address.zip"
								component={Input}
								type="number"
							/>
						</div>
					</div>

					<div className={classes.gridField}>
						<div className={classes.firstBox}>
							<Field
								name="verifiedData.phone.verified"
								component={VerifiedCheckbox}
							/>
						</div>
						<div className={classes.secondBox}>
							<Field
								name="phone"
								component={Input}
								placeholder="Phone Number"
								type="tel"
								format={formatPhoneDigits}
								parse={parsePhoneNumber}
							/>
						</div>
					</div>

					<div className={classes.gridField}>
						<div className={classes.firstBox}>
							<Field
								name="verifiedData.email.verified"
								component={VerifiedCheckbox}
							/>
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
							<Field
								name="verifiedData.website.verified"
								component={VerifiedCheckbox}
							/>
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

				<Spacer height="83px" />
				<div className={classes.formSection}>
					<Heading text="SERVICES" />
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
						<Field
							name="verifiedData.services.verified"
							component={VerifiedCheckbox}
						/>
					</div>
				</div>

				<div className={classes.formSection}>
					<Heading text="HOURS" />
					<Spacer height="50px" />

					<Day day="Sunday" name={`hours[0]`} />
					<Day day="Monday" name={`hours[1]`} />
					<Day day="Tuesday" name={`hours[2]`} />
					<Day day="Wednesday" name={`hours[3]`} />
					<Day day="Thursday" name={`hours[4]`} />
					<Day day="Friday" name={`hours[5]`} />
					<Day day="Saturday" name={`hours[6]`} />
				</div>

				<div className={classes.parent}>
					<Field
						name="verifiedData.hours.verified"
						component={VerifiedCheckbox}
					/>
				</div>

				<div className={classes.formSection}>
					<Heading text="NOTES" />
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
					/>
				</div>
			</form>
		)
	}
}

VerificationPortalForm = reduxForm({
	form: 'verificationPortal',
})(VerificationPortalForm)

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
}

export default injectSheet(styles)(VerificationPortalForm)
