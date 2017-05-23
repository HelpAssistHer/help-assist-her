import React from 'react'
import injectSheet from 'react-jss'

const Button = ({ classes, onClick, buttonText }) => (
	<button className={classes.button} onClick={onClick}>{ buttonText }</button>
)

// TODO cleanup
const styles = {
	button: {
		border: '1px solid #ff2596; -webkit-border-radius: 3px; -moz-border-radius: 3px;border-radius: 3px;font-size:12px;font-family:arial, helvetica, sans-serif; padding: 10px 10px 10px 10px; text-decoration:none; display:inline-block;text-shadow: 0px 0px 0 rgba(0,0,0,0.3);font-weight:bold; color: #FFFFFF;',
		'background-color': '#ff5db1; background-image: -webkit-gradient(linear, left top, left bottom, from(#ff5db1), to(#ef007c));',
		'background-image': '-webkit-linear-gradient(top, #ff5db1, #ef007c);',
		'&:hover': {
			'border': '1px solid #f60080;',
			'background-color': '#ff2a98; background-image: -webkit-gradient(linear, left top, left bottom, from(#ff2a98), to(#bc0062));',
		}
	},
}

export default injectSheet(styles)(Button)
