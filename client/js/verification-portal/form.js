import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import injectSheet from 'react-jss'
import _ from 'lodash'

import Input from '../components/input'
import MapContainer from './google-maps-container'
import ServicesCheckbox from './services-checkbox'
import Spacer from '../components/spacer'
import VerifiedCheckbox from './verified-checkbox'
import services from '../../../server/pregnancy-centers/pregnancy-center-services'
import { store } from '../hah-app/index'

class VerificationPortalForm extends Component {
	render() {
		const { classes, handleSubmit, pristine, reset, submitting } = this.props

		return (
			<form className={classes.root} onSubmit={handleSubmit}>
				<div>
					<h3>General Info</h3>
					<div className={classes.parent}>
						<Field
							label='PRC Name'
							name='prcName'
							component={Input}
							type='text'
						/>
						<Field
							label='Name Verified'
							name='verifiedData.prcName.verified'
							component={VerifiedCheckbox}
						/>
					</div>

					<Field
						label='Address 1'
						name='address.line1'
						component={Input}
						type='text'
					/>
					<Field
						label='Address 2'
						name='address.line2'
						component={Input}
						type='text'
					/>
					<Field
						label='City'
						name='address.city'
						component={Input}
						type='text'
					/>
					<Field
						label='State'
						name='address.state'
						component={Input}
						type='text'
					/>

					<div className={classes.parent}>
						<Field
							label='Zip Code'
							name='address.zip'
							component={Input}
							type='number'
						/>
						<Field
							label='Address Verified'
							name='verifiedData.address.verified'
							component={VerifiedCheckbox}
						/>
					</div>

					<div className={classes.parent}>
						<Field
							label='Phone Number'
							name='phone'
							component={Input}
							placeholder='Format must be +19998887777'
							type='tel'
						/>
						<Field
							label='Phone Number Verified'
							name='verifiedData.phone.verified'
							component={VerifiedCheckbox}
						/>
					</div>

					<div className={classes.parent}>
						<Field
							label='Email'
							name='email'
							component={Input}
							type='text'
						/>
						<Field
							label='Email Verified'
							name='verifiedData.email.verified'
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
							name='verifiedData.website.verified'
							component={VerifiedCheckbox}
						/>
					</div>
				</div>

				<div>
					<h3>Location on Map</h3>
					<div className={classes.map}>
						<MapContainer resource={store.getState().resource} />
					</div>
				</div>

				<div>
					<h3>Primary Contact</h3>
					<Field
						label='First Name'
						name='primaryContactPerson.firstName'
						component={Input}
						type='text'
					/>

					<Field
						label='Last Name'
						name='primaryContactPerson.lastName'
						component={Input}
						type='text'
					/>

					<Field
						label='Email'
						name='primaryContactPerson.email'
						component={Input}
						type='text'
					/>

					<div className={classes.parent}>
						<Field
							label='Phone Number'
							name='primaryContactPerson.phone'
							placeholder='Format must be +19998887777'
							component={Input}
							type='text'
						/>
						<Field
							label='Primary Contact Verified'
							name='verifiedData.primaryContactPerson.verified'
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
										name={`services.${service.id}`}
										component={ServicesCheckbox}
									/>
								</div>
							)
						})
					}
					<Field
						name='otherServices'
						component='textarea'
						placeholder='List other services here...'
						rows='4'
						cols='50'
					/>
					<div className={classes.parent}>
						<Field
							label='Services Verified'
							name='verifiedData.services.verified'
							component={VerifiedCheckbox}
						/>
					</div>
				</div>

				<div>
					<h3>Hours</h3>

					<label>Sunday Hours</label>
					<Field
						name='hours[0].open'
						component={Input}
						type='time'
					/>
					<Field
						name='hours[0].close'
						component={Input}
						type='time'
					/>

					<label>Monday Hours</label>
					<Field
						name='hours[1].open'
						component={Input}
						type='time'
					/>
					<Field
						name='hours[1].close'
						component={Input}
						type='time'
					/>

					<label>Tuesday Hours</label>
					<Field
						name='hours[2].open'
						component={Input}
						type='time'
					/>
					<Field
						name='hours[2].close'
						component={Input}
						type='time'
					/>

					<label>Wednesday Hours</label>
					<Field
						name='hours[3].open'
						component={Input}
						type='time'
					/>
					<Field
						name='hours[3].close'
						component={Input}
						type='time'
					/>

					<label>Thursday Hours</label>
					<Field
						name='hours[4].open'
						component={Input}
						type='time'
					/>
					<Field
						name='hours[4].close'
						component={Input}
						type='time'
					/>

					<label>Friday Hours</label>
					<Field
						name='hours[5].open'
						component={Input}
						type='time'
					/>
					<Field
						name='hours[5].close'
						component={Input}
						type='time'
					/>

					<label>Saturday Hours</label>
					<Field
						name='hours[6].open'
						component={Input}
						type='time'
					/>
					<Field
						name='hours[6].close'
						component={Input}
						type='time'
					/>
				</div>

				<div className={classes.parent}>
					<Field
						label='Hours Verified'
						name='verifiedData.hours.verified'
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
				<button type="button" disabled={pristine || submitting} onClick={reset}>
					Clear Values
				</button>
			</form>
		)
	}
}

VerificationPortalForm = reduxForm({
	form: 'verificationPortal',
})(VerificationPortalForm)

const styles = {
	root: {
		display: 'flex',
		'flex-direction': 'column',
	},
	parent: {
		display: 'flex',
		'align-items': 'baseline',
	},
	map: {
		height: '500px',
		width: '500px',
	},
}

export default injectSheet(styles)(VerificationPortalForm)
