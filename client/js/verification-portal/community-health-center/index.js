import React from 'react'
import CommunityHealtCenterForm from './form'
import { chcInputResource } from './chcInputResource'

const handleSubmit = values => {
	alert(values.nameOfCHC)
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
