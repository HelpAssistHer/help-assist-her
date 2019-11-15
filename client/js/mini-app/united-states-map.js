import React from 'react'
import injectSheet from 'react-jss'

import { Phone, BigPhone, Tablet, Desktop } from '../components/breakpoints'

const UnitedStatesMap = ({ classes }) => (
	<div>
		<Phone>
			<div className={classes.imageContainerPhone}>
				<img
					className={classes.responsiveMapPhone}
					src="../img/united-states-map.png"
					alt="Help Assist Her expansion map"
				/>
			</div>
		</Phone>

		<BigPhone>
			<div className={classes.imageContainerPhone}>
				<img
					className={classes.responsiveMapBigPhone}
					src="../img/united-states-map.png"
					alt="Help Assist Her expansion map"
				/>
			</div>
		</BigPhone>

		<Tablet>
			<div className={classes.imageContainerTablet}>
				<img
					className={classes.responsiveMapTablet}
					src="../img/united-states-map.png"
					alt="Help Assist Her expansion map"
				/>
			</div>
		</Tablet>

		<Desktop>
			<div className={classes.imageContainerDesktop}>
				<img
					className={classes.responsiveMapDesktop}
					src="../img/united-states-map.png"
					alt="Help Assist Her expansion map"
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
