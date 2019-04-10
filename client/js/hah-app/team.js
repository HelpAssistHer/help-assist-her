import React from 'react'
import injectSheet from 'react-jss'

import { Phone, Desktop } from '../components/breakpoints'
import Spacer from '../components/spacer'

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
	<div>
		<Phone>
			<div>
				<img
					className={classes.headshot}
					src="../img/team/karen.png"
					alt="Karen"
				/>
				<div className={classes.gridContainerPhone}>
					<div className={classes.gridItem}>
						<div className={classes.nameAndTitleTextPhone}>
							{NAME_AND_TITLE_TEXT}
						</div>
						<Spacer height="14px" />
						<div className={classes.lineBreakPhone} />
						<Spacer height="14px" />
						<div className={classes.bioTextPhone}>{BIO_TEXT}</div>
					</div>
				</div>
			</div>
		</Phone>

		<Desktop>
			<div>
				<img
					className={classes.headshot}
					src="../img/team/karen.png"
					alt="Karen"
				/>
				<div className={classes.gridContainerDesktop}>
					<div className={classes.gridItem}>
						<div className={classes.nameAndTitleTextDesktop}>
							{NAME_AND_TITLE_TEXT}
						</div>
						<Spacer height="16px" />
						<div className={classes.lineBreakDesktop} />
						<Spacer height="16px" />
						<div className={classes.bioTextDesktop}>{BIO_TEXT}</div>
					</div>
				</div>
			</div>
		</Desktop>
	</div>
)

const styles = {
	headshot: {
		height: '240px',
		width: '240px',
	},
	gridContainerPhone: {
		display: 'grid',
		'grid-template-columns': '5% 90% 5%',
	},
	gridContainerDesktop: {
		display: 'grid',
		'grid-template-columns': '20% 60% 20%',
	},
	gridItem: {
		'grid-column-start': 2,
		'grid-column-end': 3,
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
	lineBreakPhone: {
		width: '35px',
		'border-top': '1px solid #24A894',
	},
	lineBreakDesktop: {
		width: '84px',
		'border-top': '3px solid #FFCA34',
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
