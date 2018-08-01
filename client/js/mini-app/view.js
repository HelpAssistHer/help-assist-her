import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import injectSheet from 'react-jss'

import Input from '../components/input'
import ResourceTypeButton from './components/resource-type-button'

class MiniApp extends Component {
	submit = values => {
		console.log('VALUES', values)
	}

	render() {
		const { classes, handleSubmit } = this.props

		return (
			<form onSubmit={handleSubmit}>
				<div className={classes.root}>
					The Mini App
					<Field
						placeholder="Address, city/state, zip code"
						name="locationInput"
						component={Input}
						type="text"
					/>
					<ResourceTypeButton />
				</div>
			</form>
		)
	}
}

const styles = {
	root: {
		height: '0px',
	},
}

const MiniAppForm = reduxForm({
	form: 'miniApp',
})(MiniApp)

export default injectSheet(styles)(MiniAppForm)
