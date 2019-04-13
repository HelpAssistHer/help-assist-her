import React from 'react'
import injectSheet from 'react-jss'

import Spacer from '../components/spacer'
import Footer from '../mini-app/components/footer'
import LogoAndNavigation from '../mini-app/logo-and-navigation'
import { Phone, Desktop } from '../components/breakpoints'

const TITLE_TEXT = 'You are not alone. You are loved.'

const BODY_TEXT =
	'We have your back and so do the people working at the organizations below.'

const Emergency = ({ classes }) => (
	<div>
		<LogoAndNavigation />

		<Phone>
			<div>
				<Spacer height="33px" />
				<div>Phone +</div>
				<Spacer height="22px" />
				<div className={classes.titlePhone}>{TITLE_TEXT}</div>
				<Spacer height="22px" />
				<div className={classes.bodyPhone}>{BODY_TEXT}</div>
				<Spacer height="44px" />
			</div>
		</Phone>

		<Desktop>
			<div>
				<Spacer height="60px" />
				<div>Phone +</div>
				<Spacer height="44px" />
				<div className={classes.titleDesktop}>{TITLE_TEXT}</div>
				<Spacer height="44px" />
				<div className={classes.bodyDesktop}>{BODY_TEXT}</div>
				<Spacer height="77px" />
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
	},
	bodyDesktop: {
		color: '#000000',
		'font-family': 'hah-regular',
		'font-size': '24px',
		'line-height': '35px',
		'text-align': 'center',
	},
}

export default injectSheet(styles)(Emergency)
