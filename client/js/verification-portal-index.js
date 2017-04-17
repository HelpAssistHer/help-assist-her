'use strict'

import React from 'react'

import VerificationPortalView from './verification-portal-view'

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

async function submitResource(data) {
	const options = {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*',
		},
		mode: 'no-cors',
		cache: 'default',
		body: JSON.stringify({
			address: {
				city: data.city,
				line1: data.address1,
				line2: data.address2,
				state: data.state,
				zip: data.zip,
			},
			dateCreated: Date.now(),
			// hours: Object,
			name: data.name, // change to prcName?
			// notes: this.state.notes,
			phone: data.phone,
			primaryContact: {
				firstName: data.primaryContactFirstName,
				lastName: data.primaryContactLastName,
				email: data.primaryContactEmail,
				phone: data.primaryContactPhone,
			},
			// resources: [String],
			website: data.website,
		})
	}

	try {
		const response = await fetch('http://localhost:4000/api/pregnancy-centers', options)
		// const result = await response.json()
		console.log('RESPONSE FROM SERVER', response)
		if (response.type === 'cors') {
			console.log('CORS')
		} else {
			console.log('NOT CORS')
		}
		// return result
	} catch(error) {
		console.error(error)
	}
}

const VerificationPortal = React.createClass({
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
		// const { firstName, lastName, email } = result.primaryContact

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
			// primaryContactFirstName: firstName || null,
			// primaryContactLastName: lastName || null,
			// primaryContactEmail: email || null,
			// primaryContactPhone: result.primaryContact.phone, // how can you rename after destructuring
		})
	},

	render() {
		return (
			<VerificationPortalView
				info={this.state}
				getResourceClick={this.handleClick}
				submitResource={this.handleSubmit}
			/>
		)
	}
})

export default VerificationPortal
