import React from 'react'
import { connect } from 'react-redux'

import FacebookLoginButton from './view'
import { getInitialAppData } from '../../hah-app/action-creators'
import { store } from '../../hah-app/index'

const FacebookLoginButtonContainer = ({ dispatch }) => {
	dispatch(getInitialAppData())
		.then(() => {
			const fbAppId = store.getState().initialData.facebookAppId
			return <FacebookLoginButton fbAppId={fbAppId}/>
		})

	return null
}

export default connect()(FacebookLoginButtonContainer)
