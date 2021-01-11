import React from 'react'
import injectSheet from 'react-jss'

import Spacer from './Spacer'
import HospitalIcon from './icons/icon-components/hospital-icon'
import PregnancyIcon from './icons/icon-components/pregnancy-icon'
import { Phone, BigPhone, Tablet, Desktop } from './Breakpoints'

const resources = [
	{
		id: 'chc',
		name: 'Healthcare',
	},
	{
		id: 'prc',
		name: 'Pregnancy Help',
	},
]

const ResourceCarousel = ({ classes, onResourceChange }) => (
	<div>
		<Phone>
			<div className={classes.resourceCarouselRootPhone}>
				<div className={classes.resourceButtonsPhone}>
					<button
						className={classes.resourceBox}
						onClick={() => onResourceChange(resources[0].id)}
					>
						<div className={classes.flexColumn}>
							<div className={classes.chcIcon}>
								<HospitalIcon key={1} height={49} width={49} />
							</div>
							<Spacer height="9px" />
							<div className={classes.resourceNamePhone}>
								{resources[0].name}
							</div>
						</div>
					</button>

					<button
						className={classes.resourceBox}
						onClick={() => onResourceChange(resources[1].id)}
					>
						<div className={classes.flexColumn}>
							<div className={classes.prcIcon}>
								<PregnancyIcon key={2} height={49} width={49} />
							</div>
							<Spacer height="9px" />
							<div className={classes.resourceNamePhone}>
								{resources[1].name}
							</div>
						</div>
					</button>
				</div>
			</div>
		</Phone>

		<BigPhone>
			<div className={classes.resourceCarouselRootPhone}>
				<div className={classes.resourceButtonsPhone}>
					<button
						className={classes.resourceBox}
						onClick={() => onResourceChange(resources[0].id)}
					>
						<div className={classes.flexColumn}>
							<div className={classes.chcIcon}>
								<HospitalIcon key={1} height={49} width={49} />
							</div>
							<Spacer height="9px" />
							<div className={classes.resourceNamePhone}>
								{resources[0].name}
							</div>
						</div>
					</button>

					<button
						className={classes.resourceBox}
						onClick={() => onResourceChange(resources[1].id)}
					>
						<div className={classes.flexColumn}>
							<div className={classes.prcIcon}>
								<PregnancyIcon key={2} height={49} width={49} />
							</div>
							<Spacer height="9px" />
							<div className={classes.resourceNamePhone}>
								{resources[1].name}
							</div>
						</div>
					</button>
				</div>
			</div>
		</BigPhone>

		<Tablet>
			<div className={classes.paddingDesktop}>
				<div className={classes.resourceButtonsDesktop}>
					<button
						className={classes.resourceBox}
						onClick={() => onResourceChange(resources[0].id)}
					>
						<div className={classes.flexColumn}>
							<div className={classes.chcIcon}>
								<HospitalIcon key={1} height={127} width={127} />
							</div>
							<Spacer height="20px" />
							<div className={classes.resourceNameDesktop}>
								{resources[0].name}
							</div>
						</div>
					</button>

					<button
						className={classes.resourceBox}
						onClick={() => onResourceChange(resources[1].id)}
					>
						<div className={classes.flexColumn}>
							<div className={classes.prcIcon}>
								<PregnancyIcon key={2} height={127} width={127} />
							</div>
							<Spacer height="20px" />
							<div className={classes.resourceNameDesktop}>
								{resources[1].name}
							</div>
						</div>
					</button>
				</div>
			</div>
		</Tablet>

		<Desktop>
			<div className={classes.paddingDesktop}>
				<div className={classes.resourceButtonsDesktop}>
					<button
						className={classes.resourceBox}
						onClick={() => onResourceChange(resources[0].id)}
					>
						<div className={classes.flexColumn}>
							<div className={classes.chcIcon}>
								<HospitalIcon key={1} height={127} width={127} />
							</div>
							<Spacer height="20px" />
							<div className={classes.resourceNameDesktop}>
								{resources[0].name}
							</div>
						</div>
					</button>

					<button
						className={classes.resourceBox}
						onClick={() => onResourceChange(resources[1].id)}
					>
						<div className={classes.flexColumn}>
							<div className={classes.prcIcon}>
								<PregnancyIcon key={2} height={127} width={127} />
							</div>
							<Spacer height="20px" />
							<div className={classes.resourceNameDesktop}>
								{resources[1].name}
							</div>
						</div>
					</button>
				</div>
			</div>
		</Desktop>
	</div>
)

const styles = {
	resourceCarouselRootPhone: {
		display: 'flex',
		'justify-content': 'center',
		padding: '50px 0px 0px 0px',
	},
	paddingDesktop: {
		padding: '80px 0px 0px 0px',
	},
	disabledIcon: {
		opacity: 0.2,
	},
	chcIcon: {
		'line-height': 0,
		'&:hover': {
			'border-radius': '50%',
			'background-color': '#DEA8E0',
		},
	},
	prcIcon: {
		'line-height': 0,
		'&:hover': {
			'border-radius': '50%',
			'background-color': '#F9AB7F',
		},
	},
	resourceButtonsPhone: {
		display: 'flex',
		'justify-content': 'center',
		'max-width': '275px',
	},
	resourceButtonsDesktop: {
		display: 'flex',
		'justify-content': 'center',
	},
	flexColumn: {
		display: 'flex',
		'flex-direction': 'column',
		'align-items': 'center',
	},
	resourceBox: {
		'-webkit-tap-highlight-color': 'rgba(0, 0, 0, 0)',
		cursor: 'pointer',
		outline: 'none',
		border: 'none',
		display: 'flex',
		'align-items': 'flex-start',
		'background-color': '#FFFFFF', // for Safari
	},
	buttonActiveState: {
		'background-color': '#3D65F9',
		color: '#FFFFFF',
	},
	resourceNamePhone: {
		'font-family': 'hah-regular',
		'font-size': '14px',
		height: '100%',
		width: '100%',
	},
	resourceNameDesktop: {
		'font-family': 'hah-regular',
		'font-size': '20px',
		'line-height': '30px',
		height: '100%',
		'max-width': 'min-content',
	},
}

export default injectSheet(styles)(ResourceCarousel)
