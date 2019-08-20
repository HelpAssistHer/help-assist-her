import React, { Component } from 'react'
import injectSheet from 'react-jss'

import { Phone, Tablet, Desktop } from '../../components/breakpoints'

import StepOne from './step-one'
import StepTwo from './step-two'

class Questions extends Component {
	constructor(props) {
		super(props)
		this.state = {
			buttonClicked: null,
		}
		this.handleResourceChange = this.handleResourceChange.bind(this)
	}

	handleResourceChange = resource => {
		this.setState({ buttonClicked: resource })
	}

	render() {
		const { buttonClicked } = this.state
		const { classes } = this.props

		return (
			<div>
				<Phone>
					<div className={classes.searchCardRootPhone}>
						{!buttonClicked ? (
							<StepOne
								buttonClicked={buttonClicked}
								onResourceChange={this.handleResourceChange}
							/>
						) : (
							<StepTwo />
						)}
					</div>
				</Phone>

				<Tablet>
					<div className={classes.searchCardRootDesktop}>
						{!buttonClicked ? (
							<StepOne
								buttonClicked={buttonClicked}
								onResourceChange={this.handleResourceChange}
							/>
						) : (
							<StepTwo />
						)}
					</div>
				</Tablet>

				<Desktop>
					<div className={classes.searchCardRootDesktop}>
						{!buttonClicked ? (
							<StepOne
								buttonClicked={buttonClicked}
								onResourceChange={this.handleResourceChange}
							/>
						) : (
							<StepTwo />
						)}
					</div>
				</Desktop>
			</div>
		)
	}
}

const styles = {
	searchCardRootPhone: {
		margin: '35px 0px 35px 0px',
	},
	searchCardRootDesktop: {
		margin: '100px 0px 100px 0px',
	},
}

export default injectSheet(styles)(Questions)
