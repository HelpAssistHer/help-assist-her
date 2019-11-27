import React from 'react'
import injectSheet from 'react-jss'

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
		'align-items': 'center',
		'grid-template-columns': '5% 10% 5% 75% 5%',
		'grid-template-rows': '25px 30px 18px 40px 40px 40px 25px',
	},
	locationIcon: {
		'grid-column': '2 / 3',
		'grid-row': '4 / 5',
	},
	phoneIcon: {
		'grid-column': '2 / 3',
		'grid-row': '5 / 6',
	},
	globeIcon: {
		'grid-column': '2 / 3',
		'grid-row': '6 / 7',
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
		'grid-row': '5 / 6',
	},
	resourceWebsite: {
		'font-size': '15px',
		'text-decoration': 'none',
		color: '#3D65F9',
		'overflow-wrap': 'break-word',
		'grid-column': '4 / 5',
		'grid-row': '6 / 7',
	},
}

export default injectSheet(styles)(ResourceCard)
