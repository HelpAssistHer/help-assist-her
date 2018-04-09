import React from 'react'
import injectSheet from 'react-jss'

const NewButton = ({ classes, onClick, buttonText, btnType }) => (
	<button className={getClasses(btnType, classes)} onClick={onClick}>{ buttonText }</button>
)

// TODO cleanup
const styles = {
	'@global': {
		'button':{
			outline: 'none;',
		}
	},
	basic: {
		'padding': '1% 2%;',
		'border-radius': '25px;',
		'font-weight': 'bold;',
		'font-size': '.75em;',
		'position' : 'absolute;',
		'right' : '15%;',
		'background-color': '#fff;',
		'border': '2px solid #000',
	},
	blackAndWhite:{
		'color': '#000;',
		'border-color': '#000;',
		'background-color': '#fff;',
		'&:hover': {
			'color': '#fff;',
			'border-color': '#f28274;',
			'background-color': '#f28274;',
		}
	},
	orange: {
		'color': '#fff;',
		'border-color': '#f28274;',
		'background-color': '#f28274;',
	}
}

function getClasses(btnType, classes){
	switch(btnType){
	case 'blackAndWhite' :
		  return classes.blackAndWhite + ' ' + classes.basic
	case 'orange' :
		  return classes.orange + ' ' + classes.basic
	default :
		  return classes.basic
	}
}
export default injectSheet(styles)(NewButton)
