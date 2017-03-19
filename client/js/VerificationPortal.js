'use strict'

import 'babel-polyfill'
import React from 'react'
import ResourceButton from './ResourceButton'

class GeneralForm extends React.Component {
	constructor(props) {
		super(props)
		this.state = { value: '' }

		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleChange(event) {
		console.log('EVENT', event.target.value)
		this.setState({ value: event.target.value })
	}

	handleSubmit(event) {
		alert('Something was submitted: ' + this.state.value)
		event.preventDefault()
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<h1>General Info</h1>
				<label>
					Name:
					<input type='text' placeholder='Name' value={this.state.value} onChange={this.handleChange} />
				</label>
				<input type='submit' value='Submit' />
			</form>
		)
	}
}

const GeneralInfoForm = React.createClass({
	getInitialState() {
		return {
			name: '',
			address1: '',
			address2: '',
			city: '',
			state: '',
			zipCode: '',
			phone: '',
			website: '',
			primaryContactFirstName: '',
			primaryContactLastName: '',
			primaryContactEmail: '',
			primaryContactPhone: '', // is this even needed? It will probs just be blank
		}
	},
	handleSubmit: async function() {
		await fetch('http://localhost:4000/api/pregnancy-centers', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				address: {
					city: this.state.city,
					line1: this.state.address1,
					line2: this.state.address2,
					state: this.state.state,
					zip: this.state.zip,
				},
				dateCreated: Date.now(),
				// hours: Object,
				name: this.state.name, // change to prcName?
				// notes: this.state.notes,
				phone: this.state.phone,
				primaryContact: {
					firstName: this.state.primaryContactFirstName,
					lastName: this.state.primaryContactLastName,
					email: this.state.primaryContactEmail,
					phone: this.state.primaryContactPhone,
				},
				// resources: [String],
				website: this.state.website,
			})
		})
	},
	handleClick: async function() {
		const result = await getOneResource()
		console.log('RESULT', result)
		const { city, line1, line2, state, zip } = result.address
		const { name, notes, phone, website } = result
		const { firstName, lastName, email } = result.primaryContact

		this.setState({
			name,
			address1: line1,
			address2: line2,
			city,
			state,
			zip,
			phone,
			website,
			notes,
			primaryContactFirstName: firstName,
			primaryContactLastName: lastName,
			primaryContactEmail: email,
			primaryContactPhone: result.primaryContact.phone, // how can you rename after destructuring
		})
	},
	render() {
		return (
			<div className='generalInfoForm'>
				<button onClick={this.handleClick}>
					Verify Something Test
				</button>

				<div>
					<h1>General Info</h1>
					<input type='text' placeholder='Name' value={ this.state.name } />
					<input type='text' placeholder='Address 1' value={ this.state.address1 } />
					<input type='text' placeholder='Address 2' value={ this.state.address2 } />
					<input type='text' placeholder='City' value={ this.state.city } />
					<input type='text' placeholder='State' value={ this.state.state } />
					<input type='text' placeholder='Zip Code' value={ this.state.zipCode } />
					<input type='text' placeholder='Phone Number' value={ this.state.phone } />
					<input type='text' placeholder='Website' value={ this.state.website } />
				</div>
				<div>
					<h3>Primary Contact Info</h3>
					<input type='text' placeholder='First Name' value={ this.state.primaryContactFirstName } />
					<input type='text' placeholder='Last Name' value={ this.state.primaryContactLastName } />
					<input type='text' placeholder='Email Address' value={ this.state.primaryContactEmail } />
					<input type='text' placeholder='Phone' value={ this.state.primaryContactPhone } />
				</div>

				<button onClick={this.handleSubmit}>
					SAVE
				</button>
			</div>
		)
	}
})

const ServicesOfferedForm = React.createClass({
	render() {
		return (
			<div className='servicesOfferedForm'>
				<h1>Services Offered</h1>
			</div>
		)
	}
})

const HoursForm = React.createClass({
	render() {
		return (
			<div className='hoursForm'>
				<h1>Hours</h1>
			</div>
		)
	}
})

// 'https://mywebsite.com/endpoint/', {
// 	method: 'POST',
// 	headers: {
// 		'Accept': 'application/json',
// 		'Content-Type': 'application/json',
// 	},
// 	body: JSON.stringify({
// 		firstParam: 'yourValue',
// 		secondParam: 'yourOtherValue',
// 	})
// }

async function getOneResource() {
	try {
		const response = await fetch('http://localhost:4000/api/pregnancy-centers/verify', {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Access-Control-Allow-Origin': '*',
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

const VerificationPortal = React.createClass({
	render () {
		return (
			<div className='verificationPortal'>
				<h1>Verification Portal</h1>

				{/*TODO this works but is probably baddddd*/}
				{/*<button onClick={getOneResource}>*/}
					{/*Verify Something*/}
				{/*</button>*/}

				<GeneralInfoForm />
				{/*<GeneralForm />*/}
				{/*<ServicesOfferedForm />*/}
				{/*<HoursForm />*/}
			</div>
		)
	}
})

// const styles = {
// 	row: {
// 		'align-items': 'center',
// 		display: 'flex',
// 	},
// 	label: {
// 		color: styleVars.gray65,
// 		flex: '0 0 auto',
// 		'font-weight': styleVars.fontWeightMedium,
// 		'padding-right': '12px',
// 	},
// }

export default VerificationPortal
