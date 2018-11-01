import React from 'react'
import injectSheet from 'react-jss'
import classnames from 'classnames'

import { Phone, Desktop } from '../../components/breakpoints'

const GoButton = ({ classes, onClick }) => {
	const buttonText = 'GO'

	return (
		<div>
			<div className={classes.goButtonRoot}>
				<Phone>
					<button
						className={classnames(classes.buttonCommon, classes.buttonPhone)}
						type="submit"
						onClick={onClick}
					>
						{buttonText}
					</button>
				</Phone>

				<Desktop>
					<button
						className={classnames(classes.buttonCommon, classes.buttonDesktop)}
						type="submit"
						onClick={onClick}
					>
						{buttonText}
					</button>
				</Desktop>
			</div>
		</div>
	)
}

const styles = {
	goButtonRoot: {
		display: 'flex',
		'justify-content': 'center',
	},
	buttonCommon: {
		'background-color': '#FFFFFF',
		'border-radius': '8px',
		color: '#000000',
		'font-family': 'hah', // update
		'text-align': 'center',
		cursor: 'pointer',
		'text-decoration': 'none',
		outline: 'none',
		'&:hover': {
			'background-color': '#3D65F9',
			color: '#FFFFFF',
		},
	},
	buttonPhone: {
		border: '1px solid #3D65F9',
		'font-size': '14px',
		height: '31px',
		width: '96px',
	},
	buttonDesktop: {
		border: '2px solid #3D65F9',
		'font-size': '24px',
		'letter-spacing': '0.5px',
		height: '54px',
		width: '186px',
	},
}

export default injectSheet(styles)(GoButton)
