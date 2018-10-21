import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'

import ResourceTypeButton from './components/resource-type-button'
import Input from '../components/input'

class MiniAppForm extends Component {
	render() {
		const { handleSubmit } = this.props

		return (
			<form onSubmit={handleSubmit}>
				<Field
					placeholder="Address, city/state, zip code"
					name="locationInput"
					component={Input}
					type="text"
				/>
				<ResourceTypeButton />
			</form>
		)
	}
}

export default reduxForm({
	form: 'miniApp',
})(MiniAppForm)
