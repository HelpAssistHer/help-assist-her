import React from 'react'
import injectSheet from 'react-jss'

import { Phone, Tablet, Desktop } from '../components/breakpoints'
import Spacer from '../components/spacer'
import LogoAndNavigation from './logo-and-navigation'

const Header = ({ classes }) => {
	const titleText1 = 'Empowering Women'
	const titleText2 = 'with Options'

	const descriptionText =
		'Verified and affordable women’s healthcare and wellness resources at your fingertips, right when you need them most.'

	return (
		<div>
			<LogoAndNavigation />
			<Phone>
				<div className={classes.headerContainerPhone}>
					<img
						className={classes.imagePhone}
						src="../img/homepage-collage.png"
						alt="Women"
					/>
					<div className={classes.headerText}>
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
					<div className={classes.headerText}>
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

					<div className={classes.imageContainer}>
						<img
							className={classes.imageTablet}
							src="../img/homepage-collage.png"
							alt="Women"
						/>
					</div>
				</div>
			</Tablet>

			<Desktop>
				<div className={classes.headerContainerDesktop}>
					<div className={classes.headerText}>
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

					<div className={classes.imageContainer}>
						<img
							className={classes.imageDesktop}
							src="../img/homepage-collage.png"
							alt="Women"
						/>
					</div>
				</div>
			</Desktop>
		</div>
	)
}

const styles = {
	headerContainerPhone: {
		height: '600px',
		display: 'flex',
		'align-items': 'center',
		'text-align': 'center',
		'flex-direction': 'column',
		'background-color': '#016454',
	},
	headerContainerTablet: {
		height: '68vh',
		'margin-top': '67px', // this is so it starts after the header/navigation
		display: 'flex',
		'align-items': 'center',
		'text-align': 'center',
		'background-color': '#016454',
		overflow: 'hidden',
	},
	headerContainerDesktop: {
		height: '42vw',
		'margin-top': '67px', // this is so it starts after the header/navigation
		display: 'grid',
		'grid-template-columns': '5% 40% 5% 45% 5%',
		'text-align': 'center',
		'background-color': '#016454',
		overflow: 'hidden',
	},
	headerText: {
		'margin-top': '34px',
		'grid-column-start': 2,
		'grid-column-end': 3,
		display: 'flex',
		'flex-direction': 'column',
		'align-items': 'center',
		'justify-content': 'center',
		color: '#FFFFFF',
	},
	titleTextPhone: {
		'max-width': '250px',
		'font-family': 'hah-light',
		'font-size': '30px',
		'line-height': '33px',
	},
	titleTextTablet: {
		'max-width': '350px',
		'font-family': 'hah-regular',
		'font-size': '50px',
		'line-height': '60px',
	},
	titleTextDesktop: {
		'max-width': '30vw',
		'font-family': 'hah-regular',
		'font-size': '4vw',
		'line-height': '5vw',
	},
	descriptionTextPhone: {
		'max-width': '270px',
		'font-family': 'hah-regular',
		'font-size': '14px',
		'line-height': '20px',
	},
	descriptionTextTablet: {
		'max-width': '30vw',
		'font-family': 'hah-light',
		'font-size': '18px',
		'line-height': '26px',
	},
	descriptionTextDesktop: {
		'max-width': '25vw',
		'font-family': 'hah-light',
		'font-size': '20px',
		'line-height': '28px',
	},
	imageContainer: {
		display: 'flex',
		'flex-direction': 'column',
		'justify-content': 'center',
		'align-items': 'center',
		'margin-top': '34px',
		'grid-column-start': 4,
		'grid-column-end': 5,
	},
	imagePhone: {
		height: '300px',
		'margin-top': '55px', // this is so it starts after the header/navigation
	},
	imageTablet: {
		width: '50%',
		'object-fit': 'contain',
	},
	imageDesktop: {
		width: '90%',
	},
}

export default injectSheet(styles)(Header)
