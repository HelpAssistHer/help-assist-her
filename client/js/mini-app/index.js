import React from 'react'
import { Field, reduxForm } from 'redux-form'
import injectSheet from 'react-jss'

import Input from '../components/input'
import ResourceTypeButton from './components/resource-type-button'

const MiniApp = ({ classes }) => {
	return (
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
	)
}

const MiniAppForm = reduxForm({
	form: 'miniApp',
})(MiniApp)

const styles = {
	root: {
		height: '0px',
	},
}

export default injectSheet(styles)(MiniAppForm)
