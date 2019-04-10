import React from 'react'
import injectSheet from 'react-jss'

import Spacer from '../components/spacer'
import Footer from '../mini-app/components/footer'
import LogoAndNavigation from '../mini-app/logo-and-navigation'
import { Phone, Desktop } from '../components/breakpoints'

const TITLE_TEXT = 'What is Help Assist Her?'

const BODY_TEXT =
	'Some women may need help navigating the myriad of healthcare resources out there. ' +
	"(Honestly, why isn't this easier?) Others may not know what facilities are available in their area. " +
	'Help Assist Her is designed to help you or someone you know locate a holistic healthcare provider to address ' +
	'your personal needs. Help Assist Her is here to connect you with them.'

const SECOND_PARAGRAPH =
	'Help Assist Her is a collection of up-to-date, local healthcare resources and ' +
	'their contact details that will help you get in touch with the care you need.'

const About = ({ classes }) => (
	<div>
		<LogoAndNavigation />

		<Phone>
			<div>
				<Spacer height="36px" />
				<div className={classes.titlePhone}>{TITLE_TEXT}</div>
				<Spacer height="28px" />
				<div className={classes.bodyPhone}>
					<div className={classes.bodyTextItem}>
						{BODY_TEXT}
						<p>{SECOND_PARAGRAPH}</p>
					</div>
				</div>
			</div>
		</Phone>

		<Desktop>
			<div>
				<Spacer height="60px" />
				<div className={classes.titleDesktop}>{TITLE_TEXT}</div>
				<Spacer height="30px" />
				<div className={classes.bodyDesktop}>
					<div className={classes.bodyTextItem}>
						{BODY_TEXT}
						<p>{SECOND_PARAGRAPH}</p>
					</div>
				</div>
			</div>
		</Desktop>

		<Footer />
	</div>
)

const styles = {
	titlePhone: {
		color: '#000000',
		'font-family': 'hah-regular',
		'font-size': '24px',
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
		'font-size': '24px',
		'line-height': '35px',
		'text-align': 'center',
		display: 'grid',
		'grid-template-columns': '20% 60% 20%',
	},
	bodyTextItem: {
		'grid-column-start': 2,
		'grid-column-end': 3,
	},
}

export default injectSheet(styles)(About)
