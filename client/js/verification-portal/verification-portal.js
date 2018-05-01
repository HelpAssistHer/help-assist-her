import React from 'react'
import injectSheet from 'react-jss'

import GetResourceToVerifyButton from './get-resource-to-verify-button'
import Spacer from '../components/spacer'
import VerificationPortalForm from './form'
import { updateResource } from './action-creators'
import MediumButton from '../components/medium-button' // importing bewBUtton Component

class VerificationPortal extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			outOfBiz: false // addition of variable to keep track of out of business status.
		}
		this.handleClick = this.handleClick.bind(this)
	}
	handleClick = () => { // toggling out of business status
		let {outOfBiz} = this.state
		this.setState({ outOfBiz: !outOfBiz })
	}
	submit = (values) => {
		updateResource(values)
	}
	render() {
		const { classes, changeFieldValue } = this.props

		return (
			<div className={classes.verificationPortal}>
				<h1>VERIFICATION PORTAL</h1>
        <GetResourceToVerifyButton
           changeFieldValue={changeFieldValue}
					 />

        <div className={classes.leftPositionButton}>
            <MediumButton btnType={this.state.outOfBiz? 'orange':'blackAndWhite'}
                buttonText='Out of Business'
                onClick={this.handleClick}></MediumButton>
			 </div>

       <VerificationPortalForm
			    outOfBiz={this.state.outOfBiz}
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
	}
}

export default injectSheet(styles)(VerificationPortal)
