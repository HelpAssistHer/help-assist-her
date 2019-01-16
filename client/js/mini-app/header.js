import React from 'react'
import injectSheet from 'react-jss'

import { Phone, Desktop } from '../components/breakpoints'
import Spacer from '../components/spacer'
import LogoAndNavigation from './logo-and-navigation'

const Header = ({ classes }) => {
	const titleText = 'Empower Women with Options.'

	const descriptionText =
		'We’ve got your back. And your left hand, or your right foot. Whatever you need help ' +
		'with — we’ll help connect you to a local resource that can provide counseling, screenings, ' +
		'or more.'

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
					<div className={classes.headerTextDesktop}>
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
		'border-top': '1px solid #3D65F9',
		'border-bottom': '1px solid #3D65F9',
	},
	headerContainerDesktop: {
		display: 'flex',
		'background-color': '#016454',
		'border-top': '4px solid #3D65F9',
		'border-bottom': '4px solid #3D65F9',
	},
	headerTextPhone: {
		flex: '1 1 0',
		color: '#abd3f9',
		'text-align': 'center',
	},
	headerTextDesktop: {
		flex: '1 1 0',
		color: '#abd3f9',
	},
	titleTextPhone: {
		padding: '74px 80px 0px 80px',
		'font-family': 'hah-light',
		'font-size': '40px',
		'letter-spacing': '-0.5px',
		'line-height': '48px',
	},
	titleTextDesktop: {
		padding: '74px 80px 0px 42px',
		'font-family': 'hah-regular',
		'font-size': '80px',
		'line-height': '76px',
	},
	descriptionTextPhone: {
		padding: '0px 80px 132px 80px',
		'font-family': 'hah-regular',
		'font-size': '18px',
		'line-height': '24px',
	},
	descriptionTextDesktop: {
		padding: '0px 80px 132px 42px',
		'font-family': 'hah-regular',
		'font-size': '24px',
		'line-height': '33px',
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
