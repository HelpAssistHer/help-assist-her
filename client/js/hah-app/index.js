import React from 'react'
import { Provider } from 'react-redux'
import { render } from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import reducer from './reducers'
import thunk from 'redux-thunk'
import { BrowserRouter } from 'react-router-dom'

import App from './app'


// this is what is making the app error when redux devtools isn't installed
const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

export const store = createStore(
	reducer,
	compose(
		applyMiddleware(thunk),
		devTools
	)
)

render (
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
 	</Provider>,
	document.getElementById('root')
)
