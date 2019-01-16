import React from 'react'
import _ from 'lodash'
import { Field } from 'redux-form'

import ServicesCheckbox from './services-checkbox'

const ServiceFields = ({ listOfServices }) => (
	<div>
		{_.map(listOfServices, service => {
			return (
				<div key={service.id}>
					<Field
						label={service.name}
						name={`services.${service.id}`}
						component={ServicesCheckbox}
						description={service.description}
					/>
				</div>
			)
		})}
	</div>
)

export default ServiceFields
