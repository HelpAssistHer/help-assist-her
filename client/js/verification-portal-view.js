'use strict'

import React from 'react'
import injectSheet from 'react-jss'

import Button from './button'

const VerificationPortalView = ({ classes, info, getResourceClick, submitResource }) => (
	<div className={classes.verificationPortal}>
		<h1>Verification Portal</h1>
		{console.log(info)}

		<div className='generalInfoForm'>
			<Button onClick={getResourceClick} buttonText='Get One Resource'/>

			<div>
				<h1>General Info</h1>
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
	</div>
)

const styles = {
	verificationPortal: {
		background: 'pink',
	},
	label: {
		fontWeight: 'bold',
	},
	h1: {
		fontWeight: 'bold',
		color: 'blue',
	}
}

export default injectSheet(styles)(VerificationPortalView)
