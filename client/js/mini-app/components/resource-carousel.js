import React from 'react'
import _ from 'lodash'
import injectSheet from 'react-jss'
import classNames from 'classnames'

import Spacer from '../../components/spacer'
import HospitalIcon from '../../components/icons/icon-components/hospital-icon'
import PregnancyIcon from '../../components/icons/icon-components/pregnancy-icon'

const resources = ['Community Health Center', 'Pregnancy Resource Center']
const icons = [<HospitalIcon key={1} />, <PregnancyIcon key={2} />]

const ResourceCarousel = ({ classes }) => {
	return (
		<div className={classes.resourceCarouselRoot}>
			{_.map(resources, (resource, index) => {
				const styleWithBorder = classNames(classes.border, classes.resourceBox)
				const resourceBoxStyle =
					index === 1 ? styleWithBorder : classes.resourceBox

				return (
					<button className={resourceBoxStyle} key={resource}>
						{icons[index]}
						<Spacer height="11px" />
						<div className={classes.resourceText}>{resource}</div>
					</button>
				)
			})}
		</div>
	)
}

const styles = {
	resourceCarouselRoot: {
		display: 'flex',
		'justify-content': 'center',
	},
	resourceBox: {
		display: 'flex',
		'flex-direction': 'column',
		'justify-content': 'center',
		'align-items': 'center',
		height: '241px',
		width: '261px',
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
	resourceText: {
		'font-size': '24px',
		'text-align': 'center',
	},
	border: {
		'border-left': '3px solid black',
	},
}

export default injectSheet(styles)(ResourceCarousel)
