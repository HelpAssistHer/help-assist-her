import React from 'react'
import injectSheet from 'react-jss'

import { Phone, BigPhone, Tablet, Desktop } from '../components/breakpoints'
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

			<BigPhone>
				<div className={classes.headerContainerBigPhone}>
					<img
						className={classes.imageBigPhone}
						src="../img/homepage-collage.png"
						alt="Women"
					/>
					<div className={classes.headerText}>
						<div className={classes.titleTextBigPhone}>
							{titleText1}
							<br />
							{titleText2}
						</div>
						<Spacer height="20px" />
						<div className={classes.descriptionTextBigPhone}>
							{descriptionText}
						</div>
					</div>
				</div>
			</BigPhone>

			<Tablet>
				<div className={classes.headerContainerTablet}>
					<div className={classes.headerText}>
						<div className={classes.titleTextTablet}>
							{titleText1}
							<br />
							{titleText2}
						</div>
						<Spacer height="20px" />
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
		'justify-content': 'center',
		'text-align': 'center',
		'flex-direction': 'column',
		'background-color': '#016454',
	},
	headerContainerBigPhone: {
		height: '600px',
		display: 'flex',
		'align-items': 'center',
		'justify-content': 'center',
		'text-align': 'center',
		'flex-direction': 'column',
		'background-color': '#016454',
	},
	headerContainerTablet: {
		height: '500px',
		'margin-top': '67px', // this is so it starts after the header/navigation
		display: 'grid',
		'grid-template-columns': '5% 40% 5% 45% 5%',
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
		'max-width': '330px',
		'font-family': 'hah-regular',
		'font-size': '8vw',
		'line-height': '11vw',
	},
	titleTextBigPhone: {
		'max-width': '450px',
		'font-family': 'hah-light',
		'font-size': '6vw',
		'line-height': '8vw',
	},
	titleTextTablet: {
		'max-width': '30vw',
		'font-family': 'hah-regular',
		'font-size': '5vw',
		'line-height': '6.5vw',
	},
	titleTextDesktop: {
		'max-width': '30vw',
		'font-family': 'hah-regular',
		'font-size': '4vw',
		'line-height': '5vw',
	},
	descriptionTextPhone: {
		'max-width': '300px',
		'font-family': 'hah-light',
		'font-size': '4.5vw',
		'line-height': '6vw',
		'letter-spacing': '0.3px',
	},
	descriptionTextBigPhone: {
		'max-width': '400px',
		'font-family': 'hah-light',
		'font-size': '3vw',
		'line-height': '4.5vw',
		'letter-spacing': '0.3px',
	},
	descriptionTextTablet: {
		'max-width': '35vw',
		'font-family': 'hah-light',
		'font-size': '2.25vw',
		'line-height': '3.25vw',
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
		height: '210px',
		'margin-top': '40px', // this is so it starts after the header/navigation
	},
	imageBigPhone: {
		height: '230px',
		'margin-top': '50px', // this is so it starts after the header/navigation
	},
	imageTablet: {
		width: '90%',
	},
	imageDesktop: {
		width: '90%',
	},
}

export default injectSheet(styles)(Header)
