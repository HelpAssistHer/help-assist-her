import React from 'react'
import injectSheet from 'react-jss'
import classnames from 'classnames'

import { Phone, BigPhone, Tablet, Desktop } from './Breakpoints'

const Button = ({ classes, onClick, buttonText }) => {
	return (
		<div>
			<div>
				<Phone>
					<div>
						<button
							className={classnames(classes.buttonCommon, classes.buttonPhone)}
							type="submit"
							onClick={onClick}
						>
							{buttonText}
						</button>
					</div>
				</Phone>

				<BigPhone>
					<div>
						<button
							className={classnames(classes.buttonCommon, classes.buttonPhone)}
							type="submit"
							onClick={onClick}
						>
							{buttonText}
						</button>
					</div>
				</BigPhone>

				<Tablet>
					<div>
						<button
							className={classnames(
								classes.buttonCommon,
								classes.buttonDesktop,
							)}
							type="submit"
							onClick={onClick}
						>
							{buttonText}
						</button>
					</div>
				</Tablet>

				<Desktop>
					<div>
						<button
							className={classnames(
								classes.buttonCommon,
								classes.buttonDesktop,
							)}
							type="submit"
							onClick={onClick}
						>
							{buttonText}
						</button>
					</div>
				</Desktop>
			</div>
		</div>
	)
}

const styles = {
	buttonCommon: {
		'background-color': '#FFFFFF',
		'border-radius': '8px',
		color: '#000000',
		'font-family': 'hah-regular',
		'text-align': 'center',
		cursor: 'pointer',
		'text-decoration': 'none',
		outline: 'none',
		'&:hover': {
			'background-color': '#3D65F9',
			color: '#FFFFFF',
		},
		'-webkit-tap-highlight-color': 'transparent', // for Safari
	},
	buttonPhone: {
		border: '1px solid #3D65F9',
		'font-size': '14px',
		height: '31px',
		width: '130px',
		padding: '0px', // for mobile devices
	},
	buttonDesktop: {
		border: '2px solid #3D65F9',
		'font-size': '20px',
		'letter-spacing': '0.5px',
		height: '54px',
		width: '230px',
	},
}

export default injectSheet(styles)(Button)
