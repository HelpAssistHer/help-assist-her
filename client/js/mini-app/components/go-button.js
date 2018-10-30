import React from 'react'
import injectSheet from 'react-jss'

const GoButton = ({ classes, onClick }) => {
	return (
		<div className={classes.goButtonRoot}>
			<button className={classes.button} type="submit" onClick={onClick}>
				GO
			</button>
		</div>
	)
}

const styles = {
	goButtonRoot: {
		display: 'flex',
		'justify-content': 'center',
	},
	button: {
		border: '1px solid #3D65F9',
		'border-radius': '8px',
		'background-color': '#FFFFFF',
		color: '#000000',
		'font-family': 'hah',
		'text-align': 'center',
		cursor: 'pointer',
		'text-decoration': 'none',
		'font-size': '14px',
		height: '31px',
		width: '96px',
		outline: 'none',
		'&:hover': {
			'background-color': '#3D65F9',
			color: '#FFFFFF',
		},
	},
}

export default injectSheet(styles)(GoButton)
