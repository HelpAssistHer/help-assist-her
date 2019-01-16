import React from 'react'
import { connect } from 'react-redux'
import CommunityHealthCenterForm from './form'
import { chcFormFields } from './chc-form-fields'
import { submitForm } from './action-creators'

const handleSubmit = values => {
	return submitForm(values)
}

const CommunityHealthCenter = () => (
	<div>
		<CommunityHealthCenterForm
			chcFormFields={chcFormFields}
			onSubmit={handleSubmit}
		/>
	</div>
)

const CommunityHealthCenterContainer = connect()(CommunityHealthCenter)
export default CommunityHealthCenterContainer
