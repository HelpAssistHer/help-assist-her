import React from 'react'
import injectSheet from 'react-jss'
import { Link } from 'react-router-dom'

import Spacer from '../../components/spacer'

const Menu = ({ classes }) => {
	return (
		<div className={classes.menu}>
			<Link to="/about" className={classes.navigationLinkPhone}>
				About
			</Link>
			<Spacer height="32px" />
			<Link to="/feedback" className={classes.navigationLinkPhone}>
				Feedback
			</Link>
		</div>
	)
}

const styles = {
	menu: {
		display: 'flex',
		'flex-direction': 'column',
		position: 'fixed',
		width: '100%',
		height: '100%',
		'background-color': '#3D65F9',
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
