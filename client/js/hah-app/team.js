import React from 'react'
import injectSheet from 'react-jss'

import { Phone, Desktop } from '../components/breakpoints'

const NAME_AND_TITLE_TEXT = 'Karen Rose | Executive Director'

const Team = ({ classes }) => (
	<div className={classes.team}>
		<Phone>
			<div className={classes.nameAndTitleTextPhone}>{NAME_AND_TITLE_TEXT}</div>
		</Phone>

		<Desktop>
			<div className={classes.nameAndTitleTextDesktop}>
				{NAME_AND_TITLE_TEXT}
			</div>
		</Desktop>
	</div>
)

const styles = {
	team: {
		'background-color': 'yellow',
	},
	nameAndTitleTextPhone: {
		color: '#000000',
		'font-family': 'hah-regular',
		'font-size': '16px',
		'line-height': '22px',
	},
	nameAndTitleTextDesktop: {
		color: '#000000',
		'font-family': 'hah-bold',
		'font-size': '18px',
		'line-height': '26px',
	},
}

export default injectSheet(styles)(Team)
