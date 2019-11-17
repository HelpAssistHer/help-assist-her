import React from 'react'
import injectSheet from 'react-jss'

import { Phone, BigPhone, Tablet, Desktop } from '../components/breakpoints'
import Spacer from '../components/spacer'

const TITLE_1_TEXT = 'Always there.'
const TITLE_2_TEXT = 'Just for you.'
const DESCRIPTION_TEXT =
	'Sorting through google search results just isn’t cutting it. Whether you’re home or traveling, ' +
	'need care yourself or are doing some research for a loved one, we want to make sure you get ' +
	'access to trustworthy healthcare resources. Starting with resource information for pregnancy and ' +
	'basic medical care is just that, a start. Our beta site will launch in New York, but after that, we’re coming to you.'

const HomePageBanner = ({ classes }) => (
	<div>
		<Phone>
			<div>
				<div className={classes.bannerPhone}>
					<div>
						{TITLE_1_TEXT}
						<br />
						{TITLE_2_TEXT}
					</div>
					<Spacer height="26px" />
					<div className={classes.descriptionContainerPhone}>
						<div className={classes.descriptionTextPhone}>
							{DESCRIPTION_TEXT}
						</div>
					</div>
				</div>
			</div>
		</Phone>

		<BigPhone>
			<div>
				<div className={classes.bannerPhone}>
					<div>
						{TITLE_1_TEXT}
						<br />
						{TITLE_2_TEXT}
					</div>
					<Spacer height="26px" />
					<div className={classes.descriptionContainerPhone}>
						<div className={classes.descriptionTextPhone}>
							{DESCRIPTION_TEXT}
						</div>
					</div>
				</div>
			</div>
		</BigPhone>

		<Tablet>
			<div>
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
			</div>
		</Tablet>

		<Desktop>
			<div>
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
		height: '328px',
		'background-color': '#F5EDE6',
		color: '#000000',
		'font-family': 'hah-regular',
		'font-size': '24px',
		'line-height': '33px',
		'text-align': 'center',
	},
	bannerDesktop: {
		display: 'flex',
		'flex-direction': 'column',
		'align-items': 'center',
		'justify-content': 'center',
		height: '675px',
		'background-color': '#F5EDE6',
		color: '#000000',
		'font-family': 'hah-regular',
		'font-size': '80px',
		'line-height': '94px',
		'letter-spacing': '-0.1px',
		'text-align': 'center',
	},
	descriptionContainerPhone: {
		display: 'grid',
		'grid-template-columns': '10% 80% 10%',
	},
	descriptionContainerDesktop: {
		display: 'grid',
		'grid-template-columns': '20% 60% 20%',
	},
	descriptionTextPhone: {
		color: 'rgba(0,0,0,0.95)',
		'font-family': 'hah-regular',
		'font-size': '14px',
		'line-height': '20px',
		'text-align': 'center',
		'grid-column-start': 2,
		'grid-column-end': 3,
	},
	descriptionTextDesktop: {
		color: '#000000',
		'font-family': 'hah-regular',
		'font-size': '20px',
		'line-height': '35px',
		'text-align': 'center',
		'grid-column-start': 2,
		'grid-column-end': 3,
	},
}

export default injectSheet(styles)(HomePageBanner)
