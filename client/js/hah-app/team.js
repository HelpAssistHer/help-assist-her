import React from 'react'
import injectSheet from 'react-jss'

import { Phone, Desktop } from '../components/breakpoints'

const NAME_AND_TITLE_TEXT = 'Karen Rose | Executive Director'

const BIO_TEXT =
	'I want to start with a story from the Onion. Because really, shouldn’t every talk start with a story from the Onion? This is from earlier this year.\n' +
	'\n' +
	'The headline reads: “Nation Shudders At Large Block Of Uninterrupted Text.”\n' +
	'\n' +
	'“Unable to rest their eyes on a colorful photograph or boldface heading that could be easily skimmed and forgotten, Americans collectively recoiled Monday when confronted with a solid block of uninterrupted text.\n' +
	'\n' +
	'“Dumbfounded citizens from Maine to California gazed helplessly at the frightening chunk of print, unsure of what to do next.\n' +
	'\n' +
	'“Without an illustration, chart, or embedded YouTube video to ease them in, millions were frozen in place, terrified by the sight of one long, unbroken string of English words.'

const Team = ({ classes }) => (
	<div className={classes.team}>
		<Phone>
			<div>
				<div className={classes.nameAndTitleTextPhone}>
					{NAME_AND_TITLE_TEXT}
				</div>
				<div className={classes.bioTextPhone}>{BIO_TEXT}</div>
			</div>
		</Phone>

		<Desktop>
			<div>
				<div className={classes.nameAndTitleTextDesktop}>
					{NAME_AND_TITLE_TEXT}
				</div>
				<div className={classes.bioTextDesktop}>{BIO_TEXT}</div>
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
	bioTextPhone: {
		color: '#000000',
		'font-family': 'hah-regular',
		'font-size': '14px',
		'line-height': '21px',
	},
	bioTextDesktop: {
		color: '#000000',
		'font-family': 'hah-regular',
		'font-size': '18px',
		'line-height': '26px',
	},
}

export default injectSheet(styles)(Team)
