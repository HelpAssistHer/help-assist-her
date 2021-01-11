import React from 'react'
import injectSheet from 'react-jss'
import { Link } from 'react-router-dom'

import { Phone, BigPhone, Tablet, Desktop } from './Breakpoints'
import Spacer from './Spacer'
import LogoBetaBlack from './icons/icon-components/logo-beta-black'
import HamburgerMenu from './icons/icon-components/hamburger-menu'
import EmergencyPhoneIcon from './icons/icon-components/emergency-phone-icon'

const LogoAndNavigation = ({ classes }) => (
	<div>
		<Phone>
			<div className={classes.headerPhone}>
				<Link to="/mini-app" className={classes.logoPhone}>
					<LogoBetaBlack height={25} width={160} />
				</Link>

				<Link to="/emergency" className={classes.emergencyIconPhone}>
					<EmergencyPhoneIcon height={24} width={24} />
				</Link>

				<Link to="/menu" className={classes.hamburgerMenuPhone}>
					<HamburgerMenu />
				</Link>
			</div>
		</Phone>

		<BigPhone>
			<div className={classes.headerPhone}>
				<Link to="/mini-app" className={classes.logoPhone}>
					<LogoBetaBlack height={25} width={160} />
				</Link>

				<Link to="/emergency" className={classes.emergencyIconPhone}>
					<EmergencyPhoneIcon height={24} width={24} />
				</Link>

				<Link to="/menu" className={classes.hamburgerMenuPhone}>
					<HamburgerMenu />
				</Link>
			</div>
		</BigPhone>

		<Tablet>
			<div className={classes.headerDesktop}>
				<Link to="/mini-app">
					<LogoBetaBlack height={33} width={208} />
				</Link>
				<div className={classes.linksDesktop}>
					<Link to="/about" className={classes.navigationLinkDesktop}>
						About
					</Link>
					{/* <Spacer width="32px" /> */}
					{/* <Link to="/feedback" className={classes.navigationLinkDesktop}>
						Feedback
					</Link> */}
					<Spacer width="52px" />
					<Link to="/emergency">
						<EmergencyPhoneIcon height={38} width={38} />
					</Link>
				</div>
			</div>
		</Tablet>

		<Desktop>
			<div className={classes.headerDesktop}>
				<Link to="/mini-app">
					<LogoBetaBlack height={33} width={208} />
				</Link>
				<div className={classes.linksDesktop}>
					<Link to="/about" className={classes.navigationLinkDesktop}>
						About
					</Link>
					{/* <Spacer width="32px" /> */}
					{/* <Link to="/feedback" className={classes.navigationLinkDesktop}>
						Feedback
					</Link> */}
					<Spacer width="52px" />
					<Link to="/emergency">
						<EmergencyPhoneIcon height={38} width={38} />
					</Link>
				</div>
			</div>
		</Desktop>
	</div>
)

const styles = {
	headerPhone: {
		display: 'grid',
		'grid-template-columns': '70% 15% 15%',
		'align-items': 'center',
		'justify-items': 'end',
		position: 'fixed',
		top: '0vh',
		height: '55px',
		padding: '0 5% 0 5%',
		'background-color': '#FFFFFF',
		'min-width': '90vw',
		'border-bottom': '1px solid #3D65F9',
		'z-index': 1,
	},
	logoPhone: {
		'grid-column-start': 1,
		'grid-column-end': 2,
		'justify-self': 'start',
	},
	emergencyIconPhone: {
		'grid-column-start': 2,
		'grid-column-end': 3,
	},
	hamburgerMenuPhone: {
		cursor: 'pointer',
		'grid-column-start': 3,
		'grid-column-end': 4,
	},
	headerDesktop: {
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
		'z-index': 1,
	},
	linksDesktop: {
		display: 'flex',
		'align-items': 'center',
	},
	navigationLinkDesktop: {
		'font-family': 'hah-regular',
		'font-size': '16px',
		color: '#000000',
		'text-decoration': 'none',
		cursor: 'pointer',
	},
}

export default injectSheet(styles)(LogoAndNavigation)
