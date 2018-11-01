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

			<Phone>
				<div className={classes.headerContainerPhone}>
					<img
						className={classes.imagePhone}
						src="../img/two-women-hugging.jpg"
						alt="Two Close Friends"
					/>

					<div className={classes.headerText}>
						<div className={classes.titleTextPhone}>{titleText}</div>
						<Spacer height="40px" />
						<div className={classes.descriptionTextPhone}>
							{descriptionText}
						</div>
					</div>
				</div>
			</Phone>

			<Desktop>
				<div className={classes.headerContainerDesktop}>
					<div className={classes.headerText}>
						<div className={classes.titleTextDesktop}>{titleText}</div>
						<Spacer height="40px" />
						<div className={classes.descriptionTextDesktop}>
							{descriptionText}
						</div>
					</div>

					<img
						className={classes.imageDesktop}
						src="../img/two-women-hugging.jpg"
						alt="Two Close Friends"
					/>
				</div>
			</Desktop>
		</div>
	)
}

const styles = {
	headerContainerPhone: {
		display: 'flex',
		'flex-direction': 'column',
		'background-color': '#016454',
	},
	headerContainerDesktop: {
		display: 'flex',
		'background-color': '#016454',
	},
	headerText: {
		flex: '1 1 0',
		color: '#abd3f9',
		'font-family': 'hah-regular',
		'text-align': 'center', // ? for desktop
	},
	titleTextPhone: {
		padding: '74px 80px 0px 80px',
		'font-size': '40px',
		'font-weight': 300, // fix
		'letter-spacing': '-0.5px',
	},
	titleTextDesktop: {
		padding: '74px 80px 0px 80px',
		'font-size': '80px',
	},
	descriptionTextPhone: {
		padding: '0px 80px 132px 80px',
		'font-size': '18px',
	},
	descriptionTextDesktop: {
		padding: '0px 80px 132px 80px',
		'font-size': '24px',
	},
	imagePhone: {
		height: '100%',
		width: '100%',
	},
	imageDesktop: {
		height: '50%',
		width: '50%',
	},
}

export default injectSheet(styles)(Header)
