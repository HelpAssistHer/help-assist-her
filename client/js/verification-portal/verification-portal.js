import React from 'react'
import injectSheet from 'react-jss'

import GetResourceToVerifyButton from './get-resource-to-verify-button'
import Spacer from '../components/spacer'
import VerificationPortalForm from './form'
import { updateResource } from './action-creators'
import MediumButton from '../components/medium-button' // importing bewBUtton Component
import { shouldShowFeature } from '../hah-app/helpers'

class VerificationPortal extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			outOfBiz: false, // addition of variable to keep track of out of business status.
			doNotList: false,// addition of variable to keep track of doNotList status.
		}
	}
	toggleState = (key) => { // toggling state
			let currentState = this.state[key]
			this.setState({ [key]: !currentState })
	}
	submit = (values) => {
		updateResource(values)
	}
	render() {
		const userDisplayName = _.get(this.props, 'initialData.userDisplayName')
		const { classes, changeFieldValue } = this.props
		return (
			<div className={classes.verificationPortal}>
				<h1>VERIFICATION PORTAL</h1>
				<GetResourceToVerifyButton
				   changeFieldValue={changeFieldValue}
				/>
				{
					shouldShowFeature(userDisplayName) && (
						<div>
						<div className={classes.leftPositionButton}>
							<MediumButton btnType={this.state.outOfBiz? 'orange':'blackAndWhite'}
										  buttonText='Out of Business'
										  onClick={() => this.toggleState('outOfBiz')}>
							</MediumButton>
				   </div>
					 <div className={classes.leftPositionButton + ' ' + classes.moveDown}>
							<MediumButton btnType={this.state.doNotList? 'orange':'blackAndWhite'}
										  buttonText='Do Not List'
										  onClick={() => this.toggleState('doNotList')}>
							</MediumButton>
					 </div>
					 </div>
					)
				}
       <VerificationPortalForm
			    outOfBiz={this.state.outOfBiz}
					doNotList={this.state.doNotList}
					onSubmit={this.submit}
        />
				<Spacer height='100px'/>
			</div>
		)
	}
}

const styles = {
	verificationPortal: {
		'text-align': 'center',
		'font-family': 'sans-serif',
		'color': '#4A4A4A',
		'max-width': '903px',
		'margin-left': 'calc(50% - 451.5px)',
		'background-color': '#ffffff',
		'padding-left': '15px',
		'padding-right': '15px',
		'position': 'relative',
	},
	leftPositionButton:{
		'width': '100%',
		'position': 'absolute',
		'left': '30%',
		'z-index':'100',
	},
	moveDown:{
		'top': '3.75%'
	}
}

export default injectSheet(styles)(VerificationPortal)
