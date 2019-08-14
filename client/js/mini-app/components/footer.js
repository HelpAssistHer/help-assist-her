import React from 'react'
import { Link } from 'react-router-dom'
import injectSheet from 'react-jss'

import { Phone, Tablet, Desktop } from '../../components/breakpoints'
import Spacer from '../../components/spacer'
import LogoBetaWhite from '../../components/icons/icon-components/logo-beta-white'
import SocialMedia from './social-media'

const COPYRIGHT_TEXT = 'Help Assist Her 2019'

const Footer = ({ classes }) => (
	<div>
		<Phone>
			<div>
				<div className={classes.footerRootPhone}>
					<SocialMedia iconSize={32} spacerWidth="20px" />
					<Spacer width="25px" />
					<div className={classes.copyrightText}>&copy; {COPYRIGHT_TEXT}</div>
				</div>
			</div>
		</Phone>

		<Tablet>
			<div>
				<div className={classes.footerRootDesktop}>
					<div>
						<LogoBetaWhite height={25} width={160} />
						<Spacer height="19px" />
						<div className={classes.copyrightText}>&copy; {COPYRIGHT_TEXT}</div>
					</div>

					<div className={classes.links}>
						<Link to="/about" className={classes.navigationLink}>
							About
						</Link>
						<Link to="/feedback" className={classes.navigationLink}>
							Feedback
						</Link>
					</div>

					<div className={classes.socialMediaFormatting}>
						<SocialMedia iconSize={49} spacerWidth="19px" />
					</div>
				</div>
			</div>
		</Tablet>

		<Desktop>
			<div>
				<div className={classes.footerRootDesktop}>
					<div>
						<LogoBetaWhite height={25} width={160} />
						<Spacer height="19px" />
						<div className={classes.copyrightText}>&copy; {COPYRIGHT_TEXT}</div>
					</div>

					<div className={classes.links}>
						<Link to="/about" className={classes.navigationLink}>
							About
						</Link>
						<Link to="/feedback" className={classes.navigationLink}>
							Feedback
						</Link>
					</div>

					<div className={classes.socialMediaFormatting}>
						<SocialMedia iconSize={49} spacerWidth="19px" />
					</div>
				</div>
			</div>
		</Desktop>
	</div>
)

const styles = {
	footerRootPhone: {
		display: 'flex',
		'justify-content': 'center',
		'align-items': 'center',
		height: '74px',
		'background-color': '#3D65F9',
	},
	footerRootDesktop: {
		display: 'grid',
		'grid-template-columns': '31% 21% 48%',
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
	socialMediaFormatting: {
		'justify-self': 'end',
	},
}

export default injectSheet(styles)(Footer)
