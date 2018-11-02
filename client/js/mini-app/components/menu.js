import React from 'react'
import injectSheet from 'react-jss'
import { Link } from 'react-router-dom'

import Spacer from '../../components/spacer'
import LogoBetaWhite from '../../components/icons/icon-components/logo-beta-white'
import ExitWhite from '../../components/icons/icon-components/exit-white'

const Menu = ({ classes }) => {
	return (
		<div className={classes.menu}>
			<div className={classes.logoAndExit}>
				<LogoBetaWhite height={25} width={160} />
				<ExitWhite height={16} width={16} />
			</div>

			<div className={classes.links}>
				<Link to="/about" className={classes.navigationLinkPhone}>
					About
				</Link>
				<Spacer height="32px" />
				<Link to="/feedback" className={classes.navigationLinkPhone}>
					Feedback
				</Link>
			</div>
		</div>
	)
}

const styles = {
	menu: {
		position: 'fixed',
		width: '100%',
		height: '100%',
		'background-color': '#3D65F9',
	},
	logoAndExit: {
		display: 'flex',
		'justify-content': 'space-between',
		'border-bottom': '1px solid #FFFFFF',
		padding: '20px 25px 20px 20px',
	},
	links: {
		display: 'flex',
		'flex-direction': 'column',
		padding: '45px 0px 0px 24px',
	},
	navigationLinkPhone: {
		'font-family': 'hah-regular',
		'font-size': '24px',
		color: '#FFFFFF',
		'text-decoration': 'none',
		cursor: 'pointer',
	},
}

export default injectSheet(styles)(Menu)
