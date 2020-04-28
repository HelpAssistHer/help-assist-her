import React, { Component } from 'react'
import injectSheet from 'react-jss'

import { Phone, BigPhone, Tablet, Desktop } from '../../components/breakpoints'

import StepOne from './step-one'
import StepTwo from './step-two'

class Questions extends Component {
	constructor(props) {
		super(props)
		this.handleResourceChange = this.handleResourceChange.bind(this)
		this.state = {
			buttonClicked: null,
		}
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
							<StepTwo
								onResourceChange={this.handleResourceChange}
								resourceType={buttonClicked}
							/>
						)}
					</div>
				</Phone>

				<BigPhone>
					<div className={classes.searchCardRootPhone}>
						{!buttonClicked ? (
							<StepOne
								buttonClicked={buttonClicked}
								onResourceChange={this.handleResourceChange}
							/>
						) : (
							<StepTwo
								onResourceChange={this.handleResourceChange}
								resourceType={buttonClicked}
							/>
						)}
					</div>
				</BigPhone>

				<Tablet>
					<div className={classes.searchCardRootDesktop}>
						{!buttonClicked ? (
							<StepOne
								buttonClicked={buttonClicked}
								onResourceChange={this.handleResourceChange}
							/>
						) : (
							<StepTwo
								onResourceChange={this.handleResourceChange}
								resourceType={buttonClicked}
							/>
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
							<StepTwo
								onResourceChange={this.handleResourceChange}
								resourceType={buttonClicked}
							/>
						)}
					</div>
				</Desktop>
			</div>
		)
	}
}

const styles = {
	searchCardRootPhone: {
		margin: '60px 0px 75px 0px',
	},
	searchCardRootDesktop: {
		margin: '100px 0px 125px 0px',
	},
}

export default injectSheet(styles)(Questions)
