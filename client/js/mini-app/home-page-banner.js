import React from 'react'
import injectSheet from 'react-jss'

import { Desktop } from '../components/breakpoints'
import Spacer from '../components/spacer'

const OTHER_SERVICES_DESCRIPTION_TEXT =
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
					Always there.
					<br />
					Just for you.
				</div>
				<Spacer height="72px" />
				<div className={classes.textContainer}>
					<div className={classes.otherServicesDescription}>
						{OTHER_SERVICES_DESCRIPTION_TEXT}
					</div>
				</div>
				<Spacer height="56px" />
			</div>
		</Desktop>
	</div>
)

const styles = {
	bannerDesktop: {
		display: 'flex',
		'align-items': 'center',
		'justify-content': 'center',
		height: '235px',
		'background-color': '#DEA8E0',
		'border-top': '4px solid #3D65F9',
		'border-bottom': '4px solid #3D65F9',
		color: '#3D65F9',
		'font-family': 'hah-regular',
		'font-size': '80px',
		'line-height': '94px',
		'letter-spacing': '-0.1px',
		'text-align': 'center',
	},
	textContainer: {
		display: 'grid',
		'grid-template-columns': '20% 60% 20%',
	},
	otherServicesDescription: {
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
