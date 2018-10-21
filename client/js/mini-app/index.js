import { connect } from 'react-redux'
import { change } from 'redux-form'

import MiniApp from './view'

const mapDispatchToProps = dispatch => {
	return {
		changeFieldValue: (field, value) => {
			dispatch(change('miniApp', field, value || ''))
		},
	}
}

const MiniAppContainer = connect(mapDispatchToProps)(MiniApp)

export default MiniAppContainer
