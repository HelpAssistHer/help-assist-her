import React from 'react'
import injectSheet from 'react-jss'

import { Phone, BigPhone, Tablet, Desktop } from '../../components/breakpoints'
import Spacer from '../../components/spacer'

const ResourceCard = ({ classes, resource }) => {
	const { nameOfResource, phoneNumber, additionalInfo, website } = resource

	return (
		<div>
			<Phone>
				<div className={classes.cardContainerPhone}>
					<div className={classes.cardPhone}>
						<div className={classes.resourceNamePhone}>{nameOfResource}</div>
						<Spacer height="15px" />
						<a className={classes.phoneNumberPhone} href={`tel:${phoneNumber}`}>
							{phoneNumber}
						</a>
						<div className={classes.additionalInfoPhone}>{additionalInfo}</div>
						<Spacer height="15px" />
						<div className={classes.websiteOverflow}>
							<a
								className={classes.websitePhone}
								href={website}
								target="_blank"
								rel="noopener noreferrer"
							>
								{website}
							</a>
						</div>
					</div>
				</div>
			</Phone>

			<BigPhone>
				<div className={classes.cardContainerBigPhone}>
					<div className={classes.cardPhone}>
						<div className={classes.resourceNamePhone}>{nameOfResource}</div>
						<Spacer height="15px" />
						<a className={classes.phoneNumberPhone} href={`tel:${phoneNumber}`}>
							{phoneNumber}
						</a>
						<div className={classes.additionalInfoPhone}>{additionalInfo}</div>
						<Spacer height="15px" />
						<div className={classes.websiteOverflow}>
							<a
								className={classes.websitePhone}
								href={website}
								target="_blank"
								rel="noopener noreferrer"
							>
								{website}
							</a>
						</div>
					</div>
				</div>
			</BigPhone>

			<Tablet>
				<div className={classes.cardContainerDesktop}>
					<div className={classes.cardDesktop}>
						<div className={classes.resourceNameDesktop}>{nameOfResource}</div>
						<Spacer height="20px" />
						<a
							className={classes.phoneNumberDesktop}
							href={`tel:${phoneNumber}`}
						>
							{phoneNumber}
						</a>
						<div className={classes.additionalInfoDesktop}>
							{additionalInfo}
						</div>
						<Spacer height="20px" />
						<div className={classes.websiteOverflow}>
							<a
								className={classes.websiteDesktop}
								href={website}
								target="_blank"
								rel="noopener noreferrer"
							>
								{website}
							</a>
						</div>
					</div>
				</div>
			</Tablet>

			<Desktop>
				<div className={classes.cardContainerDesktop}>
					<div className={classes.cardDesktop}>
						<div className={classes.resourceNameDesktop}>{nameOfResource}</div>
						<Spacer height="20px" />
						<a
							className={classes.phoneNumberDesktop}
							href={`tel:${phoneNumber}`}
						>
							{phoneNumber}
						</a>
						<div className={classes.additionalInfoDesktop}>
							{additionalInfo}
						</div>
						<Spacer height="20px" />
						<div className={classes.websiteOverflow}>
							<a
								className={classes.websiteDesktop}
								href={website}
								target="_blank"
								rel="noopener noreferrer"
							>
								{website}
							</a>
						</div>
					</div>
				</div>
			</Desktop>
		</div>
	)
}

const styles = {
	cardContainerPhone: {
		width: '300px',
		border: '1px solid #3D65F9',
		'border-radius': '2px',
		'background-color': '#FFFFFF',
		margin: '5px',
	},
	cardContainerBigPhone: {
		width: '400px',
		border: '1px solid #3D65F9',
		'border-radius': '2px',
		'background-color': '#FFFFFF',
		margin: '5px',
	},
	cardContainerDesktop: {
		width: '600px',
		border: '1px solid #3D65F9',
		'border-radius': '2px',
		'background-color': '#FFFFFF',
		margin: '10px 10px 10px 13px',
	},
	cardPhone: {
		margin: '30px 35px',
	},
	cardDesktop: {
		margin: '30px 35px',
	},
	resourceNamePhone: {
		color: '#000000',
		'font-family': 'hah-regular',
		'font-size': '20px',
		'line-height': '24px',
	},
	resourceNameDesktop: {
		color: '#000000',
		'font-family': 'hah-regular',
		'font-size': '20px',
		'line-height': '24px',
	},
	phoneNumberPhone: {
		color: '#3D65F9',
		'font-family': 'hah-regular',
		'font-size': '20px',
		'line-height': '24px',
		'text-decoration': 'none',
	},
	phoneNumberDesktop: {
		color: '#3D65F9',
		'font-family': 'hah-regular',
		'font-size': '20px',
		'line-height': '24px',
		'text-decoration': 'none',
	},
	additionalInfoPhone: {
		color: 'rgba(93,93,93,0.61)',
		'font-family': 'hah-regular',
		'font-size': '14px',
		'line-height': '17px',
	},
	additionalInfoDesktop: {
		color: 'rgba(93,93,93,0.61)',
		'font-family': 'hah-regular',
		'font-size': '14px',
		'line-height': '17px',
	},
	websitePhone: {
		color: '#3D65F9',
		'font-family': 'hah-regular',
		'font-size': '14px',
		'line-height': '17px',
		'text-decoration': 'none',
	},
	websiteDesktop: {
		color: '#3D65F9',
		'font-family': 'hah-regular',
		'font-size': '14px',
		'line-height': '17px',
		'text-decoration': 'none',
	},
	websiteOverflow: {
		'overflow-wrap': 'break-word',
	},
}

export default injectSheet(styles)(ResourceCard)
