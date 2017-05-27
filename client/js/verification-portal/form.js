import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import injectSheet from 'react-jss'
import _ from 'lodash'

import Input from '../components/input'
import ServicesCheckbox from './services-checkbox'
import Spacer from '../components/spacer'
import VerifiedCheckbox from './verified-checkbox'
import services from './pregnancy-center-services'

class VerificationPortalForm extends Component {
	render() {
		const { classes, handleSubmit } = this.props

		return (
			<form onSubmit={handleSubmit}>
				<div>
					<h3>General Info</h3>
					<div className={classes.parent}>
						<Field
							label='Name'
							name='name'
							component={Input}
							type='text'
						/>
						<Field
							label='Name Verified'
							name='name-verified'
							component={VerifiedCheckbox}
						/>
					</div>

					<Field
						label='Address 1'
						name='address1'
						component={Input}
						type='text'
					/>
					<Field
						label='Address 2'
						name='address2'
						component={Input}
						type='text'
					/>
					<Field
						label='City'
						name='city'
						component={Input}
						type='text'
					/>
					<Field
						label='State'
						name='state'
						component={Input}
						type='text'
					/>

					<div className={classes.parent}>
						<Field
							label='Zip Code'
							name='zip'
							component={Input}
							type='number'
						/>
						<Field
							label='Address Verified'
							name='address-verified'
							component={VerifiedCheckbox}
						/>
					</div>

					<div className={classes.parent}>
						<Field
							label='Phone Number'
							name='phone'
							component={Input}
							type='tel'
						/>
						<Field
							label='Phone Number Verified'
							name='phone-verified'
							component={VerifiedCheckbox}
						/>
					</div>

					<div className={classes.parent}>
						<Field
							label='Website'
							name='website'
							component={Input}
							type='url'
						/>
						<Field
							label='Website Verified'
							name='website-verified'
							component={VerifiedCheckbox}
						/>
					</div>
				</div>

				<div>
					<h3>Primary Contact</h3>
					<Field
						label='First Name'
						name='primary-contact-first-name'
						component={Input}
						type='text'
					/>

					<Field
						label='Last Name'
						name='primary-contact-last-name'
						component={Input}
						type='text'
					/>

					<Field
						label='Email'
						name='primary-contact-email'
						component={Input}
						type='text'
					/>

					<div className={classes.parent}>
						<Field
							label='Phone Number'
							name='primary-contact-phone'
							component={Input}
							type='text'
						/>
						<Field
							label='Primary Contact Verified'
							name='primary-contact-verified'
							component={VerifiedCheckbox}
						/>
					</div>
				</div>

				<div>
					<h3>Services</h3>
					{
						_.map(services, service => {
							return (
								<div key={service.id}>
									<Field
										label={service.name}
										name={service.id}
										component={ServicesCheckbox}
									/>
								</div>
							)
						})
					}
					<div className={classes.parent}>
						<Field
							label='Services Verified'
							name='services-verified'
							component={VerifiedCheckbox}
						/>
					</div>
				</div>

				<div>
					<h3>Hours</h3>

					<label>Sunday Hours</label>
					<Field
						name='sunday-open'
						component={Input}
						type='time'
					/>
					<Field
						name='sunday-close'
						component={Input}
						type='time'
					/>

					<label>Monday Hours</label>
					<Field
						name='monday-open'
						component={Input}
						type='time'
					/>
					<Field
						name='monday-close'
						component={Input}
						type='time'
					/>

					<label>Tuesday Hours</label>
					<Field
						name='tuesday-open'
						component={Input}
						type='time'
					/>
					<Field
						name='tuesday-close'
						component={Input}
						type='time'
					/>

					<label>Wednesday Hours</label>
					<Field
						name='wednesday-open'
						component={Input}
						type='time'
					/>
					<Field
						name='wednesday-close'
						component={Input}
						type='time'
					/>

					<label>Thursday Hours</label>
					<Field
						name='thursday-open'
						component={Input}
						type='time'
					/>
					<Field
						name='thursday-close'
						component={Input}
						type='time'
					/>

					<label>Friday Hours</label>
					<Field
						name='friday-open'
						component={Input}
						type='time'
					/>
					<Field
						name='friday-close'
						component={Input}
						type='time'
					/>

					<label>Saturday Hours</label>
					<Field
						name='saturday-open'
						component={Input}
						type='time'
					/>
					<Field
						name='saturday-close'
						component={Input}
						type='time'
					/>
				</div>

				<div className={classes.parent}>
					<Field
						label='Hours Verified'
						name='hours-verified'
						component={VerifiedCheckbox}
					/>
				</div>

				<div>
					<h3>Notes</h3>
					<Field
						name='notes'
						component='textarea'
						rows='4'
						cols='50'
					/>
				</div>
				<Spacer height='50px'/>

				<button type="submit">Submit</button>
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
}

export default injectSheet(styles)(VerificationPortalForm)
