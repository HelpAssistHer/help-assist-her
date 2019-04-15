import React, { Component } from 'react'
import injectSheet from 'react-jss'

import Spacer from '../../components/spacer'
import ChcInactiveIcon from '../../components/icons/icon-components/chc-inactive-icon'
import ChcActiveIcon from '../../components/icons/icon-components/chc-inactive-icon'
import PrcInactiveIcon from '../../components/icons/icon-components/prc-inactive-icon'
import PrcActiveIcon from '../../components/icons/icon-components/prc-active-icon'
import { Phone, Desktop } from '../../components/breakpoints'

const CHC_NAME = 'Community Health Center'
const PRC_NAME = 'Pregnancy Resource Center'

class ResourceCarousel extends Component {
	constructor(props) {
		super(props)
		this.state = {
			activeButton: null,
		}
		this.handleButtonClick = this.handleButtonClick.bind(this)
	}

	handleButtonClick = resource => {
		this.setState({ buttonClicked: resource })
	}

	render() {
		const { classes } = this.props
		const { buttonClicked } = this.state

		return (
			<div>
				<Phone>
					<Spacer height="26px" />
				</Phone>

				<Desktop>
					<div>
						<Spacer height="57px" />
						<div className={classes.resourceCarouselRoot}>
							<div
								className={classes.resourceButton}
								onClick={() => {
									this.handleButtonClick('chc')
								}}
							>
								{buttonClicked === 'chc' ? (
									<ChcActiveIcon height={127} width={127} />
								) : (
									<ChcInactiveIcon height={127} width={127} />
								)}
								<div className={classes.resourceNameDesktop}>{CHC_NAME}</div>
							</div>

							<div className={classes.borderDesktop} />

							<div
								className={classes.resourceButton}
								onClick={() => {
									this.handleButtonClick('prc')
								}}
							>
								{buttonClicked === 'prc' ? (
									<PrcActiveIcon height={127} width={127} />
								) : (
									<PrcInactiveIcon height={127} width={127} />
								)}
								<div className={classes.resourceNameDesktop}>{PRC_NAME}</div>
							</div>
						</div>
					</div>
				</Desktop>
			</div>
		)
	}
}

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
