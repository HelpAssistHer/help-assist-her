import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import injectSheet from 'react-jss'

import Input from '../components/input'
import Spacer from '../components/spacer'
import VerifiedCheckbox from './verified-checkbox'
import Button from '../components/button'
import Heading from '../components/heading'
import Services from './components/services'

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
		const { classes, handleSubmit, outOfBusiness } = this.props

		return (
			<form className={classes.form} onSubmit={handleSubmit}>
				<div className={outOfBusiness ? classes.blockFormEditing : null} />
				<div className={classes.formSection}>
					<Heading text="GENERAL INFORMATION" />
					<div className={classes.parent}>
						<Field
							placeholder="Name of Pregnancy Resource Center"
							name="prcName"
							component={Input}
							type="text"
						/>
						<Field
							label="Name Verified"
							name="verifiedData.prcName.verified"
							component={VerifiedCheckbox}
						/>
					</div>

					<Field
						placeholder="Address 1"
						name="address.line1"
						component={Input}
						type="text"
					/>
					<Field
						placeholder="Address 2"
						name="address.line2"
						component={Input}
						type="text"
					/>
					<Field
						placeholder="City"
						name="address.city"
						component={Input}
						type="text"
					/>
					<Field
						placeholder="State"
						name="address.state"
						component={Input}
						type="text"
					/>

					<div className={classes.parent}>
						<Field
							placeholder="Zip Code"
							name="address.zip"
							component={Input}
							type="number"
						/>
						<Field
							label="Address Verified"
							name="verifiedData.address.verified"
							component={VerifiedCheckbox}
						/>
					</div>

					<div className={classes.parent}>
						<Field
							name="phone"
							component={Input}
							placeholder="Phone Number"
							type="tel"
							format={formatPhoneDigits}
							parse={parsePhoneNumber}
						/>
						<Field
							label="Phone Number Verified"
							name="verifiedData.phone.verified"
							component={VerifiedCheckbox}
						/>
					</div>

					<div className={classes.parent}>
						<Field
							placeholder="Email"
							name="email"
							component={Input}
							type="text"
						/>
						<Field
							label="Email Verified"
							name="verifiedData.email.verified"
							component={VerifiedCheckbox}
						/>
					</div>

					<div className={classes.parent}>
						<Field
							placeholder="Website"
							name="website"
							component={Input}
							type="url"
						/>
						<Field
							label="Website Verified"
							name="verifiedData.website.verified"
							component={VerifiedCheckbox}
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

				<Spacer height="83px" />
				<div className={classes.formSection}>
					<Heading text="SERVICES" />
					<Spacer height="53px" />
					<Services />
				</div>

				<Spacer height="100px" />
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
							label="Services Verified"
							name="verifiedData.services.verified"
							component={VerifiedCheckbox}
						/>
					</div>
				</div>

				<div className={classes.formSection}>
					<Heading text="HOURS" />
					<Spacer height="50px" />
					<label>Sunday Hours</label>
					<Field name="hours[0].open" component={Input} type="time" />
					<Field name="hours[0].close" component={Input} type="time" />

					<label>Monday Hours</label>
					<Field name="hours[1].open" component={Input} type="time" />
					<Field name="hours[1].close" component={Input} type="time" />

					<label>Tuesday Hours</label>
					<Field name="hours[2].open" component={Input} type="time" />
					<Field name="hours[2].close" component={Input} type="time" />

					<label>Wednesday Hours</label>
					<Field name="hours[3].open" component={Input} type="time" />
					<Field name="hours[3].close" component={Input} type="time" />

					<label>Thursday Hours</label>
					<Field name="hours[4].open" component={Input} type="time" />
					<Field name="hours[4].close" component={Input} type="time" />

					<label>Friday Hours</label>
					<Field name="hours[5].open" component={Input} type="time" />
					<Field name="hours[5].close" component={Input} type="time" />

					<label>Saturday Hours</label>
					<Field name="hours[6].open" component={Input} type="time" />
					<Field name="hours[6].close" component={Input} type="time" />
				</div>

				<div className={classes.parent}>
					<Field
						label="Hours Verified"
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
}

export default injectSheet(styles)(VerificationPortalForm)
