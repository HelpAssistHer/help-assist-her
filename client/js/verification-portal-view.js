import _ from 'lodash'
import React from 'react'
import injectSheet from 'react-jss'

import Button from './button'
import Spacer from './spacer'
import Input from './input'
import HoursInput from './hours-input'
import services from './pregnancy-center-services'

const VerificationPortalView = ({ classes, info, getResourceClick, submitResource }) => (
	<div className={classes.verificationPortal}>
		<h1>VERIFICATION PORTAL</h1>
		<h3>Type: Pregnancy Centers</h3>
		{console.log(info)}

		<Spacer height='20px' />
		<Button onClick={getResourceClick} buttonText='Get One Resource'/>
		<Spacer height='50px' />

		<h3>General Info</h3>
		<div className={classes.fields}>
			<Input label='Name'
				   value={ info.name }
				   id='name'
			/>
			<Input label='Address 1'
				   value={ info.address1 }
				   id='address1'
			/>
			<Input label='Address 2'
				   value={ info.address2 }
				   id='address2'
			/>
			<Input label='City'
				   value={ info.city }
				   id='city'
			/>
			<Input label='State'
				   value={ info.state }
				   id='state'
			/>
			<Input label='Zip Code'
				   value={ info.zipCode }
				   id='zipCode'
			/>
			<Input label='Phone Number'
				   value={ info.phone }
				   id='phone'
			/>
			<Input label='Website'
				   value={ info.website }
				   id='website'
			/>
		</div>

		<div>
			<h3>Primary Contact</h3>
			<Input label='First Name'
				   value={ info.primaryContactFirstName }
				   id='primary_contact_first_name'
			/>
			<Input label='Last Name'
				   value={ info.primaryContactLastName }
				   id='primary_contact_last_name'
			/>
			<Input label='Email'
				   value={ info.primaryContactEmail }
				   id='primary_contact_email'
			/>
			<Input label='Phone'
				   value={ info.primaryContactPhone }
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
			<HoursInput label='Sunday' />
			<HoursInput label='Monday' />
			<HoursInput label='Tuesday' />
			<HoursInput label='Wednesday' />
			<HoursInput label='Thursday' />
			<HoursInput label='Friday' />
			<HoursInput label='Saturday' />
		</div>

		<div>
			<h3>Notes</h3>
			<textarea rows="4" cols="50" />
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
