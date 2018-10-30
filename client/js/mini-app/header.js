import React from 'react'
import injectSheet from 'react-jss'

import { Phone, Desktop } from '../components/breakpoints'
import Spacer from '../components/spacer'

const Header = ({ classes }) => {
	const titleText = 'By Women. For Women.'

	const descriptionText =
		'Made by women, for women to help you make independent, ' +
		'informed healthcare decisions.'

	return (
		<div>
			<Phone>
				<div>
					<div className={classes.imagePhone}>Image</div>
					<div className={classes.headerPhone}>
						<div className={classes.titlePhone}>{titleText}</div>
						<Spacer height="12px" />
						<div>{descriptionText}</div>
					</div>
				</div>
			</Phone>

			<Desktop>
				<div className={classes.headerDesktop}>{descriptionText}</div>
			</Desktop>
		</div>
	)
}

const styles = {
	imagePhone: {
		height: '264px',
	},
	headerPhone: {
		display: 'flex',
		'flex-direction': 'column',
		'justify-content': 'center',
		'background-color': '#016454',
		color: '#abd3f9',
		height: '255px',
		padding: '0px 80px 0px 80px',
		'text-align': 'center',
	},
	titlePhone: {
		'font-family': 'hah',
		'font-size': '40px',
		'font-weight': 300,
		'letter-spacing': '-0.5px',
	},
	descriptionTextPhone: {
		'font-size': '18px',
	},
	headerDesktop: {
		'background-color': '#016454',
		color: '#abd3f9',
		'font-size': '30px',
		height: '104px',
		padding: '60px 20px 40px 80px',
		'text-shadow': '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black',
	},
}

export default injectSheet(styles)(Header)
