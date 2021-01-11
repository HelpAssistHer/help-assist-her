import '../styles/global.css'

import React, { useEffect, useState } from 'react'
import injectSheet from 'react-jss'

import HahRouter from '../Router'
import { getInitialAppData } from '../action-creators'
import { useDispatch } from 'react-redux'

function App({ classes }) {
	const [loaded, setLoaded] = useState(false)
	const dispatch = useDispatch()

	useEffect(() => {
		;(async () => {
			// this isn't great to wait for since most pages don't need it
			// will fix by encoding API keys via webpack config.
			await dispatch(getInitialAppData())
			setLoaded(true)
		})()
	}, [])

	return loaded ? (
		<div id="app" className={classes.app}>
			<HahRouter />
		</div>
	) : null
}

const styles = {
	app: {
		height: '100%',
		margin: '0',
	},
}
export default injectSheet(styles)(App)
