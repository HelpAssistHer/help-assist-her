import React from 'react'
import injectSheet from 'react-jss'
import { Link } from 'react-router-dom'

import { Phone, Tablet, Desktop } from '../components/breakpoints'
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

		<Tablet>
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
		</Tablet>

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
	logoPhone: {
		position: 'fixed',
		top: '0vh',
		height: '55px',
		padding: '0 5% 0 5%',
		display: 'flex',
		'align-items': 'center',
		'justify-content': 'space-between',
		'background-color': '#FFFFFF',
		'min-width': '90vw',
		'border-bottom': '1px solid #3D65F9',
	},
	logoDesktop: {
		position: 'fixed',
		top: '0vh',
		height: '67px',
		padding: '33px 100% 0px 42px',
		display: 'flex',
		'align-items': 'baseline',
		'justify-content': 'space-between',
		'background-color': '#FFFFFF',
		'min-width': '90vw',
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
