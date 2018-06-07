import React from 'react'
import injectSheet from 'react-jss'

import ServicesGroup from './services-group'
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
		<div>
			<ServicesGroup
				heading="Counseling and Support"
				listOfServices={counselingServices}
			/>
			<ServicesGroup
				heading="Pregnancy Tests"
				listOfServices={pregnancyTestServices}
			/>
			<ServicesGroup
				heading="Education and Classes"
				listOfServices={educationServices}
			/>
			<ServicesGroup heading="Referrals" listOfServices={referralServices} />
			<ServicesGroup
				heading="Exams, Screenings, and Testings"
				listOfServices={examServices}
			/>
			<ServicesGroup heading="Other Services" listOfServices={otherServices} />
		</div>
	)
}

const styles = {}

export default injectSheet(styles)(Services)
