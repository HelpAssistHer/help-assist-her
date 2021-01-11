import React from 'react'
import { ReactTypeformEmbed } from 'react-typeform-embed'
import injectSheet from 'react-jss'

import LogoAndNavigation from './LogoAndNavigation'
import Footer from './Footer'
import { Phone, BigPhone, Tablet, Desktop } from './Breakpoints'
import Spacer from './Spacer'
import { ScrollToTop } from './ScrollToTop'

const TITLE_TEXT = "We're listening."

const BODY_TEXT_1 =
	"We want to hear what you have to say. Our goal is to continually improve women's access to local, affordable, and reliable healthcare options."

const BODY_TEXT_2 = 'Got something you want to tell us? Run into an issue?'

const BODY_TEXT_3 =
	'How can we make finding local resources the easiest thing to do?'

const Feedback = ({ classes }) => (
	<div>
		<ScrollToTop />
		<LogoAndNavigation />

		<Phone>
			<div className={classes.feedbackPageContainerPhone}>
				<Spacer height="36px" />
				<div className={classes.titleTextPhone}>{TITLE_TEXT}</div>
				<Spacer height="28px" />
				<div className={classes.gridContainerPhone}>
					<div className={classes.bodyTextPhone}>
						{BODY_TEXT_1}
						<Spacer height="28px" />
						{BODY_TEXT_2}
						<Spacer height="28px" />
						<div className={classes.blueText}>{BODY_TEXT_3}</div>
					</div>
				</div>
			</div>
		</Phone>

		<BigPhone>
			<div className={classes.feedbackPageContainerPhone}>
				<Spacer height="36px" />
				<div className={classes.titleTextPhone}>{TITLE_TEXT}</div>
				<Spacer height="28px" />
				<div className={classes.gridContainerPhone}>
					<div className={classes.bodyTextPhone}>
						{BODY_TEXT_1}
						<Spacer height="28px" />
						{BODY_TEXT_2}
						<Spacer height="28px" />
						<div className={classes.blueText}>{BODY_TEXT_3}</div>
					</div>
				</div>
			</div>
		</BigPhone>

		<Tablet>
			<div className={classes.feedbackPageContainerDesktop}>
				<Spacer height="60px" />
				<div className={classes.titleTextDesktop}>{TITLE_TEXT}</div>
				<Spacer height="32px" />
				<div className={classes.gridContainerDesktop}>
					<div className={classes.bodyTextDesktop}>
						{BODY_TEXT_1}
						<Spacer height="32px" />
						{BODY_TEXT_2}
						<Spacer height="32px" />
						<div className={classes.blueText}>{BODY_TEXT_3}</div>
					</div>
				</div>
			</div>
		</Tablet>

		<Desktop>
			<div className={classes.feedbackPageContainerDesktop}>
				<Spacer height="60px" />
				<div className={classes.titleTextDesktop}>{TITLE_TEXT}</div>
				<Spacer height="32px" />
				<div className={classes.gridContainerDesktop}>
					<div className={classes.bodyTextDesktop}>
						{BODY_TEXT_1}
						<Spacer height="32px" />
						{BODY_TEXT_2}
						<Spacer height="32px" />
						<div className={classes.blueText}>{BODY_TEXT_3}</div>
					</div>
				</div>
			</div>
		</Desktop>

		<ReactTypeformEmbed
			url="https://helpassisther.typeform.com/to/pUhArd"
			style={{ position: 'unset', height: '500px' }}
		/>

		<Footer />
	</div>
)

const styles = {
	feedbackPageContainerPhone: {
		margin: '55px 0px 0px 0px',
	},
	feedbackPageContainerDesktop: {
		margin: '100px 0px 0px 0px',
	},
	titleTextPhone: {
		color: '#000000',
		'font-family': 'hah-regular',
		'font-size': '20px',
		'line-height': '28px',
		'text-align': 'center',
	},
	titleTextDesktop: {
		color: '#000000',
		'font-family': 'hah-regular',
		'font-size': '40px',
		'line-height': '48px',
		'text-align': 'center',
	},
	gridContainerPhone: {
		display: 'grid',
		'grid-template-columns': '5% 90% 5%',
	},
	gridContainerDesktop: {
		display: 'grid',
		'grid-template-columns': '20% 60% 20%',
	},
	bodyTextPhone: {
		color: '#000000',
		'font-family': 'hah-regular',
		'font-size': '14px',
		'line-height': '20px',
		'text-align': 'center',
		'grid-column-start': 2,
		'grid-column-end': 3,
	},
	bodyTextDesktop: {
		color: '#000000',
		'font-family': 'hah-regular',
		'font-size': '20px',
		'line-height': '35px',
		'text-align': 'center',
		'grid-column-start': 2,
		'grid-column-end': 3,
	},
	blueText: {
		color: '#3D65F9',
	},
}

export default injectSheet(styles)(Feedback)
