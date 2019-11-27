import React from 'react'
import injectSheet from 'react-jss'

import { Phone, BigPhone, Tablet, Desktop } from '../../components/breakpoints'
import LocationIcon from '../../components/icons/icon-components/location-icon'
import PhoneIcon from '../../components/icons/icon-components/phone-icon'
import GlobeIcon from '../../components/icons/icon-components/globe-icon'

const formatPhoneNumber = phoneNumber => {
	const areaCode = phoneNumber.substring(2, 5)
	const prefix = phoneNumber.substring(5, 8)
	const lineNumber = phoneNumber.substring(8, 12)

	return `${areaCode}-${prefix}-${lineNumber}`
}

const ResourceCard = ({ classes, resource }) => {
	const { line1, line2, city, state, zip } = resource.address

	return (
		<div className={classes.cardRoot}>
			<div className={classes.cardContainer}>
				<LocationIcon className={classes.locationIcon} height={32} width={32} />
				<PhoneIcon className={classes.phoneIcon} height={32} width={32} />
				<GlobeIcon className={classes.globeIcon} height={32} width={32} />

				<div className={classes.resourceName}>{resource.prcName}</div>

				<div className={classes.resourceAddress}>
					{line1} <br />
					{line2} {line2 && <br />}
					{`${city}, ${state} ${zip}`}
				</div>

				<a className={classes.resourcePhone} href={`tel:${resource.phone}`}>
					{formatPhoneNumber(resource.phone)}
				</a>

				{resource.website && (
					<a
						className={classes.resourceWebsite}
						href={resource.website}
						target="_blank"
						rel="noopener noreferrer"
					>
						{resource.website}
					</a>
				)}
			</div>
		</div>
	)
}

const styles = {
	cardRoot: {
		padding: '8px 0px',
		width: '100%',
		'max-width': '600px',
	},
	cardContainer: {
		border: '1px solid #3d65f9',
		'border-radius': '2px',
		'background-color': '#FFFFFF',
		display: 'grid',
		'grid-template-columns': '100px 100px 100px 100px 100px',
		'grid-template-rows': '50px 50px 50px 50px 50px 50px 50px 50px 50px',
	},
	locationIcon: {
		'grid-column': '2 / 3',
		'grid-row': '4 / 5',
	},
	phoneIcon: {
		'grid-column': '2 / 3',
		'grid-row': '6 / 7',
	},
	globeIcon: {
		'grid-column': '2 / 3',
		'grid-row': '8 / 9',
	},
	resourceName: {
		'font-size': '20px',
		'grid-column': '2 / 5',
		'grid-row': '2 / 3',
	},
	resourceAddress: {
		'font-size': '15px',
		'grid-column': '4 / 5',
		'grid-row': '4 / 5',
	},
	resourcePhone: {
		'font-size': '15px',
		'text-decoration': 'none',
		color: '#3D65F9',
		'grid-column': '4 / 5',
		'grid-row': '6 / 7',
	},
	resourceWebsite: {
		'font-size': '15px',
		'text-decoration': 'none',
		color: '#3D65F9',
		'grid-column': '4 / 5',
		'grid-row': '8 / 9',
	},
}

export default injectSheet(styles)(ResourceCard)
