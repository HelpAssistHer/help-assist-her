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
     'font-size': '.75em;',
     'font-weight': 'bold;',
     'border-radius': '25px;',
     'position' : 'absolute;',
     'right' : '15%;',
	},
	blackAndWhite:{
     'color': '#000;',
     'border': '2px solid #000',
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
