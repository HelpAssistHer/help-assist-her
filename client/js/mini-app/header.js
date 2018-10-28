import React from 'react'
import injectSheet from 'react-jss'

import { Phone, Desktop } from '../components/breakpoints'

const Header = ({ classes }) => {
	const headerText =
		'Made by women, for women to help you make independent, ' +
		'informed healthcare decisions.'

	return (
		<div>
			<Phone>
				<div className={classes.headerPhone}>{headerText}</div>
			</Phone>
			<Desktop>
				<div className={classes.headerDesktop}>{headerText}</div>
			</Desktop>
		</div>
	)
}

const styles = {
	headerPhone: {
		'background-color': '#016454',
		color: '#abd3f9',
		'font-size': '30px',
		height: '104px',
		padding: '60px 20px 40px 80px',
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
