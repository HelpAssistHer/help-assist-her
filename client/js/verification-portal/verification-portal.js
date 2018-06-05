import React from 'react'
import injectSheet from 'react-jss'

import GetResourceToVerifyButton from './get-resource-to-verify-button'
import Spacer from '../components/spacer'
import VerificationPortalForm from './form'
import { updateResource } from './action-creators'
import Button from '../components/button' // importing bewBUtton Component
import { shouldShowFeature } from '../hah-app/helpers'
import classNames from 'classnames'

class VerificationPortal extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			outOfBiz: false, // addition of variable to keep track of out of business status.
			doNotList: false,
		}
		this.toggleState = this.toggleState.bind(this)
	}
	toggleState = key => {
		// toggling state by passing key
		let currentState = this.state[key]
		this.setState({ [key]: !currentState })
	}
	submit = values => {
		updateResource(values)
	}
	render() {
		const userDisplayName = _.get(this.props, 'initialData.userDisplayName')
		const { classes, changeFieldValue } = this.props
		return (
			<div>
				<div className={classes.resourceButton}>
					<GetResourceToVerifyButton changeFieldValue={changeFieldValue} />
				</div>
				<div className={classes.verificationPortal}>
					{shouldShowFeature(userDisplayName) && (
						<div>
							<div className={classes.leftPositionButton}>
								<Button
									activeState={this.state.outOfBiz}
									buttonText="Out of Business"
									onClick={() => this.toggleState('outOfBiz')}
									size="medium"
								/>
							</div>
							<div className={classNames(classes.leftPositionButton, classes.moveDown)}>
								<Button
									activeState={this.state.doNotList}
									buttonText="Do Not List"
									onClick={() => this.toggleState('doNotList')}
									size="medium"
								/>
							</div>
						</div>
					)}

					<VerificationPortalForm
						outOfBiz={this.state.outOfBiz}
						doNotList={this.state.doNotList}
						onSubmit={this.submit}
					/>
					<Spacer height="100px" />
				</div>
			</div>
		)
	}
}

const styles = {
	verificationPortal: {
		'text-align': 'center',
		'font-family': 'sans-serif',
		color: '#4A4A4A',
		'max-width': '903px',
		'margin-left': 'calc(50% - 451.5px)',
		'background-color': '#ffffff',
		'padding-left': '15px',
		'padding-right': '15px',
		position: 'relative',
	},
	leftPositionButton: {
		width: '100%',
		position: 'absolute',
		left: '25%',
		'z-index': '100',
	},
	moveDown: {
		top: '1.5%',
	},
	resourceButton: {
		'margin-top': '0.5%',
	},
}

export default injectSheet(styles)(VerificationPortal)
