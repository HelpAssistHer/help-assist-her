import React from 'react'
import injectSheet from 'react-jss'
import { Link } from 'react-router-dom'
import Button from '../components/button'

const noResultsMessage = 'No results match your search.'

const NoResults = ({ classes }) => (
	<div className={classes.noResultsRoot}>
		{noResultsMessage}
		<Link to="/mini-app">
			<Button buttonText="Return to Search" />
		</Link>
	</div>
)

const styles = {
	noResultsRoot: {
		display: 'flex',
		'justify-content': 'space-between',
		'align-items': 'center',
		color: '#000000',
		'font-family': 'hah-regular',
		'font-size': '33px',
		'line-height': '34px',
		border: '3px solid #3D65F9',
		'border-radius': '2px',
		'background-color': '#FFFFFF',
		margin: '56px',
		padding: '41px 80px 41px 80px',
	},
}

export default injectSheet(styles)(NoResults)
