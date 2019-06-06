import React from 'react'
import injectSheet from 'react-jss'

import { Phone, Tablet, Desktop } from '../components/breakpoints'
import Spacer from '../components/spacer'
import LogoAndNavigation from './logo-and-navigation'

const Header = ({ classes }) => {
	const titleText1 = 'Empower Women'
	const titleText2 = 'with Options.'

	const descriptionText =
		"Bringing reliable and comprehensive women's healthcare resources to your fingertips."

	return (
		<div>
			<LogoAndNavigation />
			<Phone>
				<div className={classes.headerContainerPhone}>
					<img
						className={classes.imagePhone}
						src="../img/two-women-hugging.jpg"
						alt="Two Close Friends"
					/>

					<div className={classes.headerTextPhone}>
						<div className={classes.titleTextPhone}>{titleText1}</div>
						<Spacer height="40px" />
						<div className={classes.descriptionTextPhone}>
							{descriptionText}
						</div>
					</div>
				</div>
			</Phone>

			<Tablet>
				<div className={classes.headerContainerTablet}>
					<div className={classes.headerTextTablet}>
						<div className={classes.titleTextTablet}>
							{titleText1}
							<br />
							{titleText2}
						</div>
						<Spacer height="40px" />
						<div className={classes.descriptionTextTablet}>
							{descriptionText}
						</div>
					</div>

					<img
						className={classes.imageTablet}
						src="../img/two-women-hugging.jpg"
						alt="Two Close Friends"
					/>
				</div>
			</Tablet>

			<Desktop>
				<div className={classes.headerContainerDesktop}>
					<div className={classes.headerTextDesktop}>
						<div className={classes.titleTextDesktop}>
							{titleText1}
							<br />
							{titleText2}
						</div>
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
		'text-align': 'center',
		'flex-direction': 'column',
		'background-color': '#016454',
		'margin-top': '55px',
	},
	headerContainerTablet: {
		height: '700px',
		display: 'flex',
		'align-items': 'center',
		'text-align': 'center',
		'background-color': '#016454',
	},
	headerContainerDesktop: {
		height: '700px',
		display: 'flex',
		'align-items': 'center',
		'text-align': 'center',
		'background-color': '#016454',
	},
	headerTextPhone: {
		flex: '1 1 0',
		color: '#abd3f9',
	},
	headerTextTablet: {
		flex: '1 1 0',
		color: '#F5EDE6',
	},
	headerTextDesktop: {
		flex: '1 1 0',
		color: '#F5EDE6',
	},
	titleTextPhone: {
		padding: '21px 48px 0px 48px',
		'font-family': 'hah-light',
		'font-size': '40px',
		'letter-spacing': '-0.5px',
		'line-height': '48px',
	},
	titleTextTablet: {
		'font-family': 'hah-regular',
		'font-size': '50px',
		'line-height': '60px',
	},
	titleTextDesktop: {
		padding: '89px 70px 0px 70px',
		'font-family': 'hah-regular',
		'font-size': '70px',
		'line-height': '80px',
	},
	descriptionTextPhone: {
		padding: '0px 48px 132px 48px',
		'font-family': 'hah-regular',
		'font-size': '18px',
		'line-height': '24px',
	},
	descriptionTextTablet: {
		'font-family': 'hah-regular',
		'font-size': '22px',
		'line-height': '29px',
	},
	descriptionTextDesktop: {
		padding: '0px 80px',
		'font-family': 'hah-regular',
		'font-size': '25px',
		'line-height': '32px',
	},
	imagePhone: {
		height: '100%',
		width: '100%',
	},
	imageTablet: {
		height: '100%',
		width: '50%',
	},
	imageDesktop: {
		height: '100%',
		width: '50%',
	},
}

export default injectSheet(styles)(Header)
