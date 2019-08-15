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
		{/*<Phone>*/}
		{/*<button*/}
		{/*className={resourceBoxStylePhone}*/}
		{/*onClick={() => onResourceChange(resource.id)}*/}
		{/*>*/}
		{/*<div className={classes.flexColumn}>*/}
		{/*<div className={classes.icons}>{iconsPhone[index]}</div>*/}
		{/*<Spacer height="9px" />*/}
		{/*<div className={classes.resourceNamePhone}>*/}
		{/*{resource.name}*/}
		{/*</div>*/}
		{/*</div>*/}
		{/*</button>*/}
		{/*</Phone>*/}

		<Tablet>
			<div className={classes.padding}>
				<div className={classes.flex}>
					<button
						className={classes.resourceBox}
						onClick={() => onResourceChange(resources[0].id)}
					>
						<div className={classes.flexColumn}>
							<div className={classes.icons}>
								<HospitalIcon key={1} height={127} width={127} />
							</div>
							<Spacer height="20px" />
							<div className={classes.resourceNameDesktop}>
								{resources[0].name}
							</div>
						</div>
					</button>

					<div className={classes.or}>or</div>

					<button
						className={classes.resourceBox}
						onClick={() => onResourceChange(resources[0].id)}
					>
						<div className={classes.flexColumn}>
							<div className={classes.icons}>
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
			<div className={classes.padding}>
				<div className={classes.flex}>
					<button
						className={classes.resourceBox}
						onClick={() => onResourceChange(resources[0].id)}
					>
						<div className={classes.flexColumn}>
							<div className={classes.icons}>
								<HospitalIcon key={1} height={127} width={127} />
							</div>
							<Spacer height="20px" />
							<div className={classes.resourceNameDesktop}>
								{resources[0].name}
							</div>
						</div>
					</button>

					<div className={classes.or}>or</div>

					<button
						className={classes.resourceBox}
						onClick={() => onResourceChange(resources[0].id)}
					>
						<div className={classes.flexColumn}>
							<div className={classes.icons}>
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
	padding: {
		padding: '100px 0px 50px 0px',
	},
	icons: {
		'&:hover': {
			'border-radius': '50%',
			'background-color': '#DEA8E0',
		},
	},
	flex: {
		display: 'flex',
		'justify-content': 'center',
	},
	flexColumn: {
		display: 'flex',
		'flex-direction': 'column',
		'align-items': 'center',
	},
	resourceBox: {
		cursor: 'pointer',
		outline: 'none',
		border: 'none',
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
	or: {
		'font-family': 'hah-regular',
		color: 'rgba(0,0,0,0.95)',
		'font-size': '30px',
		'line-height': '40px',
		'text-align': 'center',
		padding: '45px 0px',
	},
}

export default injectSheet(styles)(ResourceCarousel)
