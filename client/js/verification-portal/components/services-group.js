import React from 'react'
import injectSheet from 'react-jss'

import Spacer from '../../components/spacer'
import ServiceFields from './service-fields'
import { counselingServices } from '../../../../server/pregnancy-centers/pregnancy-center-services'

const ServicesGroup = ({ classes, heading }) => {
	return (
		<div>
			<div className={classes.heading}>{heading}</div>
			<Spacer height="20px" />
			<ServiceFields listOfServices={counselingServices} />
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
