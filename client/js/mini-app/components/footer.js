import React from 'react'
import { Link } from 'react-router-dom'
import injectSheet from 'react-jss'

import Spacer from '../../components/spacer'
import LogoBetaWhite from '../../components/icons/icon-components/logo-beta-white'
import SocialMedia from './social-media'

const MiniAppFooter = ({ classes }) => (
	<div>
		<Spacer height="87px" />
		<div className={classes.footerRoot}>
			<div>
				<LogoBetaWhite height={25} width={160} />
				<Spacer height="19px" />
				<div className={classes.copyrightText}>&copy; Help Assist Her 2018</div>
			</div>

			<div className={classes.links}>
				<Link to="/about" className={classes.navigationLink}>
					About
				</Link>
				<Link to="/feedback" className={classes.navigationLink}>
					Feedback
				</Link>
			</div>

			<SocialMedia />
		</div>
	</div>
)

const styles = {
	footerRoot: {
		display: 'flex',
		'justify-content': 'space-between',
		height: '114px',
		'background-color': '#3D65F9',
		padding: '35px 82px 0px 44px',
	},
	links: {
		display: 'flex',
		'flex-direction': 'column',
	},
	navigationLink: {
		'font-family': 'hah-regular',
		'font-size': '18px',
		color: '#FFFFFF',
		'text-decoration': 'none',
		'margin-bottom': '24px',
	},
	copyrightText: {
		'font-family': 'hah-regular',
		'font-size': '10px',
		color: '#ABD3F9',
	},
}

export default injectSheet(styles)(MiniAppFooter)
