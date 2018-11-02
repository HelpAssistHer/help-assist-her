import React from 'react'
import injectSheet from 'react-jss'

import { Phone, Desktop } from '../components/breakpoints'
import Spacer from '../components/spacer'
import LogoBetaBlack from '../components/icons/icon-components/logo-beta-black'

const Header = ({ classes }) => {
	const titleText = 'We have your back.'

	const descriptionText =
		'We’re here to help you find the local resources you need.'

	return (
		<div>
			<Phone>
				<div>
					<div className={classes.logoPhone}>
						<LogoBetaBlack height={25} width={160} />
					</div>

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
				</div>
			</Phone>

			<Desktop>
				<div>
					<div className={classes.logoDesktop}>
						<LogoBetaBlack height={33} width={208} />
					</div>

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
				</div>
			</Desktop>
		</div>
	)
}

const styles = {
	logoPhone: {
		height: '55px',
		margin: '0px 0px 0px 17px',
		display: 'flex',
		'align-items': 'center',
	},
	logoDesktop: {
		height: '100px',
		margin: '0px 0px 0px 42px',
		display: 'flex',
		'align-items': 'center',
	},
	headerContainerPhone: {
		display: 'flex',
		'flex-direction': 'column',
		'background-color': '#016454',
	},
	headerContainerDesktop: {
		display: 'flex',
		'background-color': '#016454',
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
	},
	titleTextDesktop: {
		padding: '74px 80px 0px 80px',
		'font-family': 'hah-regular',
		'font-size': '80px',
	},
	descriptionTextPhone: {
		padding: '0px 80px 132px 80px',
		'font-family': 'hah-regular',
		'font-size': '18px',
	},
	descriptionTextDesktop: {
		padding: '0px 80px 132px 80px',
		'font-family': 'hah-regular',
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
