import React from 'react'
import { Link } from 'react-router-dom'
import injectSheet from 'react-jss'

import Spacer from '../../components/spacer'

const MiniAppFooter = ({ classes }) => {
	return (
		<div>
			<Spacer height="100px" />
			<div className={classes.footerRoot}>
				<Link to="/about" className={classes.navigationLink}>
					About
				</Link>
				<Link to="/feedback" className={classes.navigationLink}>
					Feedback
				</Link>
			</div>
		</div>
	)
}

const styles = {
	footerRoot: {
		height: '188px',
		'background-color': '#3d65f9',
	},
	navigationLink: {
		'font-family': 'sans-serif',
		'font-size': '18px',
		color: '#ffffff',
		'text-decoration': 'none',
	},
}

export default injectSheet(styles)(MiniAppFooter)
