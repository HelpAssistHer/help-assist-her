import _ from 'lodash'
import injectSheet from 'react-jss'
import React from 'react'
import { Field, reduxForm } from 'redux-form'

import Button from './button'
import Spacer from './spacer'
import Input from './input'
import HoursInput from './hours-input'
import services from './pregnancy-center-services'

async function getOneResource() {
	try {
		const response = await fetch('http://localhost:4000/api/pregnancy-centers/verify', {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
			},
		})
		const result = await response.json()
		console.log(result)
		return result
	} catch(error) {
		// TODO is it ok to have console shtuff in client
		console.error(error)
	}
}

class VerificationPortalView extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			name: '',
			addressLine1: '',
			addressLine2: '',
			city: '',
			state: '',
			zip: '',
			phone: '',
			website: '',
			primaryContactFirstName: '',
			primaryContactLastName: '',
			primaryContactEmail: '',
			primaryContactPhone: '',
			hours: {
				open: '',
				close: '',
			},
			notes: '',
			services: [],
			otherServices: '',
		}
	}

	render() {
		return (
			<div className={this.props.classes.verificationPortal}>
				<h1>VERIFICATION PORTAL</h1>
				<h3>Type: Pregnancy Centers</h3>

				<Spacer height='20px' />
				<Button onClick={this.handleClick} buttonText='Get One Resource'/>
				<Spacer height='50px' />

				<h3>General Info</h3>
				<div className={this.props.classes.fields}>
					<Input label='Name'
						   value={ this.state.name }
						   id='name'
						   type='text'
						   onChange={this.onNameChange}
					/>
					<Input label='Address 1'
						   value={ this.state.addressLine1 }
						   id='address1'
						   type='text'
						   onChange={this.onAddress1Change}
					/>
					<Input label='Address 2'
						   value={ this.state.addressLine2 }
						   id='address2'
						   type='text'
						   onChange={this.onAddress2Change}
					/>
					<Input label='City'
						   value={ this.state.city }
						   id='city'
						   type='text'
						   onChange={this.onCityChange}
					/>
					<Input label='State'
						   value={ this.state.state }
						   id='state'
						   type='text'
						   onChange={this.onStateChange}
					/>
					<Input label='Zip Code'
						   value={ this.state.zip }
						   id='zipCode'
						   type='number'
						   onChange={this.onZipChange}
					/>
					<Input label='Phone Number'
						   value={ this.state.phone }
						   id='phone'
						   type='text'
						   onChange={this.onPhoneChange}
					/>
					<Input label='Website'
						   value={ this.state.website }
						   id='website'
						   type='url'
						   onChange={this.onWebsiteChange}
					/>
				</div>

				<div>
					<h3>Primary Contact</h3>
					<Input label='First Name'
						   value={ this.state.primaryContactFirstName }
						   id='primary_contact_first_name'
						   onChange={this.onFirstNameChange}
						   type='text'
					/>
					<Input label='Last Name'
						   value={ this.state.primaryContactLastName }
						   id='primary_contact_last_name'
						   onChange={this.onLastNameChange}
						   type='text'
					/>
					<Input label='Email'
						   value={ this.state.primaryContactEmail }
						   id='primary_contact_email'
						   onChange={this.onPrimaryContactEmailChange}
					/>
					<Input label='Phone'
						   value={ this.state.primaryContactPhone }
						   id='primary_contact_phone'
						   onChange={this.onPrimaryContactPhoneChange}
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
					<Spacer height='40px'/>
					<label>Other Services</label>
					<textarea id='other-services' rows="4" cols="50" value={ this.state.otherServices } onChange={this.onOtherServicesChange} />
				</div>

				<div>
					<h3>Hours</h3>
					<HoursInput label='Sunday' hours={ _.get(this.state.hours, '0') } />
					<HoursInput label='Monday' hours={ _.get(this.state.hours, '1') } />
					<HoursInput label='Tuesday' hours={ _.get(this.state.hours, '2') } />
					<HoursInput label='Wednesday' hours={ _.get(this.state.hours, '3') } />
					<HoursInput label='Thursday' hours={ _.get(this.state.hours, '4') } />
					<HoursInput label='Friday' hours={ _.get(this.state.hours, '5') } />
					<HoursInput label='Saturday' hours={ _.get(this.state.hours, '6') } />p
				</div>

				<div>
					<h3>Notes</h3>
					<textarea rows="4" cols="50" value={this.state.notes} onChange={this.onNotesChange} />
				</div>

				<Spacer height='50px'/>
				{/*<Button onClick={submitResource} buttonText='Save Info'/>*/}

				<Spacer height='100px'/>
			</div>
		)
	}

	onNameChange = event => {
		this.setState({
			name: event.target.value
		})
	}

	onAddress1Change = event => {
		this.setState({
			addressLine1: event.target.value
		})
	}

	onAddress2Change = event => {
		this.setState({
			addressLine2: event.target.value
		})
	}

	onCityChange = event => {
		this.setState({
			city: event.target.value
		})
	}

	onStateChange = event => {
		this.setState({
			state: event.target.value
		})
	}

	onZipChange = event => {
		this.setState({
			zip: event.target.value
		})
	}

	onPhoneChange = event => {
		this.setState({
			phone: event.target.value
		})
	}

	onWebsiteChange = event => {
		this.setState({
			website: event.target.value
		})
	}

	onFirstNameChange = event => {
		this.setState({
			primaryContactFirstName: event.target.value
		})
	}

	onLastNameChange = event => {
		this.setState({
			primaryContactLastName: event.target.value
		})
	}

	onPrimaryContactEmailChange = event => {
		this.setState({
			primaryContactEmail: event.target.value
		})
	}

	onPrimaryContactPhoneChange = event => {
		this.setState({
			primaryContactPhone: event.target.value
		})
	}

	onNotesChange = event => {
		this.setState({
			notes: event.target.value
		})
	}

	onOtherServicesChange = event => {
		this.setState({
			otherServices: event.target.value
		})
	}

	// handleSubmit: async function() {
	// 	await fetch('http://localhost:4000/api/pregnancy-centers', {
	// 		method: 'POST',
	// 		headers: {
	// 			'Accept': 'application/json',
	// 		},
	// 		body: JSON.stringify({
	// 			address: {
	// 				city: this.state.city,
	// 				line1: this.state.address1,
	// 				line2: this.state.address2,
	// 				state: this.state.state,
	// 				zip: this.state.zip,
	// 			},
	// 			dateCreated: Date.now(),
	// 			// hours: Object,
	// 			name: this.state.name, // change to prcName?
	// 			// notes: this.state.notes,
	// 			phone: this.state.phone,
	// 			primaryContact: {
	// 				firstName: this.state.primaryContactFirstName,
	// 				lastName: this.state.primaryContactLastName,
	// 				email: this.state.primaryContactEmail,
	// 				phone: this.state.primaryContactPhone,
	// 			},
	// 			// resources: [String],
	// 			website: this.state.website,
	// 		})
	// 	})
	// }

	handleClick = async () => {
		const result = await getOneResource()
		console.log('GET ONE RESOURCE', result)

		const {
			address,
			hours,
			name,
			notes,
			otherServices,
			phone,
			primaryContactUser,
			services,
			website,
		} = result

		this.setState({
			name,
			addressLine1: address.line1,
			addressLine2: address.line2,
			city: address.city,
			state: address.state,
			zip: address.zip,
			phone,
			website,
			hours,
			notes,
			otherServices,
			primaryContactFirstName: primaryContactUser.firstName,
			primaryContactLastName: primaryContactUser.lastName,
			primaryContactEmail: primaryContactUser.email,
			primaryContactPhone: primaryContactUser.phone,
			services,
		})
	}
}

const styles = {
	verificationPortal: {
		'text-align': 'center',
		'font-family': 'sans-serif',
		color: '#4A4A4A',
	},
}

export default injectSheet(styles)(VerificationPortalView)
