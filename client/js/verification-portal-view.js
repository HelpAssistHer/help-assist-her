'use strict'

import React from 'react'
import injectSheet from 'react-jss'

import Button from './button'
import Spacer from './spacer'

const VerificationPortalView = ({ classes, info, getResourceClick, submitResource }) => (
	<div className={classes.verificationPortal}>
		<h1>VERIFICATION PORTAL</h1>
		<Button
			onClick={() => {
				window.location.href = 'http://localhost:4000/auth/facebook'
			}}
			buttonText='(icon) Sign In with Facebook'
		/>
		<h3>Type: Pregnancy Centers</h3>
		{console.log(info)}

		<Spacer height='20px' />
		<Button onClick={getResourceClick} buttonText='Get One Resource'/>

		<Spacer height='50px' />
		<div className={classes.fields}>
			<input type='text' placeholder='Name' value={ info.name }/>
			<input type='text' placeholder='Address 1' value={ info.address1 }/>
			<input type='text' placeholder='Address 2' value={ info.address2 }/>
			<input type='text' placeholder='City' value={ info.city }/>
			<input type='text' placeholder='State' value={ info.state }/>
			<input type='text' placeholder='Zip Code' value={ info.zipCode }/>
			<input type='text' placeholder='Phone Number' value={ info.phone }/>
			<input type='text' placeholder='Website' value={ info.website }/>
		</div>
		{/*<div>*/}
		{/*<h3>Primary Contact Info</h3>*/}
		{/*<input type='text' placeholder='First Name' value={ this.state.primaryContactFirstName } />*/}
		{/*<input type='text' placeholder='Last Name' value={ this.state.primaryContactLastName } />*/}
		{/*<input type='text' placeholder='Email Address' value={ this.state.primaryContactEmail } />*/}
		{/*<input type='text' placeholder='Phone' value={ this.state.primaryContactPhone } />*/}
		{/*</div>*/}

		<Button onClick={submitResource} buttonText='Save Info'/>
	</div>
)

const styles = {
	verificationPortal: {
		'text-align': 'center',
		'font-family': 'sans-serif',
		color: '#4A4A4A',
	},
	fields: {
		/* Input / Text: */
		/* Address 1: */
		// font-family: AvenirNext-Regular;
		// font-size: 14px;
		// color: #4A4A4A;
	},
}

export default injectSheet(styles)(VerificationPortalView)
