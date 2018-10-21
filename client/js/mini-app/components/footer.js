import React from 'react'
import injectSheet from 'react-jss'

const MiniAppFooter = ({ classes }) => {
	return <div className={classes.footerRoot} />
}

const styles = {
	footerRoot: {
		height: '188px',
		'background-color': '#3d65f9',
		'margin-top': '100px',
	},
}

export default injectSheet(styles)(MiniAppFooter)
