import React from 'react'

import Instruction from './instruction'
import MiniAppForm from '../form'

const StepTwo = () => (
	<div>
		<Instruction stepNumber="STEP TWO" stepDescription="Enter your location:" />
		<MiniAppForm onSubmit={this.submit} />
	</div>
)

export default StepTwo
