import React from 'react'
import { connect } from 'react-redux'
import CommunityHealtCenterForm from './form'
import { chcInputResource } from './chc-input-resource'
import { submitForm } from './action-creators'

const handleSubmit = values => {
	return submitForm(values)
}

const CommunityHealthCenter = () => (
	<div>
		<CommunityHealtCenterForm
			chcInputResource={chcInputResource}
			onSubmit={handleSubmit}
		/>
	</div>
)

const CommunityHealthCenterContainer = connect()(CommunityHealthCenter)
export default CommunityHealthCenterContainer
