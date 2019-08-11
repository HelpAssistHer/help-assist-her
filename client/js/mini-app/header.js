import React from 'react'
import injectSheet from 'react-jss'

import { Phone, Tablet, Desktop } from '../components/breakpoints'
import Spacer from '../components/spacer'
import LogoAndNavigation from './logo-and-navigation'

const Header = ({ classes }) => {
	const titleText1 = 'Empowering Women'
	const titleText2 = 'with Options.'

	const descriptionText =
		'Verified and affordable women’s healthcare and wellness resources at your fingertips, right when you need them most. We take the headache out of finding care you can trust.'

	return (
		<div>
			<LogoAndNavigation />
			<Phone>
				<div className={classes.headerContainerPhone}>
					<img
						className={classes.imagePhone}
						src="../img/close-friends.png"
						alt="Two Close Friends"
					/>

					<div className={classes.headerTextPhone}>
						<div className={classes.titleTextPhone}>
							{titleText1}
							<br />
							{titleText2}
						</div>
						<Spacer height="20px" />
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

					<div className={classes.test}>
						<img
							className={classes.imageTablet}
							src="../img/julia-with-flowers.jpg"
							alt="Woman with flowers"
						/>
					</div>
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

					<div className={classes.test}>
						<img
							className={classes.imageDesktop}
							src="../img/julia-with-flowers.jpg"
							alt="Woman with flowers"
						/>
					</div>
				</div>
			</Desktop>
		</div>
	)
}

const styles = {
	test: {
		'background-color': 'red',
		width: '50%',
		height: '100%',
	},
	headerContainerPhone: {
		display: 'flex',
		'text-align': 'center',
		'flex-direction': 'column',
		'background-color': '#016454',
		'margin-top': '55px',
	},
	headerContainerTablet: {
		height: '650px',
		'margin-top': '67px', // this is so it starts after the header/navigation
		display: 'flex',
		'align-items': 'center',
		'text-align': 'center',
		'background-color': '#016454',
		overflow: 'hidden',
	},
	headerContainerDesktop: {
		height: '650px',
		'margin-top': '67px', // this is so it starts after the header/navigation
		display: 'flex',
		'align-items': 'center',
		'text-align': 'center',
		'background-color': '#016454',
		overflow: 'hidden',
	},
	// todo combine all these
	headerTextPhone: {
		flex: '1 1 0',
		display: 'flex',
		'flex-direction': 'column',
		'align-items': 'center',
		color: '#F5EDE6',
	},
	headerTextTablet: {
		flex: '1 1 0',
		display: 'flex',
		'flex-direction': 'column',
		'align-items': 'center',
		color: '#F5EDE6',
	},
	headerTextDesktop: {
		flex: '1 1 0',
		display: 'flex',
		'flex-direction': 'column',
		'align-items': 'center',
		color: '#F5EDE6',
	},
	titleTextPhone: {
		// padding: '21px 48px 0px 48px',
		'font-family': 'hah-light',
		'font-size': '40px',
		'letter-spacing': '-0.5px',
		'line-height': '48px',
	},
	titleTextTablet: {
		'max-width': '350px',
		'font-family': 'hah-regular',
		'font-size': '50px',
		'line-height': '60px',
	},
	titleTextDesktop: {
		'max-width': '450px',
		'font-family': 'hah-regular',
		'font-size': '60px', // changed this
		'line-height': '70px', // changed this
	},
	descriptionTextPhone: {
		// padding: '0px 48px 132px 48px',
		'font-family': 'hah-regular',
		'font-size': '18px',
		'line-height': '24px',
	},
	descriptionTextTablet: {
		'max-width': '30vw', // changed this
		'font-family': 'hah-light', // changed this
		'font-size': '18px', // changed this
		'line-height': '26px', // changed this
	},
	descriptionTextDesktop: {
		'max-width': '30vw', // changed this
		'font-family': 'hah-light',
		'font-size': '18px', // changed this
		'line-height': '26px', // changed this
	},
	imagePhone: {
		// height: '100%',
		width: '100%',
	},
	imageTablet: {
		height: '100%',
	},
	imageDesktop: {
		height: '100%',
	},
}

export default injectSheet(styles)(Header)
