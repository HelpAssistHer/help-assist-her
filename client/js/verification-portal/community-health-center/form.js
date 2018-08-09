import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import injectSheet from 'react-jss'

import RegisterField from '../components/register-field'
import Button from '../../components/button'

const registerFields = info => {
	if (!info.name) return info.map(field => registerFields(field))
	return <RegisterField info={info} key={info.name} />
}

class chcForm extends Component {
	render() {
		const { classes, chcInputResource, handleSubmit } = this.props
		return (
			<form className={classes.form} onSubmit={handleSubmit}>
				{chcInputResource.map(field => registerFields(field))}
				<Button
					type="submit"
					buttonText="Save Progress"
					activeState={false}
					size="large"
				/>
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
