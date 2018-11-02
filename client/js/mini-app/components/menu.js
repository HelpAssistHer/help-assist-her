import React from 'react'
import { connect } from 'react-redux'
import injectSheet from 'react-jss'
import { Link, withRouter } from 'react-router-dom'

import Spacer from '../../components/spacer'
import LogoBetaWhite from '../../components/icons/icon-components/logo-beta-white'
import ExitWhite from '../../components/icons/icon-components/exit-white'
import FacebookWhite from '../../components/icons/icon-components/facebook-white'
import TwitterWhite from '../../components/icons/icon-components/twitter-white'
import InstagramWhite from '../../components/icons/icon-components/instagram-white'

const HAH_FACEBOOK_URL = 'https://www.facebook.com/HelpAssistHer/'
const HAH_TWITTER_URL = 'https://twitter.com/helpassisther'
const HAH_INSTAGRAM_URL = 'https://www.instagram.com/helpassisther/'

const MenuWithStyle = ({ classes, history }) => (
	<div className={classes.menu}>
		<div className={classes.logoAndExit}>
			<LogoBetaWhite height={25} width={160} />
			<button className={classes.exitButton} onClick={() => history.goBack()}>
				<ExitWhite height={16} width={16} />
			</button>
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

		<div className={classes.socialMedia}>
			<a href={HAH_FACEBOOK_URL} target="_blank" rel="noopener noreferrer">
				<FacebookWhite height={41} width={41} />
			</a>
			<Spacer width="14px" />

			<a href={HAH_TWITTER_URL} target="_blank" rel="noopener noreferrer">
				<TwitterWhite height={41} width={41} />
			</a>
			<Spacer width="14px" />

			<a href={HAH_INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
				<InstagramWhite height={41} width={41} />
			</a>
		</div>
	</div>
)

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
	exitButton: {
		cursor: 'pointer',
		'background-color': '#3D65F9',
		border: 'none',
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
	socialMedia: {
		display: 'flex',
		padding: '48px 0px 0px 23px',
	},
}

const Menu = injectSheet(styles)(MenuWithStyle)
export default connect()(withRouter(Menu))
