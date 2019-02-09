import React from 'react'
import injectSheet from 'react-jss'

import StepOne from './step-one'

const Questions = () => (
	<div>
		<StepOne />
	</div>
)

const styles = {}

export default injectSheet(styles)(Questions)
