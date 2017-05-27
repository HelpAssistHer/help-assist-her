import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import injectSheet from 'react-jss'

import Input from '../components/input'
import VerifiedCheckbox from './verified-checkbox'

class VerificationPortalForm extends Component {
	render() {
		const { classes, handleSubmit } = this.props

		return (
			<form onSubmit={handleSubmit}>
				<div>
					<h3>General Info</h3>
					<div className={classes.parent}>
						<Field
							label='Name'
							name='name'
							component={Input}
							type='text'
						/>
						<Field
							name='name-verified'
							component={VerifiedCheckbox}
						/>
					</div>
					<Field
						label='Address 1'
						name='address1'
						component={Input}
						type='text'
					/>
					<Field
						label='Address 2'
						name='address2'
						component={Input}
						type='text'
					/>
					<Field
						label='City'
						name='city'
						component={Input}
						type='text'
					/>
					<Field
						label='State'
						name='state'
						component={Input}
						type='text'
					/>
					<Field
						label='Zip Code'
						name='zip'
						component={Input}
						type='number'
					/>
					<Field
						label='Phone Number'
						name='phone'
						component={Input}
						type='tel'
					/>
					<Field
						label='Website'
						name='website'
						component={Input}
						type='url'
					/>
				</div>

				<div>
					<h3>Services</h3>
				</div>

				<div>
					<h3>Hours</h3>
				</div>

				<button type="submit">Submit</button>
			</form>
		)
	}
}

VerificationPortalForm = reduxForm({
	form: 'verificationPortal',
})(VerificationPortalForm)

const styles = {
	parent: {
		display: 'flex',
		'align-items': 'baseline',
	},
}

export default injectSheet(styles)(VerificationPortalForm)
