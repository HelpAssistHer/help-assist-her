import React from 'react'

import Instruction from './instruction'
import ResourceCarousel from './resource-carousel'

const StepOne = ({ buttonClicked, onResourceChange }) => (
	<div>
		<Instruction
			stepNumber="STEP ONE"
			stepDescription="Select one of the following:"
		/>
		<ResourceCarousel
			buttonClicked={buttonClicked}
			onResourceChange={onResourceChange}
		/>
	</div>
)

export default StepOne
