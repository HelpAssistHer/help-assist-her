import React from 'react'
import { Provider } from 'react-redux'
import { render } from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import reducer from './reducers'
import thunk from 'redux-thunk'

import App from './app'

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

const enhancer = devTools ? compose(applyMiddleware(thunk), devTools) : applyMiddleware(thunk)

export const store = createStore(reducer, enhancer)

render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root'),
)
