import React from 'react'
import injectSheet from 'react-jss'

import Spacer from '../../components/spacer'
import Footer from '../../mini-app/components/footer'
import LogoAndNavigation from '../../mini-app/logo-and-navigation'
import { Phone, BigPhone, Tablet, Desktop } from '../../components/breakpoints'
import ListOfResources from './list-of-resources'
import EmergencyPhoneIcon from '../../components/icons/icon-components/emergency-phone-icon'
import { ScrollToTop } from '../../components/scroll-to-top'

const TITLE_TEXT = "No matter what situation you're in, you're not alone."

const BODY_TEXT =
	"We're here for you, and so are other compassionate and helpful people, " +
	'trained to get you the help you need.'

const CALL_EMERGENCY_TEXT = 'If this is an emergency, call'

const EMERGENCY_NUMBER = '9-1-1'

const PERIOD = '.'

const Emergency = ({ classes }) => (
	<div>
		<ScrollToTop />
		<LogoAndNavigation />

		<Phone>
			<div>
				<div className={classes.infoSectionPhone}>
					<Spacer height="80px" />
					<EmergencyPhoneIcon height={80} width={80} />
					<Spacer height="50px" />
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

		<BigPhone>
			<div>
				<div className={classes.infoSectionBigPhone}>
					<Spacer height="33px" />
					<EmergencyPhoneIcon height={48} width={48} />
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
		</BigPhone>

		<Tablet>
			<div>
				<div className={classes.infoSectionTablet}>
					<Spacer height="60px" />
					<EmergencyPhoneIcon height={82} width={82} />
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
		</Tablet>

		<Desktop>
			<div>
				<div className={classes.infoSectionDesktop}>
					<Spacer height="60px" />
					<EmergencyPhoneIcon height={82} width={82} />
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

		<Phone>
			<div className={classes.listOfResourcesContainerPhone}>
				<ListOfResources />
			</div>
		</Phone>

		<BigPhone>
			<div className={classes.listOfResourcesContainerPhone}>
				<ListOfResources />
			</div>
		</BigPhone>

		<Tablet>
			<div className={classes.listOfResourcesContainerDesktop}>
				<ListOfResources />
			</div>
		</Tablet>

		<Desktop>
			<div className={classes.listOfResourcesContainerDesktop}>
				<ListOfResources />
			</div>
		</Desktop>

		<Footer />
	</div>
)

const styles = {
	infoSectionPhone: {
		height: '600px',
		display: 'flex',
		'flex-direction': 'column',
		'align-items': 'center',
		'justify-content': 'center',
		'background-color': '#F5EDE6',
		'text-align': 'center',
	},
	infoSectionBigPhone: {
		height: '300px',
		display: 'flex',
		'flex-direction': 'column',
		'align-items': 'center',
		'background-color': '#F5EDE6',
		'text-align': 'center',
	},
	infoSectionTablet: {
		height: '500px',
		'margin-top': '67px', // this is so it starts after the header/navigation
		display: 'flex',
		'flex-direction': 'column',
		'align-items': 'center',
		'background-color': '#F5EDE6',
		'text-align': 'center',
	},
	infoSectionDesktop: {
		height: '42vw',
		'margin-top': '67px', // this is so it starts after the header/navigation
		display: 'flex',
		'flex-direction': 'column',
		'align-items': 'center',
		'background-color': '#F5EDE6',
		'text-align': 'center',
	},
	titlePhone: {
		color: '#000000',
		'font-family': 'hah-regular',
		'font-size': '8vw',
		'line-height': '10vw',
		'text-align': 'center',
		'max-width': '330px',
	},
	titleBigPhone: {
		color: '#000000',
		'font-family': 'hah-regular',
		'font-size': '8vw',
		'line-height': '10vw',
		'text-align': 'center',
		'max-width': '330px',
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
		'font-family': 'hah-light',
		'font-size': '4.5vw',
		'line-height': '6vw',
		'letter-spacing': '0.3px',
		'text-align': 'center',
		'max-width': '300px',
	},
	bodyDesktop: {
		color: '#000000',
		'font-family': 'hah-regular',
		'font-size': '20px',
		'line-height': '35px',
		'text-align': 'center',
	},
	call911SectionPhone: {
		color: '#000000',
		'font-family': 'hah-regular',
		'font-size': '20px',
		'line-height': '32px',
		'text-align': 'center',
		'border-bottom': '1px solid #3D65F9',
	},
	call911SectionDesktop: {
		color: '#000000',
		'font-family': 'hah-regular',
		'font-size': '24px',
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
	listOfResourcesContainerPhone: {
		padding: '20px 0px',
		'background-color': 'rgba(93,93,93,0.08)',
	},
	listOfResourcesContainerDesktop: {
		padding: '46px 0px',
		'background-color': 'rgba(93,93,93,0.08)',
	},
}

export default injectSheet(styles)(Emergency)
