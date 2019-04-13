import React from 'react'
import injectSheet from 'react-jss'

import Spacer from '../../components/spacer'
import Footer from '../../mini-app/components/footer'
import LogoAndNavigation from '../../mini-app/logo-and-navigation'
import { Phone, Desktop } from '../../components/breakpoints'
import ListOfResources from './list-of-resources'

const TITLE_TEXT = 'You are not alone. You are loved.'

const BODY_TEXT =
	'We have your back and so do the people working at the organizations below.'

const CALL_EMERGENCY_TEXT = 'If this is an emergency, call'

const EMERGENCY_NUMBER = '9-1-1'

const PERIOD = '.'

const Emergency = ({ classes }) => (
	<div>
		<LogoAndNavigation />

		<Phone>
			<div>
				<div className={classes.infoSectionPhone}>
					<Spacer height="33px" />
					<div>Phone +</div>
					<Spacer height="22px" />
					<div className={classes.titlePhone}>{TITLE_TEXT}</div>
					<Spacer height="22px" />
					<div className={classes.bodyPhone}>{BODY_TEXT}</div>
					<Spacer height="44px" />
				</div>
				<div className={classes.call911SectionPhone}>
					<Spacer height="25px" />
					<div className={classes.textContainer}>
						{CALL_EMERGENCY_TEXT}&nbsp;
						<div className={classes.emergencyNumber}>{EMERGENCY_NUMBER}</div>
						{PERIOD}
					</div>
					<Spacer height="25px" />
				</div>
			</div>
		</Phone>

		<Desktop>
			<div>
				<div className={classes.infoSectionDesktop}>
					<Spacer height="60px" />
					<div>Phone +</div>
					<Spacer height="44px" />
					<div className={classes.titleDesktop}>{TITLE_TEXT}</div>
					<Spacer height="44px" />
					<div className={classes.bodyDesktop}>{BODY_TEXT}</div>
					<Spacer height="77px" />
				</div>
				<div className={classes.call911SectionDesktop}>
					<Spacer height="45px" />
					<div className={classes.textContainer}>
						{CALL_EMERGENCY_TEXT}&nbsp;
						<div className={classes.emergencyNumber}>{EMERGENCY_NUMBER}</div>
						{PERIOD}
					</div>
					<Spacer height="45px" />
				</div>
			</div>
		</Desktop>

		<ListOfResources />

		<Footer />
	</div>
)

const styles = {
	infoSectionPhone: {
		'background-color': '#DEA8E0',
		'border-bottom': '1px solid #3D65F9',
		'margin-top': '55px',
	},
	infoSectionDesktop: {
		'background-color': '#DEA8E0',
		'border-bottom': '3px solid #3D65F9',
		'margin-top': '100px',
	},
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
	call911SectionPhone: {
		color: '#000000',
		'font-family': 'hah-regular',
		'font-size': '24px',
		'line-height': '32px',
		'text-align': 'center',
		'border-bottom': '1px solid #3D65F9',
	},
	call911SectionDesktop: {
		color: '#000000',
		'font-family': 'hah-regular',
		'font-size': '30px',
		'line-height': '36px',
		'text-align': 'center',
		'border-bottom': '3px solid #3D65F9',
	},
	textContainer: {
		display: 'flex',
		'justify-content': 'center',
	},
	emergencyNumber: {
		color: '#3D65F9',
	},
}

export default injectSheet(styles)(Emergency)