import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'

import { Phone, Desktop } from '../components/breakpoints'
import GoButton from './components/go-button'
import Input from './components/input'
import Spacer from '../components/spacer'

class MiniAppForm extends Component {
	render() {
		const { handleSubmit } = this.props

		return (
			<form onSubmit={handleSubmit}>
				<Phone>
					<Spacer height="13px" />
				</Phone>
				<Desktop>
					<Spacer height="92px" />
				</Desktop>

				<Field
					placeholder="Address, city/state, or zip code"
					name="locationInput"
					component={Input}
					type="text"
				/>

				<GoButton />
			</form>
		)
	}
}

export default reduxForm({
	form: 'miniApp',
})(MiniAppForm)
