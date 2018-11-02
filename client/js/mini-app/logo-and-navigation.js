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
			<div className={classes.logoAndNavigationPhone}>
				<div className={classes.logoPhone}>
					<LogoBetaBlack height={25} width={160} />
					<Link to="/menu" className={classes.hamburgerMenuPhone}>
						<HamburgerMenu />
					</Link>
				</div>
			</div>
		</Phone>

		<Desktop>
			<div className={classes.logoAndNavigationDesktop}>
				<div className={classes.logoDesktop}>
					<LogoBetaBlack height={33} width={208} />
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
	logoAndNavigationPhone: {
		'border-bottom': '1px solid #3D65F9',
	},
	logoAndNavigationDesktop: {
		'border-bottom': '4px solid #3D65F9',
	},
	logoPhone: {
		height: '55px',
		margin: '0px 16px 0px 17px',
		display: 'flex',
		'align-items': 'center',
		'justify-content': 'space-between',
	},
	logoDesktop: {
		height: '100px',
		margin: '0px 134px 0px 42px',
		display: 'flex',
		'align-items': 'center',
		'justify-content': 'space-between',
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
