import _ from 'lodash'
import React from 'react'
import injectSheet from 'react-jss'

import Button from './button'
import Spacer from './spacer'
import Input from './input'
import HoursInput from './hours-input'
import services from './pregnancy-center-services'

const VerificationPortalView = ({ classes, data, getResourceClick, submitResource }) => (
	<div className={classes.verificationPortal}>
		<h1>VERIFICATION PORTAL</h1>
		<h3>Type: Pregnancy Centers</h3>
		{console.log(data)}

		<Spacer height='20px' />
		<Button onClick={getResourceClick} buttonText='Get One Resource'/>
		<Spacer height='50px' />

		<h3>General Info</h3>
		<div className={classes.fields}>
			<Input label='Name'
				   value={ data.name }
				   id='name'
			/>
			<Input label='Address 1'
				   value={ data.address.line1 }
				   id='address1'
			/>
			<Input label='Address 2'
				   value={ data.address.line2 }
				   id='address2'
			/>
			<Input label='City'
				   value={ data.address.city }
				   id='city'
			/>
			<Input label='State'
				   value={ data.address.state }
				   id='state'
			/>
			<Input label='Zip Code'
				   value={ data.address.zip }
				   id='zipCode'
			/>
			<Input label='Phone Number'
				   value={ data.phone }
				   id='phone'
			/>
			<Input label='Website'
				   value={ data.website }
				   id='website'
			/>
		</div>

		<div>
			<h3>Primary Contact</h3>
			<Input label='First Name'
				   // value={ data.primaryContact.firstName }
				   id='primary_contact_first_name'
			/>
			<Input label='Last Name'
				   // value={ data.primaryContact.lastName }
				   id='primary_contact_last_name'
			/>
			<Input label='Email'
				   // value={ data.primaryContact.email }
				   id='primary_contact_email'
			/>
			<Input label='Phone'
				   // value={ data.primaryContact.phone }
				   id='primary_contact_phone'
			/>
		</div>

		<div>
			<h3>Services</h3>
			{
				_.map(services, service => {
					return (
						<div key={service.id}>
							<input type='checkbox' id={service.id} />
							<label>{service.name}</label>
						</div>
					)
				})
			}
			<textarea rows="4" cols="50" />
		</div>

		<div>
			<h3>Hours</h3>
			<HoursInput label='Sunday' hours={data.hours[0]} />
			<HoursInput label='Monday' hours={data.hours[1]} />
			<HoursInput label='Tuesday' hours={data.hours[2]} />
			<HoursInput label='Wednesday' hours={data.hours[3]} />
			<HoursInput label='Thursday' hours={data.hours[4]} />
			<HoursInput label='Friday' hours={data.hours[5]} />
			<HoursInput label='Saturday' hours={data.hours[6]} />
		</div>

		<div>
			<h3>Notes</h3>
			<textarea rows="4" cols="50" value={data.notes} />
		</div>

		<Spacer height='50px'/>
		<Button onClick={submitResource} buttonText='Save Info'/>

		<Spacer height='100px'/>
	</div>
)

const styles = {
	verificationPortal: {
		'text-align': 'center',
		'font-family': 'sans-serif',
		color: '#4A4A4A',
	},
}

export default injectSheet(styles)(VerificationPortalView)
