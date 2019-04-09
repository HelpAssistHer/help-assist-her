import React from 'react'
import injectSheet from 'react-jss'

import { Desktop } from '../components/breakpoints'

const HomePageBanner = ({ classes }) => (
	<div>
		<Desktop>
			<div className={classes.bannerDesktop}>
				Always there.
				<br />
				Just for you.
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
}

export default injectSheet(styles)(HomePageBanner)
