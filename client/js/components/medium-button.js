import React from 'react'
import injectSheet from 'react-jss'

const MediumButton = ({ classes, onClick, buttonText, btnType }) => (
	<button className={getClasses(btnType, classes)} onClick={onClick}>{ buttonText }</button>
)

const styles = {
	basic: {  // this class will be applied to all button
		 'outline': 'none',
     'padding': '1% 2%',
     'font-size': '.75em',
     'font-weight': 'bold',
     'border-radius': '25px',
     'border': '2px solid #000',
	},
	blackAndWhite:{ // this class will be applied to button which will have props btnType == balckAndWhite
     'color': '#000',
     'background-color': '#fff',
     '&:hover': {
        'color': '#fff',
        'border-color': '#f28274',
        'background-color': '#f28274',
    }
	},
	orange: { // this class will be applied to button which will have props btnType == orange
		'color': '#fff',
		'border-color': '#f28274',
		'background-color': '#f28274',
	}
}
/* This function getClasses will all classes that needs to be
applyed on the button on the bassis of input btnType
and available classes. */
function getClasses(btnType, classes){
	switch(btnType){
	default :
		  return classes[btnType] + ' ' + classes.basic
	}
}
export default injectSheet(styles)(MediumButton)
