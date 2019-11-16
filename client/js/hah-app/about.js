import React from 'react'
import injectSheet from 'react-jss'

import Spacer from '../components/spacer'
import Footer from '../mini-app/components/footer'
import LogoAndNavigation from '../mini-app/logo-and-navigation'
import Team from './team'
import { Phone, Tablet, Desktop } from '../components/breakpoints'
import { ScrollToTop } from '../components/scroll-to-top'

const TITLE_TEXT = 'What is Help Assist Her?'

const BODY_TEXT =
	'Let’s face it, googling for answers just isn’t cutting it. We could all use a little help navigating and assessing the myriad of ' +
	"women's healthcare resources out there. Whether you don’t know yet what you’re looking for or just don’t know where to find it in " +
	'your area, Help Assist Her is designed to simplify the process. Our database is being constantly verified and updated so that you or ' +
	'someone you love can locate the healthcare provider you need.'

const TEAM_HEADING = 'The Team'

const TEAM_BODY = 'The dream team that makes all of this possible!'

const About = ({ classes }) => (
	<div>
		<ScrollToTop />
		<LogoAndNavigation />

		<Phone>
			<div className={classes.aboutPageContainerPhone}>
				<Spacer height="36px" />
				<div className={classes.titlePhone}>{TITLE_TEXT}</div>
				<Spacer height="28px" />
				<div className={classes.bodyPhone}>
					<div className={classes.bodyTextItem}>{BODY_TEXT}</div>
				</div>
				<Spacer height="36px" />
				<img
					className={classes.imagePhone}
					src="../img/women-on-phones.jpg"
					alt="Women on mobile phones"
				/>
				<Spacer height="36px" />
				<div className={classes.titlePhone}>{TEAM_HEADING}</div>
				<Spacer height="3px" />
				<div className={classes.bodyPhone}>
					<div className={classes.bodyTextItem}>{TEAM_BODY}</div>
				</div>
				<Spacer height="36px" />
			</div>
		</Phone>

		<Tablet>
			<div className={classes.aboutPageContainerDesktop}>
				<Spacer height="60px" />
				<div className={classes.titleDesktop}>{TITLE_TEXT}</div>
				<Spacer height="30px" />
				<div className={classes.bodyDesktop}>
					<div className={classes.bodyTextItem}>{BODY_TEXT}</div>
				</div>
				<Spacer height="60px" />
				<img
					className={classes.imageDesktop}
					src="../img/women-on-phones.jpg"
					alt="Women on mobile phones"
				/>
				<Spacer height="70px" />
				<div className={classes.titleDesktop}>{TEAM_HEADING}</div>
				<Spacer height="27px" />
				<div className={classes.bodyDesktop}>
					<div className={classes.bodyTextItem}>{TEAM_BODY}</div>
				</div>
				<Spacer height="65px" />
			</div>
		</Tablet>

		<Desktop>
			<div className={classes.aboutPageContainerDesktop}>
				<Spacer height="60px" />
				<div className={classes.titleDesktop}>{TITLE_TEXT}</div>
				<Spacer height="30px" />
				<div className={classes.bodyDesktop}>
					<div className={classes.bodyTextItem}>{BODY_TEXT}</div>
				</div>
				<Spacer height="60px" />
				<img
					className={classes.imageDesktop}
					src="../img/women-on-phones.jpg"
					alt="Women on mobile phones"
				/>
				<Spacer height="70px" />
				<div className={classes.titleDesktop}>{TEAM_HEADING}</div>
				<Spacer height="27px" />
				<div className={classes.bodyDesktop}>
					<div className={classes.bodyTextItem}>{TEAM_BODY}</div>
				</div>
				<Spacer height="65px" />
			</div>
		</Desktop>

		<Team />

		<Phone>
			<Spacer height="36px" />
		</Phone>

		<Tablet>
			<Spacer height="152px" />
		</Tablet>

		<Desktop>
			<Spacer height="152px" />
		</Desktop>

		<Footer />
	</div>
)

const styles = {
	aboutPageContainerPhone: {
		margin: '55px 0px 0px 0px',
	},
	aboutPageContainerDesktop: {
		margin: '100px 0px 0px 0px',
	},
	titlePhone: {
		color: '#000000',
		'font-family': 'hah-regular',
		'font-size': '20px',
		'line-height': '28px',
		'text-align': 'center',
	},
	titleDesktop: {
		color: '#000000',
		'font-family': 'hah-regular',
		'font-size': '40px',
		'line-height': '48px',
		'text-align': 'center',
	},
	bodyPhone: {
		color: '#000000',
		'font-family': 'hah-regular',
		'font-size': '14px',
		'line-height': '20px',
		'text-align': 'center',
		display: 'grid',
		'grid-template-columns': '5% 90% 5%',
	},
	bodyDesktop: {
		color: '#000000',
		'font-family': 'hah-regular',
		'font-size': '20px',
		'line-height': '35px',
		'text-align': 'center',
		display: 'grid',
		'grid-template-columns': '20% 60% 20%',
	},
	bodyTextItem: {
		'grid-column-start': 2,
		'grid-column-end': 3,
	},
	imagePhone: {
		height: '100%',
		width: '100%',
	},
	imageDesktop: {
		height: '100%',
		width: '100%',
	},
}

export default injectSheet(styles)(About)
