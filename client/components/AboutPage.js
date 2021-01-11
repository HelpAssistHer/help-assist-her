import React from 'react'
import injectSheet from 'react-jss'
import Imgix from 'react-imgix'

import Spacer from './Spacer'
import Footer from './Footer'
import LogoAndNavigation from './LogoAndNavigation'
import { Phone, BigPhone, Tablet, Desktop } from './Breakpoints'
import { ScrollToTop } from './ScrollToTop'

const TITLE_TEXT = 'What is Help Assist Her?'

const BODY_TEXT = `
	Help Assist Her is an app that allows you to search for resources based on what you need and where you are.
	We've got your back. You are strong, and you don't have to do it alone.

	We will help you find, affordable and emergency housing, abuse and homeless shelters,
	food assistance, health clinics, affordable healthcare, OB/GYN care, baby and kid supplies,	help paying bills,
	counseling, affordable childcare etc.	We've included some guides for tapping into social services as well.
`
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
				<Imgix
					className={classes.imagePhone}
					src="https://helpassisther.imgix.net/women-on-phones.jpg"
					alt="Women on mobile phones"
					sizes="100vw"
				/>
				<Spacer height="36px" />
				{/* <div className={classes.titlePhone}>{TEAM_HEADING}</div>
				<Spacer height="3px" />
				<div className={classes.bodyPhone}>
					<div className={classes.bodyTextItem}>{TEAM_BODY}</div>
				</div>
				<Spacer height="36px" /> */}
			</div>
		</Phone>

		<BigPhone>
			<div className={classes.aboutPageContainerPhone}>
				<Spacer height="36px" />
				<div className={classes.titlePhone}>{TITLE_TEXT}</div>
				<Spacer height="28px" />
				<div className={classes.bodyPhone}>
					<div className={classes.bodyTextItem}>{BODY_TEXT}</div>
				</div>
				<Spacer height="36px" />
				<Imgix
					className={classes.imagePhone}
					src="https://helpassisther.imgix.net/women-on-phones.jpg"
					alt="Women on mobile phones"
					sizes="100vw"
				/>
				<Spacer height="36px" />
				{/* <div className={classes.titlePhone}>{TEAM_HEADING}</div>
				<Spacer height="3px" />
				<div className={classes.bodyPhone}>
					<div className={classes.bodyTextItem}>{TEAM_BODY}</div>
				</div>
				<Spacer height="36px" /> */}
			</div>
		</BigPhone>

		<Tablet>
			<div className={classes.aboutPageContainerDesktop}>
				<Spacer height="60px" />
				<div className={classes.titleDesktop}>{TITLE_TEXT}</div>
				<Spacer height="30px" />
				<div className={classes.bodyDesktop}>
					<div className={classes.bodyTextItem}>{BODY_TEXT}</div>
				</div>
				<Spacer height="60px" />
				<Imgix
					className={classes.imageDesktop}
					src="https://helpassisther.imgix.net/women-on-phones.jpg"
					alt="Women on mobile phones"
					sizes="100vw"
				/>
				{/* <Spacer height="70px" />
				<div className={classes.titleDesktop}>{TEAM_HEADING}</div>
				<Spacer height="27px" />
				<div className={classes.bodyDesktop}>
					<div className={classes.bodyTextItem}>{TEAM_BODY}</div>
				</div>
				<Spacer height="65px" /> */}
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
				<Imgix
					className={classes.imageDesktop}
					src="https://helpassisther.imgix.net/women-on-phones.jpg"
					alt="Women on mobile phones"
					sizes="100vw"
				/>
				{/* <Spacer height="70px" />
				<div className={classes.titleDesktop}>{TEAM_HEADING}</div>
				<Spacer height="27px" />
				<div className={classes.bodyDesktop}>
					<div className={classes.bodyTextItem}>{TEAM_BODY}</div>
				</div>
				<Spacer height="65px" /> */}
			</div>
		</Desktop>

		{/* <Team /> */}

		<Phone>
			<Spacer height="36px" />
		</Phone>

		<BigPhone>
			<Spacer height="36px" />
		</BigPhone>

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
		'grid-template-columns': '10% 80% 10%',
	},
	bodyDesktop: {
		color: '#000000',
		'font-family': 'hah-regular',
		'font-size': '20px',
		'line-height': '30px',
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
