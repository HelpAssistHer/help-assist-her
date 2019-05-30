import React from 'react'
import injectSheet from 'react-jss'

import { Phone, Desktop } from '../../components/breakpoints'

const ResourceCard = ({ classes, resource }) => {
	const {
		nameOfResource,
		phoneNumber,
		additionalInfo,
		additionalInfo2,
	} = resource

	return (
		<div>
			<Phone>
				<div className={classes.cardContainerPhone}>
					<div className={classes.cardPhone}>
						<div className={classes.resourceNamePhone}>{nameOfResource}</div>
						<div className={classes.phoneNumberPhone}>{phoneNumber}</div>
						<div className={classes.additionalInfoPhone}>
							{additionalInfo}
							{additionalInfo2}
						</div>
					</div>
				</div>
			</Phone>

			<Desktop>
				<div className={classes.cardContainerDesktop}>
					<div className={classes.cardDesktop}>
						<div className={classes.resourceNameDesktop}>{nameOfResource}</div>
						<div className={classes.phoneNumberDesktop}>{phoneNumber}</div>
						<div className={classes.additionalInfoDesktop}>
							{additionalInfo}
							{additionalInfo2}
						</div>
					</div>
				</div>
			</Desktop>
		</div>
	)
}

const styles = {
	cardContainerPhone: {
		border: '1px solid #3D65F9',
		'border-radius': '2px',
		'background-color': '#FFFFFF',
	},
	cardContainerDesktop: {
		border: '3px solid #3D65F9',
		'border-radius': '2px',
		'background-color': '#FFFFFF',
	},
	cardPhone: {
		margin: '20px 0px 0px 35px',
	},
	cardDesktop: {
		margin: '34px 0px 0px 27px',
	},
	resourceNamePhone: {
		color: '#000000',
		'font-family': 'hah-regular',
		'font-size': '14px',
		'line-height': '33px',
		'text-align': 'center',
	},
	resourceNameDesktop: {
		color: '#000000',
		'font-family': 'hah-regular',
		'font-size': '33px',
		'line-height': '44px',
	},
	phoneNumberDesktop: {
		color: '#3D65F9',
		'font-family': 'hah-regular',
		'font-size': '40px',
		'line-height': '41px',
	},
	additionalInfoDesktop: {
		color: 'rgba(93,93,93,0.61)',
		'font-family': 'hah-regular',
		'font-size': '24px',
		'line-height': '27px',
	},
	phoneNumberPhone: {},
	additionalInfoPhone: {},
}

export default injectSheet(styles)(ResourceCard)
