import React from 'react'
import injectSheet from 'react-jss'

import LocationIcon from '../../components/icons/icon-components/location-icon'
import PhoneIcon from '../../components/icons/icon-components/phone-icon'
import GlobeIcon from '../../components/icons/icon-components/globe-icon'
import Spacer from '../../components/spacer'

const formatPhoneNumber = phoneNumber => {
	const areaCode = phoneNumber.substring(2, 5)
	const prefix = phoneNumber.substring(5, 8)
	const lineNumber = phoneNumber.substring(8, 12)

	return `${areaCode}-${prefix}-${lineNumber}`
}

const ResourceCard = ({ classes, resource }) => {
	const { line1, line2, city, state, zip } = resource.address

	return (
		<div className={classes.resourceCardRoot}>
			<div className={classes.resourceCardBorder}>
				<div className={classes.resourceName}>{resource.prcName}</div>

				<div className={classes.resourceAddress}>
					<LocationIcon height={32} width={32} />
					<div className={classes.margin}>
						{line1} <br />
						{line2} {line2 && <br />}
						{`${city}, ${state} ${zip}`}
					</div>
				</div>

				<div className={classes.resourcePhone}>
					<PhoneIcon height={32} width={32} />
					<a className={classes.margin} href={`tel:${resource.phone}`}>
						{formatPhoneNumber(resource.phone)}
					</a>
				</div>

				{resource.website && (
					<div className={classes.resourceWebsite}>
						<GlobeIcon height={32} width={32} />
						<a
							className={classes.margin}
							href={resource.website}
							target="_blank"
							rel="noopener noreferrer"
						>
							{resource.website}
						</a>
					</div>
				)}

				<Spacer height="27px" />
			</div>
		</div>
	)
}

const styles = {
	resourceCardRoot: {
		padding: '8px 0px',
		width: '100%',
		'max-width': '600px',
	},
	resourceCardBorder: {
		border: '1px solid #3d65f9',
		'border-radius': '2px',
		'background-color': '#FFFFFF',
	},
	resourceName: {
		margin: '24px 0px 0px 30px',
		'font-size': '20px',
	},
	resourceAddress: {
		display: 'flex',
		'align-items': 'flex-start',
		margin: '18px 0px 0px 24px',
		'font-size': '15px',
	},
	resourcePhone: {
		display: 'flex',
		'align-items': 'center',
		margin: '12px 0px 0px 24px',
		'font-size': '15px',
	},
	resourceWebsite: {
		display: 'flex',
		'align-items': 'center',
		margin: '12px 0px 0px 24px',
		'font-size': '15px',
	},
	margin: {
		'margin-left': '13px',
	},
}

export default injectSheet(styles)(ResourceCard)
