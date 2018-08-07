import React from 'react'
import injectSheet from 'react-jss'

const ResourceTypeButton = ({ classes, onClick }) => {
	return (
		<div className={classes.root}>
			<button type="submit" onClick={onClick}>
				Pregnancy Centers
			</button>
		</div>
	)
}

const styles = {
	root: {
		height: '0px',
	},
}

export default injectSheet(styles)(ResourceTypeButton)
