import React from 'react'

import Instruction from './StepInstruction'
import ResourceCarousel from './ResourceCarousel'

const StepOne = ({ buttonClicked, onResourceChange }) => (
	<div>
		<Instruction
			stepNumber="STEP ONE"
			stepDescription="What type of healthcare resource are you looking for?"
		/>
		<ResourceCarousel
			buttonClicked={buttonClicked}
			onResourceChange={onResourceChange}
		/>
	</div>
)

export default StepOne
