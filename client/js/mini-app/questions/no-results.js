import React from 'react'
import injectSheet from 'react-jss'

const noResultsMessage = 'No results match your search.'
const onlyInNyMessage =
	'We currently only have resources in the state of New York.'

const NoResults = ({ classes }) => {
	return <div className={classes.noResultsRoot}>{noResultsMessage}</div>
}

const styles = {
	noResultsRoot: {
		height: '100%',
		display: 'flex',
		'flex-direction': 'column',
		'justify-content': 'space-between',
		'background-color': 'rgba(93,93,93,0.08)',
	},
}

export default injectSheet(styles)(NoResults)
