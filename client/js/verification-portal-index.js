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

const VerificationPortal = React.createClass({
	getInitialState() {
		return {
			address: {},
			email: '',
			hours: {
				open: '',
				close: '',
			},
			name: '',
			notes: '',
			phone: '',
			primaryContact: {},
			services: [],
			website: '',
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
		console.log('GET ONE RESOURCE', result)

		const {
			address,
			email,
			hours,
			name,
			notes,
			phone,
			primaryContact,
			services,
			website,
		} = result

		this.setState({
			address,
			email,
			hours,
			name,
			notes,
			phone,
			primaryContact,
			services,
			website,
		})
	},

	render() {
		return (
			<VerificationPortalView
				data={this.state}
				getResourceClick={this.handleClick}
				submitResource={this.handleSubmit}
			/>
		)
	}
})

export default VerificationPortal
