import React from 'react'
import _ from 'lodash'
import injectSheet from 'react-jss'
import classNames from 'classnames'

import Spacer from '../../components/spacer'
import HospitalIcon from '../../components/icons/icon-components/hospital-icon'
import PregnancyIcon from '../../components/icons/icon-components/pregnancy-icon'

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

const icons = [<HospitalIcon key={1} />, <PregnancyIcon key={2} />]

class ResourceCarousel extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			buttonClicked: null,
		}
		this.handleClick = this.handleClick.bind(this)
	}

	handleClick = resource => {
		this.setState({ buttonClicked: resource })
	}

	render() {
		const { classes } = this.props
		let { buttonClicked } = this.state

		return (
			<div className={classes.resourceCarouselRoot}>
				{_.map(resources, (resource, index) => {
					const styleWithBorder = classNames(
						classes.border,
						classes.resourceBox,
					)

					let resourceBoxStyle =
						index === 1 ? styleWithBorder : classes.resourceBox

					if (resource.id === buttonClicked) {
						resourceBoxStyle = classNames(
							resourceBoxStyle,
							classes.buttonActiveState,
						)
					}

					return (
						<button
							className={resourceBoxStyle}
							key={resource.id}
							onClick={() => this.handleClick(resource.id)}
						>
							{icons[index]}
							<Spacer height="11px" />
							<div className={classes.resourceText}>{resource.name}</div>
						</button>
					)
				})}
			</div>
		)
	}
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
