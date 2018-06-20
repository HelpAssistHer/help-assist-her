import React from 'react'
import injectSheet from 'react-jss'

import ServicesGroup from '../components/services-group'
import {
	counselingServices,
	educationServices,
	examServices,
	otherServices,
	pregnancyTestServices,
	referralServices,
} from '../../../../server/pregnancy-centers/pregnancy-center-services'

const Services = ({ classes }) => {
	return (
		<div className={classes.servicesSection}>
			<ServicesGroup
				heading="Exams, Screenings, and Testings"
				listOfServices={examServices}
			/>
			<ServicesGroup
				heading="Counseling and Support"
				listOfServices={counselingServices}
			/>
			<ServicesGroup
				heading="Education and Classes"
				listOfServices={educationServices}
			/>
			<ServicesGroup
				heading="Pregnancy Tests"
				listOfServices={pregnancyTestServices}
			/>
			<ServicesGroup heading="Referrals" listOfServices={referralServices} />
			<ServicesGroup heading="Other Services" listOfServices={otherServices} />
		</div>
	)
}

const styles = {
	servicesSection: {
		display: 'flex',
		'flex-direction': 'row',
		'flex-wrap': 'wrap',
		'justify-content': 'flex-end',
	},
}

export default injectSheet(styles)(Services)
