import React from 'react'
import injectSheet from 'react-jss'

import { Phone, Tablet, Desktop } from '../../components/breakpoints'
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
						<div className={classes.websitePhone}>
							<a href={website} target="_blank" rel="noopener noreferrer">
								{website}
							</a>
						</div>
					</div>
				</div>
			</Phone>

			<Tablet>
				<div className={classes.cardContainerDesktop}>
					<div className={classes.cardDesktop}>
						<div className={classes.resourceNameDesktop}>{nameOfResource}</div>
						<Spacer height="30px" />
						<a
							className={classes.phoneNumberDesktop}
							href={`tel:${phoneNumber}`}
						>
							{phoneNumber}
						</a>
						<Spacer height="12px" />
						<div className={classes.additionalInfoDesktop}>
							{additionalInfo}
						</div>
						<div className={classes.websiteDesktop}>
							<a href={website} target="_blank" rel="noopener noreferrer">
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
						<Spacer height="30px" />
						<a
							className={classes.phoneNumberDesktop}
							href={`tel:${phoneNumber}`}
						>
							{phoneNumber}
						</a>
						<Spacer height="12px" />
						<div className={classes.additionalInfoDesktop}>
							{additionalInfo}
						</div>
						<div className={classes.websiteDesktop}>
							<a href={website} target="_blank" rel="noopener noreferrer">
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
		height: '190px',
		width: '300px',
		border: '1px solid #3D65F9',
		'border-radius': '2px',
		'background-color': '#FFFFFF',
		margin: '5px',
	},
	cardContainerDesktop: {
		height: '360px',
		width: '460px',
		border: '3px solid #3D65F9',
		'border-radius': '2px',
		'background-color': '#FFFFFF',
		margin: '10px 10px 10px 13px',
	},
	cardPhone: {
		margin: '25px 35px 0px 35px',
	},
	cardDesktop: {
		margin: '45px 27px 0px 27px',
	},
	resourceNamePhone: {
		color: '#000000',
		'font-family': 'hah-regular',
		'font-size': '16px',
		'line-height': '21px',
	},
	resourceNameDesktop: {
		color: '#000000',
		'font-family': 'hah-regular',
		'font-size': '33px',
		'line-height': '44px',
	},
	phoneNumberPhone: {
		color: '#3D65F9',
		'font-family': 'hah-regular',
		'font-size': '22px',
		'line-height': '22px',
	},
	phoneNumberDesktop: {
		color: '#3D65F9',
		'font-family': 'hah-regular',
		'font-size': '40px',
		'line-height': '41px',
	},
	additionalInfoPhone: {
		color: 'rgba(93,93,93,0.61)',
		'font-family': 'hah-regular',
		'font-size': '14px',
	},
	additionalInfoDesktop: {
		color: 'rgba(93,93,93,0.61)',
		'font-family': 'hah-regular',
		'font-size': '20px',
		'line-height': '27px',
	},
	websitePhone: {
		color: 'rgba(93,93,93,0.61)',
		'font-family': 'hah-regular',
		'font-size': '14px',
	},
	websiteDesktop: {
		color: 'rgba(93,93,93,0.61)',
		'font-family': 'hah-regular',
		'font-size': '20px',
		'line-height': '27px',
		'overflow-wrap': 'break-word',
	},
}

export default injectSheet(styles)(ResourceCard)
