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
				<div>
					<img
						className={classes.imagePhone}
						src="../img/julia-with-flowers-phone.jpg"
						alt="Two Close Friends"
					/>
					<div className={classes.headerContainerPhone}>
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

					<img
						className={classes.imageTablet}
						src="../img/julia-with-flowers.jpg"
						alt="Woman with flowers"
					/>
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

					<img
						className={classes.imageDesktop}
						src="../img/julia-with-flowers.jpg"
						alt="Woman with flowers"
					/>
				</div>
			</Desktop>
		</div>
	)
}

const styles = {
	headerContainerPhone: {
		height: '300px',
		display: 'flex',
		'align-items': 'center',
		'text-align': 'center',
		'flex-direction': 'column',
		'background-color': '#016454',
		'margin-top': '-5px',
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
		height: '85vh',
		'margin-top': '67px', // this is so it starts after the header/navigation
		display: 'flex',
		'align-items': 'center',
		'text-align': 'center',
		'background-color': '#016454',
		overflow: 'hidden',
	},
	headerText: {
		flex: '1 1 0',
		display: 'flex',
		'flex-direction': 'column',
		'align-items': 'center',
		'justify-content': 'center',
		color: '#F5EDE6',
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
		'max-width': '450px',
		'font-family': 'hah-regular',
		'font-size': '60px',
		'line-height': '70px',
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
		'max-width': '30vw',
		'font-family': 'hah-light',
		'font-size': '18px',
		'line-height': '26px',
	},
	imagePhone: {
		width: '100%',
		'margin-top': '55px', // this is so it starts after the header/navigation
	},
	imageTablet: {
		width: '50%',
		'object-fit': 'contain',
	},
	imageDesktop: {
		width: '50%',
		'object-fit': 'contain',
	},
}

export default injectSheet(styles)(Header)
