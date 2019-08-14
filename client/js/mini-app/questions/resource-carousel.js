import React from 'react'
import _ from 'lodash'
import injectSheet from 'react-jss'
import classNames from 'classnames'

import Spacer from '../../components/spacer'
import HospitalIcon from '../../components/icons/icon-components/hospital-icon'
import PregnancyIcon from '../../components/icons/icon-components/pregnancy-icon'
import { Phone, Tablet, Desktop } from '../../components/breakpoints'

const resources = [
	{
		id: 'chc',
		name: 'Community Health Center',
	},
	{
		id: 'prc',
		name: 'Pregnancy Resource Center',
	},
]

const iconsPhone = [
	<HospitalIcon key={1} height={49} width={49} />,
	<PregnancyIcon key={2} height={49} width={49} />,
]
const iconsDesktop = [
	<HospitalIcon key={1} height={127} width={127} />,
	<PregnancyIcon key={2} height={127} width={127} />,
]

const ResourceCarousel = ({ classes, buttonClicked, onResourceChange }) => (
	<div>
		<Phone>
			<Spacer height="26px" />
		</Phone>

		<Tablet>
			<Spacer height="57px" />
		</Tablet>

		<Desktop>
			<Spacer height="57px" />
		</Desktop>

		<div className={classes.resourceCarouselRoot}>
			{_.map(resources, (resource, index) => {
				const styleWithBorderPhone = classNames(
					classes.borderPhone,
					classes.resourceBox,
				)

				let resourceBoxStylePhone =
					index === 1 ? styleWithBorderPhone : classes.resourceBox

				if (resource.id === buttonClicked) {
					resourceBoxStylePhone = classNames(
						resourceBoxStylePhone,
						classes.buttonActiveState,
					)
				}

				const styleWithBorderDesktop = classNames(
					classes.borderDesktop,
					classes.resourceBox,
				)

				let resourceBoxStyleDesktop =
					index === 1 ? styleWithBorderDesktop : classes.resourceBox

				if (resource.id === buttonClicked) {
					resourceBoxStyleDesktop = classNames(
						resourceBoxStyleDesktop,
						classes.buttonActiveState,
					)
				}

				return (
					<div key={resource.id}>
						<Phone>
							<button
								className={resourceBoxStylePhone}
								onClick={() => onResourceChange(resource.id)}
							>
								<div className={classes.flex}>
									{iconsPhone[index]}
									<Spacer height="9px" />
									<div className={classes.resourceNamePhone}>
										{resource.name}
									</div>
								</div>
							</button>
						</Phone>

						<Tablet>
							<button
								className={resourceBoxStyleDesktop}
								onClick={() => onResourceChange(resource.id)}
							>
								<div className={classes.flex}>
									{iconsDesktop[index]}
									<Spacer height="20px" />
									<div className={classes.resourceNameDesktop}>
										{resource.name}
									</div>
								</div>
							</button>
						</Tablet>

						<Desktop>
							<button
								className={resourceBoxStyleDesktop}
								onClick={() => onResourceChange(resource.id)}
							>
								<div className={classes.flex}>
									{iconsDesktop[index]}
									<Spacer height="20px" />
									<div className={classes.resourceNameDesktop}>
										{resource.name}
									</div>
								</div>
							</button>
						</Desktop>
					</div>
				)
			})}
		</div>
	</div>
)

const styles = {
	resourceCarouselRoot: {
		display: 'flex',
		'justify-content': 'center',
	},
	flex: {
		display: 'flex',
		'flex-direction': 'column',
		'align-items': 'center',
	},
	resourceBox: {
		cursor: 'pointer',
		outline: 'none',
		border: 'none',
		'&:hover': {
			'background-color': '#3D65F9',
			color: '#FFFFFF',
		},
	},
	buttonActiveState: {
		'background-color': '#3D65F9',
		color: '#FFFFFF',
	},
	resourceNamePhone: {
		'font-family': 'hah-regular',
		'font-size': '14px',
		width: '60%',
	},
	resourceNameDesktop: {
		'font-family': 'hah-light',
		'font-size': '24px',
		width: '60%',
	},
	borderPhone: {
		'border-left': '1px solid #000000',
	},
	borderDesktop: {
		'border-left': '2px solid #000000',
	},
}

export default injectSheet(styles)(ResourceCarousel)
