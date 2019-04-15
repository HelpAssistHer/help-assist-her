import React from 'react'
import _ from 'lodash'
import injectSheet from 'react-jss'
import classNames from 'classnames'

import Spacer from '../../components/spacer'
import ChcInactiveIcon from '../../components/icons/icon-components/chc-inactive-icon'
import ChcActiveIcon from '../../components/icons/icon-components/chc-inactive-icon'
import PrcInactiveIcon from '../../components/icons/icon-components/prc-inactive-icon'
import PrcActiveIcon from '../../components/icons/icon-components/prc-active-icon'
import { Phone, Desktop } from '../../components/breakpoints'
import button from '../../components/button'

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

const CHC_NAME = 'Community Health Center'
const PRC_NAME = 'Pregnancy Resource Center'

const iconsPhone = [
	<ChcInactiveIcon key={1} height={49} width={49} />,
	<PrcActiveIcon key={2} height={49} width={49} />,
]
const inactiveIconsDesktop = [
	<ChcInactiveIcon key={1} height={127} width={127} />,
	<PrcInactiveIcon key={2} height={127} width={127} />,
]
const activeIconsDesktop = [
	<ChcInactiveIcon key={1} height={127} width={127} />,
	<PrcActiveIcon key={2} height={127} width={127} />,
]

const ResourceCarousel = ({ classes, buttonClicked, onResourceChange }) => (
	<div>
		<Phone>
			<Spacer height="26px" />
		</Phone>

		<Desktop>
			<div>
				<Spacer height="57px" />
				<div className={classes.resourceCarouselRoot}>
					<div className={classes.resourceButton}>
						<ChcInactiveIcon height={127} width={127} />
						<div className={classes.resourceNameDesktop}>{CHC_NAME}</div>
					</div>
					<div className={classes.borderDesktop} />
					<div className={classes.resourceButton}>
						<PrcInactiveIcon height={127} width={127} />
						<div className={classes.resourceNameDesktop}>{PRC_NAME}</div>
					</div>
				</div>
			</div>
		</Desktop>
	</div>
)

const styles = {
	resourceCarouselRoot: {
		display: 'flex',
		'justify-content': 'center',
	},
	resourceButton: {
		display: 'flex',
		'flex-direction': 'column',
		'align-items': 'center',
		cursor: 'pointer',
		outline: 'none',
		border: 'none',
	},
	resourceNamePhone: {
		'font-family': 'hah-regular',
		'font-size': '14px',
		width: '60%',
		'text-align': 'center',
	},
	resourceNameDesktop: {
		'font-family': 'hah-light',
		'font-size': '24px',
		width: '60%',
		'text-align': 'center',
	},
	borderPhone: {
		'border-left': '1px solid #000000',
	},
	borderDesktop: {
		'border-left': '2px solid #000000',
	},
}

export default injectSheet(styles)(ResourceCarousel)
