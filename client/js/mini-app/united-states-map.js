import React from 'react'
import injectSheet from 'react-jss'

import { Phone, Tablet, Desktop } from '../components/breakpoints'

const UnitedStatesMap = ({ classes }) => (
	<div>
		<Phone>
			<div className={classes.imageContainerPhone}>
				<img
					className={classes.responsiveMap}
					src="../img/united-states-map.png"
					alt="Help Assist Her expansion map"
				/>
			</div>
		</Phone>

		<Tablet>
			<div className={classes.imageContainerTablet}>
				<img
					className={classes.responsiveMap}
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
	responsiveMap: {
		'max-width': '100%',
		height: 'auto',
	},
	responsiveMapDesktop: {
		'max-width': '80%',
		height: 'auto',
	},
}

export default injectSheet(styles)(UnitedStatesMap)
