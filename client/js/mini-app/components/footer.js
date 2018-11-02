import React from 'react'
import { Link } from 'react-router-dom'
import injectSheet from 'react-jss'

import Spacer from '../../components/spacer'
import LogoBetaWhite from '../../components/icons/icon-components/logo-beta-white'

const MiniAppFooter = ({ classes }) => {
	return (
		<div>
			<Spacer height="100px" />
			<div className={classes.footerRoot}>
				<LogoBetaWhite height={25} width={160} />
				<Link to="/about" className={classes.navigationLink}>
					About
				</Link>
				<Link to="/feedback" className={classes.navigationLink}>
					Feedback
				</Link>
				<div className={classes.copyrightText}>&copy; Help Assist Her 2018</div>
			</div>
		</div>
	)
}

const styles = {
	footerRoot: {
		height: '149px',
		'background-color': '#3D65F9',
	},
	navigationLink: {
		'font-family': 'hah-regular',
		'font-size': '18px',
		color: '#FFFFFF',
		'text-decoration': 'none',
	},
	copyrightText: {
		'font-family': 'hah-regular',
		'font-size': '10px',
		color: '#ABD3F9',
	},
}

export default injectSheet(styles)(MiniAppFooter)
