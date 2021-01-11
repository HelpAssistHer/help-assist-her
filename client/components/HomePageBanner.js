import React from 'react'
import injectSheet from 'react-jss'

import { Phone, BigPhone, Tablet, Desktop } from './Breakpoints'
import Spacer from './Spacer'

const TITLE_1_TEXT = 'Always there.'
const TITLE_2_TEXT = 'Just for you.'
const DESCRIPTION_TEXT =
	'Sorting through google search results just isn’t cutting it. ' +
	"We want to make sure you get access to trustworthy women's resources, to get what you need without compromise. " +
	'Our beta site will launch in New York, but after that, we’re coming to you.'

const HomePageBanner = ({ classes }) => (
	<div>
		<Phone>
			<div className={classes.bannerPhone}>
				<div>
					{TITLE_1_TEXT}
					<br />
					{TITLE_2_TEXT}
				</div>
				<Spacer height="26px" />
				<div className={classes.descriptionContainerPhone}>
					<div className={classes.descriptionTextPhone}>{DESCRIPTION_TEXT}</div>
				</div>
			</div>
		</Phone>

		<BigPhone>
			<div className={classes.bannerBigPhone}>
				<div>
					{TITLE_1_TEXT}
					<br />
					{TITLE_2_TEXT}
				</div>
				<Spacer height="26px" />
				<div className={classes.descriptionContainerPhone}>
					<div className={classes.descriptionTextBigPhone}>
						{DESCRIPTION_TEXT}
					</div>
				</div>
			</div>
		</BigPhone>

		<Tablet>
			<div className={classes.bannerTablet}>
				<div>
					{TITLE_1_TEXT}
					<br />
					{TITLE_2_TEXT}
				</div>
				<Spacer height="48px" />
				<div className={classes.descriptionContainerDesktop}>
					<div className={classes.descriptionTextDesktop}>
						{DESCRIPTION_TEXT}
					</div>
				</div>
			</div>
		</Tablet>

		<Desktop>
			<div className={classes.bannerDesktop}>
				<div>
					{TITLE_1_TEXT}
					<br />
					{TITLE_2_TEXT}
				</div>
				<Spacer height="48px" />
				<div className={classes.descriptionContainerDesktop}>
					<div className={classes.descriptionTextDesktop}>
						{DESCRIPTION_TEXT}
					</div>
				</div>
			</div>
		</Desktop>
	</div>
)

const styles = {
	bannerPhone: {
		display: 'flex',
		'flex-direction': 'column',
		'align-items': 'center',
		'justify-content': 'center',
		'background-color': '#F5EDE6',
		color: '#000000',
		'font-family': 'hah-regular',
		'font-size': '8vw',
		'line-height': '11vw',
		'text-align': 'center',
		padding: '60px 0px 75px 0px',
	},
	bannerBigPhone: {
		display: 'flex',
		'flex-direction': 'column',
		'align-items': 'center',
		'justify-content': 'center',
		'background-color': '#F5EDE6',
		color: '#000000',
		'font-family': 'hah-regular',
		'font-size': '6vw',
		'line-height': '8vw',
		'text-align': 'center',
		padding: '60px 0px 75px 0px',
	},
	bannerTablet: {
		display: 'flex',
		'flex-direction': 'column',
		'align-items': 'center',
		'justify-content': 'center',
		'background-color': '#F5EDE6',
		color: '#000000',
		'font-family': 'hah-regular',
		'font-size': '5vw',
		'line-height': '6.5vw',
		'text-align': 'center',
		padding: '100px 0px 125px 0px',
	},
	bannerDesktop: {
		display: 'flex',
		'flex-direction': 'column',
		'align-items': 'center',
		'justify-content': 'center',
		'background-color': '#F5EDE6',
		color: '#000000',
		'font-family': 'hah-regular',
		'font-size': '4vw',
		'line-height': '5vw',
		'text-align': 'center',
		padding: '100px 0px 125px 0px',
	},
	descriptionContainerPhone: {
		display: 'grid',
		'grid-template-columns': '13.5% 73% 13.5%',
	},
	descriptionContainerDesktop: {
		display: 'grid',
		'grid-template-columns': '25% 50% 25%',
	},
	descriptionTextPhone: {
		color: 'rgba(0,0,0,0.95)',
		'font-family': 'hah-regular',
		'font-size': '4.5vw',
		'line-height': '6vw',
		'text-align': 'center',
		'grid-column-start': 2,
		'grid-column-end': 3,
	},
	descriptionTextBigPhone: {
		color: 'rgba(0,0,0,0.95)',
		'font-family': 'hah-regular',
		'font-size': '3vw',
		'line-height': '4.5vw',
		'text-align': 'center',
		'grid-column-start': 2,
		'grid-column-end': 3,
	},
	descriptionTextDesktop: {
		color: '#000000',
		'font-family': 'hah-regular',
		'font-size': '20px',
		'line-height': '28px',
		'text-align': 'center',
		'grid-column-start': 2,
		'grid-column-end': 3,
	},
}

export default injectSheet(styles)(HomePageBanner)
