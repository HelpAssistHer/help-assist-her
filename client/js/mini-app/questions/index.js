import React, { Component } from 'react'
import injectSheet from 'react-jss'

import StepOne from './step-one'
import StepTwo from './step-two'
import { Desktop } from '../../components/breakpoints'
import Spacer from '../../components/spacer'

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
		const buttonClicked = this.state.buttonClicked

		if (!buttonClicked) {
			return (
				<div>
					<StepOne
						buttonClicked={buttonClicked}
						onResourceChange={this.handleResourceChange}
					/>
					<Desktop>
						<div>
							<Spacer height="87px" />
						</div>
					</Desktop>
				</div>
			)
		}

		return (
			<div>
				<StepTwo />
				<Desktop>
					<div>
						<Spacer height="87px" />
					</div>
				</Desktop>
			</div>
		)
	}
}

const styles = {}

export default injectSheet(styles)(Questions)
