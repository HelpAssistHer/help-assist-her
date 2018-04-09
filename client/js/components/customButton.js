import React from 'react'
import injectSheet from 'react-jss'

const NewButton = ({ classes, onClick, buttonText, btnType }) => (
	<button className={getClasses(btnType, classes)} onClick={onClick}>{ buttonText }</button>
)

// TODO cleanup
const styles = {
	'@global': { //to remove default browser styling
		'button':{
			outline: 'none;',
		}
	},
	basic: {  // this class will be applied to all button
     'padding': '1% 2%;',
     'font-size': '.75em;',
     'font-weight': 'bold;',
     'border-radius': '25px;',
     'position' : 'absolute;',
     'right' : '15%;',
	},
	blackAndWhite:{ // this class will be applied to button which will have props btnType == balckAndWhite
     'color': '#000;',
     'border': '2px solid #000',
     'background-color': '#fff;',
     '&:hover': {
        'color': '#fff;',
        'border-color': '#f28274;',
        'background-color': '#f28274;',
    }
	},
	orange: { // this class will be applied to button which will have props btnType == orange
		'color': '#fff;',
		'border-color': '#f28274;',
		'background-color': '#f28274;',
	}
}
/* This function getClasses will all classes that needs to be
applyed on the button on the bassis of input btnType
and available classes. */
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
