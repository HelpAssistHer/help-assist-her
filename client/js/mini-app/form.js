import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import injectSheet from 'react-jss'

import { Phone, Tablet, Desktop } from '../components/breakpoints'
import Button from './components/button'
import Input from './components/input'
import Spacer from '../components/spacer'

class MiniAppFormView extends Component {
	render() {
		const { handleSubmit, classes } = this.props

		return (
			<form onSubmit={handleSubmit}>
				<Phone>
					<Spacer height="13px" />
				</Phone>
				<Tablet>
					<Spacer height="92px" />
				</Tablet>
				<Desktop>
					<Spacer height="92px" />
				</Desktop>

				<Field
					placeholder="Address, city/state, or zip code *Beta only available in NY*"
					name="locationInput"
					component={Input}
					type="text"
				/>

				<Phone>
					<Spacer height="25px" />
				</Phone>
				<Tablet>
					<Spacer height="93px" />
				</Tablet>
				<Desktop>
					<Spacer height="93px" />
				</Desktop>

				<div className={classes.goButtonRoot}>
					<Button buttonText="Go" />
				</div>
			</form>
		)
	}
}

const styles = {
	goButtonRoot: {
		display: 'flex',
		'justify-content': 'center',
	},
}

const MiniAppForm = reduxForm({
	form: 'miniApp',
})(MiniAppFormView)

export default injectSheet(styles)(MiniAppForm)
