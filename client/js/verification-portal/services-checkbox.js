import React from 'react'
import injectSheet from 'react-jss'

const ServicesCheckbox = ({ classes, input, label }) => {
	return (
		<div className={classes.root}>
			<label className={classes.container}>
				<div className={classes.labelText}>{label}</div>
				<input type="checkbox" checked={input.value} {...input} />
				<span className={classes.checkmark} />
			</label>
		</div>
	)
}

const styles = {
	root: {
		width: '325px',
	},
	labelText: {
		'text-align': 'left',
		'font-weight': 'lighter',
	},
	checkmark: {
		position: 'absolute',
		top: '0',
		left: '0',
		height: '22px',
		width: '22px',
		'background-color': '#ffffff',
		border: '2px solid #F48271',
		'border-radius': '100%',
	},
	container: {
		float: 'left',
		display: 'block',
		position: 'relative',
		'padding-left': '46px',
		'margin-bottom': '20px',
		cursor: 'pointer',
		'font-size': '18px',
		color: '#000000',
		'letter-spacing': '1px',
		'line-height': '22px',
		'-webkit-user-select': 'none',
		'-moz-user-select': 'none',
		'-ms-user-select': 'none',
		'user-select': 'none',
		'& input': {
			position: 'absolute',
			opacity: '0',
			cursor: 'pointer',
		},
		'& input:checked ~ $checkmark': {
			'background-color': '#F48271',
		},
		'&:hover $input ~ $checkmark': {
			'background-color': '#F48271',
			opacity: '0.5',
		},
	},
}

export default injectSheet(styles)(ServicesCheckbox)
