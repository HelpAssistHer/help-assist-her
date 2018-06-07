import React from 'react'
import { Field } from 'redux-form'
import injectSheet from 'react-jss'

import Spacer from '../../components/spacer'
import { counselingServices } from '../../../../server/pregnancy-centers/pregnancy-center-services'
import ServicesCheckbox from './services-checkbox'

const ServicesGroup = ({ classes, heading }) => {
	return (
		<div>
			<div className={classes.heading}>{heading}</div>
			<Spacer height="20px" />
			{_.map(counselingServices, service => {
				return (
					<div key={service.id}>
						<Field
							label={service.name}
							name={`services.${service.id}`}
							component={ServicesCheckbox}
						/>
					</div>
				)
			})}
		</div>
	)
}

const styles = {
	heading: {
		color: '#000000',
		'font-size': '18px',
		'font-weight': 'bold',
		'letter-spacing': '1px',
		'line-height': '22px',
	},
}

export default injectSheet(styles)(ServicesGroup)
