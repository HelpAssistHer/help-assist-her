import React from 'react'
import injectSheet from 'react-jss'
import Imgix from 'react-imgix'

import { Phone, BigPhone, Tablet, Desktop } from '../components/breakpoints'

const UnitedStatesMap = ({ classes }) => (
	<div>
		<Phone>
			<div className={classes.imageContainerPhone}>
				<Imgix
					className={classes.responsiveMapPhone}
					src="https://helpassisther.imgix.net/united-states-map.png"
					alt="Help Assist Her expansion map"
					sizes="100vw"
				/>
			</div>
		</Phone>

		<BigPhone>
			<div className={classes.imageContainerPhone}>
				<Imgix
					className={classes.responsiveMapBigPhone}
					src="https://helpassisther.imgix.net/united-states-map.png"
					alt="Help Assist Her expansion map"
					sizes="100vw"
				/>
			</div>
		</BigPhone>

		<Tablet>
			<div className={classes.imageContainerTablet}>
				<Imgix
					className={classes.responsiveMapTablet}
					src="https://helpassisther.imgix.net/united-states-map.png"
					alt="Help Assist Her expansion map"
					sizes="100vw"
				/>
			</div>
		</Tablet>

		<Desktop>
			<div className={classes.imageContainerDesktop}>
				<Imgix
					className={classes.responsiveMapDesktop}
					src="https://helpassisther.imgix.net/united-states-map.png"
					alt="Help Assist Her expansion map"
					sizes="100vw"
				/>
			</div>
		</Desktop>
	</div>
)

const styles = {
	imageContainerPhone: {
		display: 'flex',
		'justify-content': 'center',
		padding: '40px',
	},
	imageContainerTablet: {
		display: 'flex',
		'justify-content': 'center',
		padding: '80px',
	},
	imageContainerDesktop: {
		display: 'flex',
		'justify-content': 'center',
		padding: '120px',
	},
	responsiveMapPhone: {
		'max-width': '90vw',
		height: '40vh',
		'object-fit': 'contain', // for Safari
	},
	responsiveMapBigPhone: {
		'max-width': '90vw',
		height: '50vh',
		'object-fit': 'contain', // for Safari
	},
	responsiveMapTablet: {
		'max-width': '90vw',
		height: '60vh',
		'object-fit': 'contain', // for Safari
	},
	responsiveMapDesktop: {
		'max-width': '90vw',
		height: '70vh',
		'object-fit': 'contain', // for Safari
	},
}

export default injectSheet(styles)(UnitedStatesMap)
