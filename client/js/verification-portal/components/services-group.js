import React from 'react'
import injectSheet from 'react-jss'

import Spacer from '../../components/spacer'
import ServiceFields from './service-fields'

const ServicesGroup = ({ classes, heading, listOfServices }) => {
	return (
		<div className={classes.group}>
			<div className={classes.heading}>{heading}</div>
			<Spacer height="20px" />
			<ServiceFields listOfServices={listOfServices} />
		</div>
	)
}

const styles = {
	group: {
		padding: '0 66px 40px 0',
	},
	heading: {
		color: '#000000',
		'font-size': '18px',
		'font-weight': 'bold',
		'letter-spacing': '1px',
		'line-height': '22px',
	},
}

export default injectSheet(styles)(ServicesGroup)
