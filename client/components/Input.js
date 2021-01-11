import React from 'react'
import injectSheet from 'react-jss'

import { Phone, BigPhone, Tablet, Desktop } from './Breakpoints'

const Input = ({ classes, type, placeholder, ...props }) => {
	return (
		<div className={classes.inputRoot}>
			<Phone>
				<div className={classes.borderPhone}>
					<input
						className={classes.inputPhone}
						type={type}
						placeholder={placeholder}
						{...props}
					/>
				</div>
			</Phone>

			<BigPhone>
				<div className={classes.borderPhone}>
					<input
						className={classes.inputPhone}
						type={type}
						placeholder={placeholder}
						{...props}
					/>
				</div>
			</BigPhone>

			<Tablet>
				<div className={classes.borderDesktop}>
					<input
						className={classes.inputDesktop}
						type={type}
						placeholder={placeholder}
						{...props}
					/>
				</div>
			</Tablet>

			<Desktop>
				<div className={classes.borderDesktop}>
					<input
						className={classes.inputDesktop}
						type={type}
						placeholder={placeholder}
						{...props}
					/>
				</div>
			</Desktop>
		</div>
	)
}

const styles = {
	inputRoot: {
		display: 'flex',
		'justify-content': 'center',
	},
	borderPhone: {
		'border-bottom': '1px solid #000000',
		width: '425px',
	},
	borderDesktop: {
		'border-bottom': '2px solid #000000',
		width: '700px',
	},
	inputPhone: {
		border: 'none',
		outline: 'none',
		'font-family': 'hah-regular',
		'font-size': '14px',
		color: '#000000',
		'letter-spacing': '0.5px',
		'line-height': '16px',
		'text-align': 'center',
		height: '26px',
		width: '100%',
		'border-radius': '0px', // for mobile devices
		padding: '0px', // for mobile devices
		'&::placeholder': {
			opacity: '0.27',
		},
	},
	inputDesktop: {
		border: 'none',
		outline: 'none',
		'font-family': 'hah-light',
		'font-size': '20px',
		color: '#000000',
		'letter-spacing': '0.5px',
		'line-height': '30px',
		'text-align': 'center',
		height: '43px',
		width: '100%',
		'&::placeholder': {
			opacity: '0.24',
		},
	},
}

export default injectSheet(styles)(Input)
