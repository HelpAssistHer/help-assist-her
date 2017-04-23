import React from 'react'
import injectSheet from 'react-jss'

import Button from './button'
import Spacer from './spacer'
import Input from './input'

const VerificationPortalView = ({ classes, info, getResourceClick, submitResource }) => (
	<div className={classes.verificationPortal}>
		<h1>VERIFICATION PORTAL</h1>
		<h3>Type: Pregnancy Centers</h3>
		{console.log(info)}

		<Spacer height='20px' />
		<Button onClick={getResourceClick} buttonText='Get One Resource'/>
		<Spacer height='50px' />

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

		<Button onClick={submitResource} buttonText='Save Info'/>
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
