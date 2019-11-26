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
				<div className={classes.textContainer}>
					<div className={classes.resourceNameText}>{resource.prcName}</div>

					<Spacer height="18px" />

					<div className={classes.flexContainerForAddress}>
						<LocationIcon height={32} width={32} />
						<div className={classes.addressText}>
							{line1} <br />
							{line2} {line2 && <br />}
							{`${city}, ${state} ${zip}`}
						</div>
					</div>

					<Spacer height="12px" />

					<div className={classes.flexContainerForPhoneAndWebsite}>
						<PhoneIcon height={32} width={32} />
						<a
							className={classes.phoneAndWebsiteText}
							href={`tel:${resource.phone}`}
						>
							{formatPhoneNumber(resource.phone)}
						</a>
					</div>

					<Spacer height="12px" />

					{resource.website && (
						<div className={classes.flexContainerForPhoneAndWebsite}>
							<GlobeIcon height={32} width={32} />
							<a
								className={classes.phoneAndWebsiteText}
								href={resource.website}
								target="_blank"
								rel="noopener noreferrer"
							>
								{resource.website}
							</a>
						</div>
					)}
				</div>
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
	textContainer: {
		padding: '30px',
	},
	flexContainerForAddress: {
		display: 'flex',
		'align-items': 'flex-start',
	},
	flexContainerForPhoneAndWebsite: {
		display: 'flex',
		'align-items': 'center',
	},
	resourceNameText: {
		'font-size': '20px',
	},
	addressText: {
		'font-size': '15px',
		'margin-left': '15px',
	},
	phoneAndWebsiteText: {
		'font-size': '15px',
		'text-decoration': 'none',
		color: '#3D65F9',
		'margin-left': '15px',
	},
}

export default injectSheet(styles)(ResourceCard)
