import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React from 'react'
import injectSheet from 'react-jss'

import GetResourceToVerifyButton from './get-resource-to-verify-button'
import Spacer from '../components/spacer'
import VerificationPortalForm from './form'
import { updateResource } from './action-creators'
import HahTheme from '../theme/hah-theme'
import AppBar from 'material-ui/AppBar'

const hahTheme = getMuiTheme(HahTheme)

class VerificationPortal extends React.Component {
	submit = (values) => {
		updateResource(values)
	}
	render() {
		const { classes, changeFieldValue } = this.props

		return (
			<MuiThemeProvider muiTheme={hahTheme}>
				<div className="container-small">
					<div className="container-fluid">
						<div className="row">
							<div className="col-sm-4" >.col-sm-4</div>
							<div className="col-sm-4" >.col-sm-4</div>
							<div className="col-sm-4" >.col-sm-4</div>
						</div>
						<div className={classes.verificationPortal}>
						<h1>VERIFICATION PORTAL</h1>
						<GetResourceToVerifyButton
							changeFieldValue={changeFieldValue}
						/>

						<VerificationPortalForm
							onSubmit={this.submit}
						/>
						<Spacer height='100px'/>
						</div>
					</div>
				</div>
			</MuiThemeProvider>
		)
	}
}


const styles = {
	verificationPortal: {
		'text-align': 'center',
	},
}

VerificationPortal = injectSheet(styles)(VerificationPortal)

export default VerificationPortal
