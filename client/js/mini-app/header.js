import React from 'react'
import injectSheet from 'react-jss'

import { Phone, Desktop } from '../components/breakpoints'
import Spacer from '../components/spacer'

const Header = ({ classes }) => {
	const titleText = 'We have your back.'

	const descriptionText =
		'We’re here to help you find the local resources you need.'

	return (
		<div>
			<Spacer height="100px" />
			<div className={classes.headerContainer}>
				<div className={classes.headerText}>
					<div className={classes.titleText}>{titleText}</div>
					<Spacer height="40px" />
					<div className={classes.descriptionText}>{descriptionText}</div>
				</div>

				<img
					src="../img/two-women-hugging.jpg"
					alt="Two Close Friends"
					height="455"
				/>
			</div>

			{/*width="500" height="455"*/}
			{/*<Phone>*/}
			{/*<div>*/}
			{/*<div className={classes.imagePhone}>Image</div>*/}
			{/*<div className={classes.headerPhone}>*/}
			{/*<div className={classes.titlePhone}>{titleText}</div>*/}
			{/*<Spacer height="12px" />*/}
			{/*<div>{descriptionText}</div>*/}
			{/*</div>*/}
			{/*</div>*/}
			{/*</Phone>*/}

			{/*<Desktop>*/}
			{/**/}
			{/*</Desktop>*/}
		</div>
	)
}

const styles = {
	headerContainer: {
		display: 'flex',
		'background-color': '#016454',
		height: '455px',
	},
	headerText: {
		flex: '1 1 0',
		color: '#abd3f9',
		'font-family': 'hah-regular',
		'text-align': 'center',
	},
	titleText: {
		padding: '74px 80px 0px 80px',
		'font-size': '80px',
	},
	descriptionText: {
		padding: '0px 80px 132px 80px',
		'font-size': '24px',
	},
	// headerPhone: {
	// 	display: 'flex',
	// 	'flex-direction': 'column',
	// 	'justify-content': 'center',
	// 	'background-color': '#016454',
	// 	color: '#abd3f9',
	// 	height: '255px',
	// 	padding: '0px 80px 0px 80px',
	// 	'text-align': 'center',
	// },
	// titlePhone: {
	// 	'font-family': 'hah',
	// 	'font-size': '40px',
	// 	'font-weight': 300,
	// 	'letter-spacing': '-0.5px',
	// },
	// titleDesktop: {
	//
	// },
	// descriptionTextPhone: {
	// 	'font-size': '18px',
	// },
	// headerDesktop: {
	// 	// 'flex-basis': '50%',
	// 	flex: '1 1 0',
	// 	'background-color': '#016454',
	// 	color: '#abd3f9',
	// 	'font-size': '30px',
	// 	// height: '104px',
	// 	padding: '60px 20px 40px 80px',
	// 	'text-shadow': '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black',
	// },
}

export default injectSheet(styles)(Header)
