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
					width={500}
				/>
			</div>

			{/*<Spacer height="100px" />*/}
			{/*<div className={classes.headerContainer}>*/}
			{/*<div className={classes.headerText}>*/}
			{/*<div className={classes.titleText}>{titleText}</div>*/}
			{/*<Spacer height="40px" />*/}
			{/*<div className={classes.descriptionText}>{descriptionText}</div>*/}
			{/*</div>*/}

			{/*<img*/}
			{/*src="../img/two-women-hugging.jpg"*/}
			{/*alt="Two Close Friends"*/}
			{/*height="455"*/}
			{/*/>*/}
			{/*</div>*/}
		</div>
	)
}

const styles = {
	headerContainer: {
		display: 'flex',
		'flex-direction': 'column',
		'background-color': '#016454',
		width: '500px',
	},
	headerText: {
		flex: '1 1 0',
		color: '#abd3f9',
		'font-family': 'hah-regular',
		'text-align': 'center',
	},
	titleText: {
		padding: '74px 80px 0px 80px',
		'font-size': '40px',
		'font-weight': 300, // fix
		'letter-spacing': '-0.5px',
	},
	descriptionText: {
		padding: '0px 80px 132px 80px',
		'font-size': '18px',
	},
	// headerContainer: {
	// 	display: 'flex',
	// 	'background-color': '#016454',
	// 	height: '455px',
	// },
	// headerText: {
	// 	flex: '1 1 0',
	// 	color: '#abd3f9',
	// 	'font-family': 'hah-regular',
	// 	'text-align': 'center', // ?
	// },
	// titleText: {
	// 	padding: '74px 80px 0px 80px',
	// 	'font-size': '80px',
	// },
	// descriptionText: {
	// 	padding: '0px 80px 132px 80px',
	// 	'font-size': '24px',
	// },
}

export default injectSheet(styles)(Header)
