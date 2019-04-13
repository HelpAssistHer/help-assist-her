import React from 'react'
import injectSheet from 'react-jss'
import { Link } from 'react-router-dom'

import { Phone, Desktop } from '../components/breakpoints'
import Spacer from '../components/spacer'
import LogoBetaBlack from '../components/icons/icon-components/logo-beta-black'
import HamburgerMenu from '../components/icons/icon-components/hamburger-menu'

const LogoAndNavigation = ({ classes }) => (
	<div>
		<Phone>
			<div className={classes.headerPhone}>
				<div className={classes.logoPhone}>
					<Link to="/mini-app">
						<LogoBetaBlack height={25} width={160} />
					</Link>
					<Link to="/menu" className={classes.hamburgerMenuPhone}>
						<HamburgerMenu />
					</Link>
				</div>
			</div>
		</Phone>

		<Desktop>
			<div className={classes.headerDesktop}>
				<div className={classes.logoDesktop}>
					<Link to="/mini-app">
						<LogoBetaBlack height={33} width={208} />
					</Link>
					<div className={classes.linksDesktop}>
						<Link to="/about" className={classes.navigationLinkDesktop}>
							About
						</Link>
						<Spacer width="32px" />
						<Link to="/feedback" className={classes.navigationLinkDesktop}>
							Feedback
						</Link>
					</div>
				</div>
			</div>
		</Desktop>
	</div>
)

const styles = {
	headerPhone: {
		'border-bottom': '1px solid #3D65F9',
	},
	headerDesktop: {
		'border-bottom': '4px solid #3D65F9',
	},
	logoPhone: {
		height: '55px',
		padding: '0 5% 0 5%',
		'background-color': '#FFFFFF',
		'min-width': '90vw',
		display: 'flex',
		'align-items': 'center',
		'justify-content': 'space-between',
		'border-bottom': '1px solid #3D65F9',
		position: 'fixed',
		top: '0vh',
	},
	logoDesktop: {
		height: '100px',
		padding: '0px 134px 0px 42px',
		'background-color': '#FFFFFF',
		'min-width': '90vw',
		display: 'flex',
		'align-items': 'center',
		'justify-content': 'space-between',
		position: 'fixed',
		top: '0vh',
		'border-bottom': '4px solid #3D65F9',
	},
	hamburgerMenuPhone: {
		cursor: 'pointer',
	},
	linksDesktop: {
		display: 'flex',
	},
	navigationLinkDesktop: {
		'font-family': 'hah-regular',
		'font-size': '18px',
		color: '#000000',
		'text-decoration': 'none',
		cursor: 'pointer',
	},
}

export default injectSheet(styles)(LogoAndNavigation)
