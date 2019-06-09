import React from 'react'
import injectSheet from 'react-jss'

import { Phone, Tablet, Desktop } from '../components/breakpoints'
import Spacer from '../components/spacer'

const TITLE_1_TEXT = 'Always there.'
const TITLE_2_TEXT = 'Just for you.'
const DESCRIPTION_TEXT =
	"Google just isn't cutting it. Whether you're home or traveling, need " +
	'care for yourself or are doing some research for a loved one, we want ' +
	'to make sure you get access to reliable resources. Starting with pregnancy ' +
	'and basic medical care is just that, a start. Our beta will launch in New ' +
	"York, but after that, we're coming to you."

const HomePageBanner = ({ classes }) => (
	<div>
		<Desktop>
			<div>
				<div className={classes.bannerDesktop}>
					<div>
						{TITLE_1_TEXT}
						<br />
						{TITLE_2_TEXT}
					</div>
					<Spacer height="48px" />
					<div className={classes.descriptionContainer}>
						<div className={classes.descriptionText}>{DESCRIPTION_TEXT}</div>
					</div>
				</div>
			</div>
		</Desktop>
	</div>
)

const styles = {
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
	descriptionContainer: {
		display: 'grid',
		'grid-template-columns': '20% 60% 20%',
	},
	descriptionText: {
		color: '#000000',
		'font-family': 'hah-regular',
		'font-size': '24px',
		'line-height': '35px',
		'text-align': 'center',
		'grid-column-start': 2,
		'grid-column-end': 3,
	},
}

export default injectSheet(styles)(HomePageBanner)
