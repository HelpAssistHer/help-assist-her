import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import { getResourceToVerify } from '../pregnancy-resource-center/action-creators'
import Button from '../../components/button'
import { store } from '../../hah-app/index'
import { updateOutOfBusinessActionCreator } from '../out-of-business/action-creators'
import { updateDoNotListActionCreator } from '../do-not-list/action-creators'
import { withRouter } from 'react-router-dom'

const populateForm = ({ changeFieldValue, resource }) => {
	let {
		prcName,
		email,
		address,
		notes,
		phone,
		hotlinePhoneNumber,
		verifiedData,
		website,
	} = resource

	changeFieldValue('prcName', prcName)
	changeFieldValue(
		'verifiedData.prcName.verified',
		_.get(verifiedData, 'prcName.verified'),
	)

	changeFieldValue('address.line1', _.get(address, 'line1'))
	changeFieldValue('address.line2', _.get(address, 'line2'))
	changeFieldValue('address.city', _.get(address, 'city'))
	changeFieldValue('address.state', _.get(address, 'state'))
	changeFieldValue('address.zip', _.get(address, 'zip'))
	changeFieldValue(
		'verifiedData.address.verified',
		_.get(verifiedData, 'address.verified'),
	)

	changeFieldValue('phone', phone)
	changeFieldValue(
		'verifiedData.phone.verified',
		_.get(verifiedData, 'phone.verified'),
	)
	changeFieldValue('hotlinePhoneNumber', hotlinePhoneNumber)
	changeFieldValue(
		'verifiedData.hotlinePhoneNumber.verified',
		_.get(verifiedData, 'hotlinePhoneNumber.verified'),
	)

	changeFieldValue('email', email)
	changeFieldValue(
		'verifiedData.email.verified',
		_.get(verifiedData, 'email.verified'),
	)

	changeFieldValue('website', website)
	changeFieldValue(
		'verifiedData.website.verified',
		_.get(verifiedData, 'website.verified'),
	)

	changeFieldValue('notes', notes)
}

const GetResourceToVerifyButton = ({ dispatch, changeFieldValue, history }) => {
	return (
		<div>
			<Button
				size="large"
				buttonText="Verify Next Resource"
				onClick={() => {
					dispatch(getResourceToVerify()).then(result => {
						dispatch(
							updateOutOfBusinessActionCreator(!!result.resource.outOfBusiness),
						)
						dispatch(updateDoNotListActionCreator(result.resource.doNotList))
						populateForm({
							changeFieldValue,
							resource: store.getState().resource,
						})
						history.push(
							`/verification/pregnancy-resource-center/${
								store.getState().resource._id
							}`,
						)
					})
				}}
			/>
		</div>
	)
}

export default connect()(withRouter(GetResourceToVerifyButton))
