import React from 'react'
import injectSheet from 'react-jss'

import { Phone, Desktop } from '../../components/breakpoints'

const Input = ({ classes, input, type, placeholder }) => {
	return (
		<div className={classes.inputRoot}>
			<Phone>
				<div className={classes.borderPhone}>
					<input
						className={classes.inputPhone}
						type={type}
						placeholder={placeholder}
						{...input}
					/>
				</div>
			</Phone>

			<Desktop>
				<div className={classes.borderDesktop}>
					<input
						className={classes.inputDesktop}
						type={type}
						placeholder={placeholder}
						{...input}
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
		'border-bottom': '1px solid #979797',
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
		'&::placeholder': {
			opacity: '0.27',
		},
	},
	inputDesktop: {
		border: 'none',
		outline: 'none',
		'font-family': 'hah-light',
		'font-size': '24px',
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
