import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React from 'react'

import '../../assets/css/app.css'


import Header from './header'
import Main from './main'
import HahTheme from '../theme/hah-theme'

injectTapEventPlugin();
const hahTheme = getMuiTheme(HahTheme)


class App extends React.Component {

	render() {
		return (
			<MuiThemeProvider muiTheme={hahTheme}>
				<div id='main-app'>
					<Header />
					<Main />
				</div>
			</MuiThemeProvider>
		)
	}
}

export default App


