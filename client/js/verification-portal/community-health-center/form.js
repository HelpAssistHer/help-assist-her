import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import injectSheet from 'react-jss'

import Input from '../../components/input'
import RegisterField from '../components/register-field'

const handleSubmit = values => {
	console.log(' CHC form values == ', values)
}
const chcInputResource = [
	{
		name: 'nameOfCHC',
		value: '',
		placeholder: 'Name of Community Health Center',
		verified: true,
	},
	[
		{
			name: 'addressLine1',
			value: '',
			placeholder: 'Address 1',
			verified: false,
		},
		{
			name: 'addressLine2',
			value: '',
			placeholder: 'Address 2',
			verified: false,
		},
		{
			name: 'city',
			value: '',
			placeholder: 'City',
			verified: false,
		},
		{
			name: 'state',
			value: '',
			placeholder: 'State',
			verified: false,
		},
		{
			name: 'zipCode',
			value: '',
			placeholder: 'Zip Code',
			verified: false,
		},
	],
	{
		name: 'phoneNumber',
		value: '',
		placeholder: 'Phone Number',
		verified: false,
	},
	{
		name: 'email',
		value: '',
		placeholder: 'Email',
		verified: false,
	},
	{
		name: 'website',
		value: '',
		placeholder: 'Website',
		verified: false,
	},
]

const registerFields = info => {
	if (!info.name)
		return info.forEach(field => allFields.push(registerFields(field)))
	return <RegisterField info={info} key={info.name} />
}
const allFields = []
class chcForm extends Component {
	render() {
		const { classes } = this.props
		return (
			<form className={classes.form} onSubmit={handleSubmit}>
				{chcInputResource.forEach(field =>
					allFields.push(registerFields(field)),
				)}
				{allFields}
			</form>
		)
	}
}

const CommunityHealtCenterForm = reduxForm({
	form: 'chcForm',
})(chcForm)

const styles = {
	form: {
		width: '80%',
		'margin-left': '10%',
	},
}

export default injectSheet(styles)(CommunityHealtCenterForm)
