import React from 'react'

import Instruction from './instruction'
import ResourceCarousel from './resource-carousel'

const StepOne = () => (
	<div>
		<Instruction
			stepNumber="STEP ONE"
			stepDescription="Select one of the following:"
		/>
		<ResourceCarousel />
	</div>
)

export default StepOne
