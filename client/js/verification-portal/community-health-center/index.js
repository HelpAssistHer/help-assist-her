import React from 'react'
import CommunityHealtCenterForm from './form'
import { chcInputResource } from './chcInputResource'

const handleSubmit = values => {
	console.log(' CHC form values == ', values)
}

const CommunityHealthCenterContainer = () => (
	<div>
		<CommunityHealtCenterForm
			chcInputResource={chcInputResource}
			onSubmit={handleSubmit}
		/>
	</div>
)

export default CommunityHealthCenterContainer
