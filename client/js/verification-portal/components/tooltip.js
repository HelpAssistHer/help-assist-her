import React from 'react'
import injectSheet from 'react-jss'
import ReactTooltip from 'react-tooltip'

import Spacer from '../../components/spacer'

const Tooltip = ({ classes, id, heading, text }) => {
	return (
		<div>
			<ReactTooltip
				id={id}
				className={classes.tooltip}
				place="top"
				type="dark"
				effect="solid"
			>
				<div className={classes.heading}>{heading}</div>
				<Spacer height="8px" />
				<div className={classes.text}>{text}</div>
			</ReactTooltip>
		</div>
	)
}

const styles = {
	heading: {
		'font-family': 'sans-serif',
		'font-size': '16px',
		'line-height': '15px',
		'letter-spacing': '1px',
	},
	text: {
		'font-family': 'sans-serif',
		'font-size': '12px',
		'line-height': '15px',
		'font-weight': 'lighter',
		'letter-spacing': '1px',
	},
	tooltip: {
		width: '200px',
	},
}

export default injectSheet(styles)(Tooltip)
