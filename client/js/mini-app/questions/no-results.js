import React from 'react'
import injectSheet from 'react-jss'
import { Link } from 'react-router-dom'
import Button from '../components/button'

const noResultsMessage = 'No results match your search.'

const NoResults = ({ classes }) => {
	// todo
	return (
		<div className={classes.noResultsRoot}>
			{noResultsMessage}
			<Link to="/mini-app2">
				<Button buttonText="Return to Search" />
			</Link>
		</div>
	)
}

const styles = {
	noResultsRoot: {
		display: 'flex',
		'justify-content': 'space-between',
		color: '#000000',
		'font-family': 'hah-regular',
		'font-size': '33px',
		'line-height': '34px',
		border: '3px solid #3D65F9',
		'border-radius': '2px',
		'background-color': '#FFFFFF',
		margin: '56px',
		padding: '41px 80px 41px 80px', //todo check
	},
}

export default injectSheet(styles)(NoResults)
