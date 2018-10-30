import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'

import GoButton from './components/go-button'
import Input from '../components/input'
import Spacer from '../components/spacer'

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
				<Spacer height="25px" />
				<GoButton />
			</form>
		)
	}
}

export default reduxForm({
	form: 'miniApp',
})(MiniAppForm)
